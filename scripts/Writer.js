"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

window.Scheduler = window.Scheduler || (function () {
	"use strict";
	var REPEAT = "repeat";
	var IF = "if";
	var ELIF = "elif";
	var ELSE = "else";
	var IGNORE = "ignore";

	function event(type, callback, args) {
		return {
			type: type,
			callback: callback,
			args: args
		};
	}

	var blocks = [];

	function Scheduler() {
		var makeEvent = (function (type, callback) {
			return (function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				this.eventQueue.push(event(type, callback, args));
				return this;
			}).bind(this);
		}).bind(this);

		this.eventQueue = [];
		this.eventIndex = 0;
		this.isRunning = false;

		this.init = function init() {
			if (blocks.length) {
				var block = blocks.pop();
				throw new Error("Unclosed .block." + block[0] + " block; use .block.end before using .init");
			}

			if (this.isRunning = this.eventIndex < this.eventQueue.length) {
				var _event$callback;

				var _event = this.eventQueue[this.eventIndex++];
				(_event$callback = _event.callback).call.apply(_event$callback, [this, this.init.bind(this)].concat(_toConsumableArray(_event.args)));
			}
			return this;
		};

		this.define = function newEvent(name, callback) {
			this[name] = function () {
				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				this.eventQueue.push(event(name, callback, args));
				return this;
			};
			return this;
		};

		this.define("delay", function delay(resume, ms) {
			setTimeout(resume, ms);
		});

		this.define("func", function func(resume, callback) {
			for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
				args[_key3 - 2] = arguments[_key3];
			}

			callback.call.apply(callback, [this].concat(args));
			resume();
		});

		this.define("funcasync", function funcasync(resume, callback) {
			for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
				args[_key4 - 2] = arguments[_key4];
			}

			setTimeout((function () {
				callback.call.apply(callback, [this, resume].concat(args));
			}).bind(this), 0);
		});

		this.block = {
			repeat: (function (n) {
				if (n == 0) {
					blocks.push([IGNORE, this.eventQueue]);
				} else {
					blocks.push([REPEAT, this.eventQueue.length, n - 1]);
				}
				return this;
			}).bind(this),
			"if": (function (bool) {
				blocks.push([IF, this.eventQueue.length, bool]);
				return this;
			}).bind(this),
			elif: (function (bool) {
				var lastblock = blocks.pop();
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
			"else": (function () {
				var lastblock = blocks.pop();
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
			ignore: (function () {
				blocks.push([IGNORE, this.eventQueue.length]);
				return this;
			}).bind(this),
			end: (function (bool) {
				var lastblock = blocks.pop();
				if (lastblock) {
					if (lastblock[0] == IF) {
						if (!lastblock[2]) {
							this.eventQueue.splice(lastblock[1]);
						}
					} else if (lastblock[0] == ELIF || lastblock[0] == ELSE) {
						this.eventQueue.splice(lastblock[1]);
						this.block.end();
					} else if (lastblock[0] == REPEAT) {
						for (var i = lastblock[2], events = this.eventQueue.slice(lastblock[1]); i >= 1; i--) {
							var _eventQueue;

							(_eventQueue = this.eventQueue).push.apply(_eventQueue, _toConsumableArray(events));
						}
					}
				} else {
					throw Error("No blocks to end for .block.end");
				}
				return this;
			}).bind(this)
		};
	}

	return Scheduler;
})();

window.Writer = window.Writer || (function () {
	"use strict";
	var CARETTO = "caretto";
	var END = "end";
	var WRITE = "write";
	var WRITEUNTIL = "writeuntil";
	var RESTARTBLINKER = "restartblinker";
	var REMOVE = "remove";

	function Writer() {
		Scheduler.call(this);

		this.writingElem = null;
		this.writingIndex = 0;
		this.caretBlinker = null;

		var startBlink = (function () {
			if (this.caretBlinker) {
				stopBlink();
			}

			if (this.writingElem) {
				this.writingElem.classList.add("caret");
			}

			this.caretBlinker = setInterval((function () {
				if (!this.writingElem) {
					stopBlink();
					return;
				}

				if (this.writingElem.classList.contains("caret")) {
					this.writingElem.classList.remove("caret");
				} else {
					this.writingElem.classList.add("caret");
				}
			}).bind(this), 530);
		}).bind(this);

		var stopBlink = (function () {
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

			var written = document.createElement("span");
			var unwritten = document.createElement("span");

			written.innerText = "​";

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
		});

		this.define(WRITE, function (resume, time, numchars) {
			stopBlink();
			var elem = this.writingElem;
			var text = elem.innerText.replace(/\n/g, "").replace(/^\u200B/g, "").replace(/\u00a0/g, " ");
			var index = this.writingIndex || 0;

			if (typeof numchars != "number") {
				numchars = Infinity;
			}
			numchars = Math.max(Math.min(text.length - index, numchars), 0);

			var untilIndex = index + numchars;

			elem.classList.add("writing");

			var written = elem.firstElementChild;
			var unwritten = elem.lastElementChild;

			if (written.lastChild && written.lastChild.nodeType == document.TEXT_NODE) {
				written.lastChild.data = written.lastChild.data.replace(/^\u200B/, "");
			}

			var interval = setInterval((function () {
				if (++index <= untilIndex) {
					this.writingIndex = index;
					var char = text[index - 1];

					if (written.lastChild && written.lastChild.nodeType == document.TEXT_NODE) {
						written.lastChild.data = written.lastChild.data.replace(/\u00a0$/, " ") + (char == " " ? " " : char);
					} else {
						written.appendChild(document.createTextNode(char == " " ? " " : char));
					}

					unwritten.innerText = text.substring(index).replace(/ /g, " ");

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
			}).bind(this), time ? time : 50);
		});

		this.define(REMOVE, function (resume) {
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