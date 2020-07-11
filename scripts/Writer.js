---
---
{% include_relative Scheduler.js %}

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