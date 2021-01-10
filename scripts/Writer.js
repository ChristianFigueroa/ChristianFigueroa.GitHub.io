window.Scheduler = window.Scheduler || (function() {
	"use strict";
	const REPEAT = "repeat";
	const IF = "if";
	const ELIF = "elif";
	const ELSE = "else";
	const IGNORE = "ignore";

	function event(type, callback, args) {
		return {
			type: type,
			callback: callback,
			args: args
		}
	}

	let blocks = [];

	function Scheduler() {
		let makeEvent = (function(type, callback) {
			return function(...args) {
				this.eventQueue.push(event(type, callback, args));
				return this;
			}.bind(this)
		}).bind(this)

		this.eventQueue = [];
		this.eventIndex = 0;
		this.isRunning = false;

		this.init = function init() {
			if (blocks.length) {
				let block = blocks.pop();
				throw new Error("Unclosed .block." + block[0] + " block; use .block.end before using .init")
			}

			if (this.isRunning = this.eventIndex < this.eventQueue.length) {
				let event = this.eventQueue[this.eventIndex++];
				event.callback.call(this, this.init.bind(this), ...event.args);
			}
			return this;
		}

		this.define = function newEvent(name, callback) {
			this[name] = function(...args) {
				this.eventQueue.push(event(name, callback, args));
				return this;
			}
			return this;
		}

		this.define("delay", function delay(resume, ms) {
			setTimeout(resume, ms);
		});

		this.define("func", function func(resume, callback, ...args) {
			callback.call(this, ...args);
			resume();
		});

		this.define("funcasync", function funcasync(resume, callback, ...args) {
			setTimeout(function() {
				callback.call(this, resume, ...args);
			}.bind(this), 0);
		});

		this.block = {
			repeat: (function(n) {
				if (n == 0) {
					blocks.push([IGNORE, this.eventQueue]);
				} else {
					blocks.push([REPEAT, this.eventQueue.length, n - 1]);
				}
				return this;
			}).bind(this),
			"if": (function(bool) {
				blocks.push([IF, this.eventQueue.length, bool]);
				return this;
			}).bind(this),
			elif: (function(bool) {
				let lastblock = blocks.pop();
				if (lastblock && (lastblock[0] == IF || lastblock[0] == ELIF)) {
					if (lastblock[2]) {
						blocks.push(lastblock, [ELIF, this.eventQueue.length, false]);
					} else {
						this.eventQueue.splice(lastblock[1]);
						blocks.push([IF, this.eventQueue.length, bool]);
					}
				} else {
					throw Error("Found .block.elif without preceding .block.if");
				}
				return this;
			}).bind(this),
			"else": (function() {
				let lastblock = blocks.pop();
				if (lastblock && (lastblock[0] == IF || lastblock[0] == ELIF)) {
					if (lastblock[2]) {
						blocks.push(lastblock, [ELSE, this.eventQueue.length]);
					} else {
						this.eventQueue.splice(lastblock[1]);
						blocks.push([IF, this.eventQueue.length, true]);
					}
				} else {
					throw Error("Found .block.else without corresponding .block.if");
				}
				return this;
			}).bind(this),
			ignore: (function() {
				blocks.push([IGNORE, this.eventQueue.length]);
				return this;
			}).bind(this),
			end: (function(bool) {
				let lastblock = blocks.pop();
				if (lastblock) {
					if (lastblock[0] == IF) {
						if (!lastblock[2]) {
							this.eventQueue.splice(lastblock[1]);
						}
					} else if (lastblock[0] == ELIF || lastblock[0] == ELSE) {
						this.eventQueue.splice(lastblock[1]);
						this.block.end();
					} else if (lastblock[0] == REPEAT) {
						for (let i = lastblock[2], events = this.eventQueue.slice(lastblock[1]); i >= 1; i--) {
							this.eventQueue.push(...events);
						}
					}
				} else {
					throw Error("No blocks to end for .block.end");
				}
				return this;
			}).bind(this)
		}
	}

	return Scheduler;
})();

window.Writer = window.Writer || (function() {
	"use strict";
	const CARETTO = "caretto";
	const END = "end";
	const WRITE = "write";
	const WRITEUNTIL = "writeuntil";
	const RESTARTBLINKER = "restartblinker";
	const REMOVE = "remove";

	function Writer() {
		Scheduler.call(this);

		this.writingElem = null;
		this.writingIndex = 0;
		this.caretBlinker = null;

		let startBlink = (function() {
			if (this.caretBlinker) {
				stopBlink();
			}

			if (this.writingElem) {
				this.writingElem.classList.add("caret");
			}

			this.caretBlinker = setInterval(function() {
				if (!this.writingElem) {
					stopBlink();
					return;
				}

				if (this.writingElem.classList.contains("caret")) {
					this.writingElem.classList.remove("caret");
				} else {
					this.writingElem.classList.add("caret");
				}
			}.bind(this), 530);
		}).bind(this);

		let stopBlink = (function() {
			if (this.writingElem && this.caretBlinker) {
				clearInterval(this.caretBlinker);
				this.writingElem.classList.remove("caret");
			}
		}).bind(this);

		this.define(RESTARTBLINKER, function restartblinker(resume) {
			stopBlink();
			startBlink();
			resume();
		});

		this.define(CARETTO, function caretto(resume, elem) {
			if (this.writingElem) {
				this.writingElem.classList.remove("writing_elem");
			}

			stopBlink();

			this.writingElem = elem;
			this.writingElem.classList.add("writing_elem");
			this.writingIndex = 0;

			let written = document.createElement("span");
			let unwritten = document.createElement("span");

			written.innerText = "\u200b";

			unwritten.innerText = elem.innerText;
			unwritten.style.color = "transparent";

			elem.classList.remove("unwritten");
			elem.innerText = "";

			elem.appendChild(written);
			elem.appendChild(unwritten);

			startBlink();

			resume();
		});

		this.define(END, function end(resume) {
			if (this.writingElem) {
				this.writingElem.classList.remove("writing_elem");
			}
			stopBlink();
			this.writingElem = null;
			resume();
		})

		this.define(WRITE, function(resume, time, numchars) {
			stopBlink();
			let elem = this.writingElem;
			let text = elem.innerText.replace(/\n/g, "").replace(/^\u200b/ug, "").replace(/\u00a0/g, " ");
			let index = this.writingIndex || 0;

			if (typeof numchars != "number") {
				numchars = Infinity;
			}
			numchars = Math.max(Math.min(text.length - index, numchars), 0);

			let untilIndex = index + numchars;

			elem.classList.add("writing");

			let written = elem.firstElementChild;
			let unwritten = elem.lastElementChild;

			if (written.lastChild && written.lastChild.nodeType == document.TEXT_NODE) {
				written.lastChild.data = written.lastChild.data.replace(/^\u200b/u, "");
			}

			let interval = setInterval(function() {
				if (++index <= untilIndex) {
					this.writingIndex = index;
					let char = text[index - 1];

					if (written.lastChild && written.lastChild.nodeType == document.TEXT_NODE) {
						written.lastChild.data = written.lastChild.data.replace(/\u00a0$/, " ") + (char == " " ? "\u00a0" : char);
					} else {
						written.appendChild(document.createTextNode(char == " " ? "\u00a0" : char));
					}

					unwritten.innerText = text.substring(index).replace(/ /g, "\u00a0");

					if (/\W/.test(char) && char != " ") {
						written.appendChild(document.createElement("wbr"));
					}

					if (index == text.length) {
						elem.innerHTML = written.innerHTML;
						elem.classList.remove("writing");
						elem.classList.add("written");
						clearInterval(interval);
						startBlink();
						resume();
					}
				} else {
					elem.classList.remove("writing");
					elem.classList.add("midwrite");
					clearInterval(interval);
					startBlink();
					resume();
				}
			}.bind(this), time ? time : 50);
		});

		this.define(REMOVE, function(resume) {
			if (this.writingElem) {
				this.writingElem.parentNode.removeChild(this.writingElem);
				stopBlink();
				this.writingElem = null;
			}
			resume();
		});
	}

	return Writer;
})();