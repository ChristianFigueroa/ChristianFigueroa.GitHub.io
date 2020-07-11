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