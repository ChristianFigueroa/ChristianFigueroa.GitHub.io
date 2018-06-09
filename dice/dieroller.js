var dieroller = self.dieroller || {};

if (self.localStorage) {
    dieroller.savedRolls = JSON.parse(localStorage["saved_die_rolls"] || "{}");

    dieroller.functionNames = ['min','max','minimum','maximum','dropLowest','loseLowest','keepLowest','saveLowest','dropHighest','loseHighest','keepHighest','saveHighest'];

    dieroller.themes = {
        "Alabaster": {
            "name": "Alabaster",
            "arrow": "#000",
            "background": "#F7F7F7",
            "hover": "#F0F0F0",
            "link": "#000",
            "separator": "#000",
            "text": "#000",
            "type": "light",
            "arg separ": {},
            "dice roll": {
                "color": "#448C27"
            },
            "group close": {
                "borderRadius": ".15em",
                "highlight:background": "#FFE9A6"
            },
            "group open": {
                "borderRadius": ".15em",
                "highlight:background": "#FFE9A6"
            },
            "function": {
                "color": "#325CC0"
            },
            "invalid": {
                "background": "#F0E4E4",
                "color": "#600"
            },
            "named": {
                "color": "#325CC0"
            },
            "number": {
                "color": "#7A3E9D"
            },
            "operator": {},
            "whitespace": {
                "color": "#AA3731"
            }
        },
        "Atom Dark": {
            "name": "Atom Dark",
            "arrow": "#FFF",
            "background": "#282C34",
            "hover": "#2C313A",
            "link": "#D19A66",
            "separator": "#FFF",
            "text": "#D7DAE0",
            "type": "dark",
            "arg separ": {
                "color": "#ABB2BF"
            },
            "dice roll": {
                "color": "#98C379"
            },
            "group close": {
                "borderRadius": ".15em",
                "color": "#ABB2BF",
                "highlight:boxShadow": "0 0 0 .1em #ABB2BF"
            },
            "group open": {
                "borderRadius": ".15em",
                "color": "#ABB2BF",
                "highlight:boxShadow": "0 0 0 .1em #ABB2BF"
            },
            "function": {
                "color": "#C678DD"
            },
            "invalid": {
                "background": "#E05252",
                "color": "#FFF"
            },
            "named": {
                "color": "#61AFEF",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#D19A66"
            },
            "operator": {
                "color": "#61AFEF"
            },
            "whitespace": {
                "color": "#5C6370"
            }
        },
        "Atom Light": {
            "name": "Atom Light",
            "arrow": "#0184BC",
            "background": "#FAFAFA",
            "hover": "#F2F2F2",
            "link": "#A626A4",
            "separator": "#383A42",
            "text": "#383A42",
            "type": "light",
            "arg separ": {
                "color": "#383A42"
            },
            "dice roll": {
                "color": "#50A14F"
            },
            "group close": {
                "color": "#383A42",
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #383A42"
            },
            "group open": {
                "color": "#383A42",
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #383A42"
            },
            "function": {
                "color": "#A626A4"
            },
            "invalid": {
                "background": "#E05252",
                "color": "#FFF"
            },
            "named": {
                "color": "#4078F2",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#986801"
            },
            "operator": {
                "color": "#4078F2"
            },
            "whitespace": {
                "color": "#A0A1A7"
            }
        },
        "Cobalt": {
            "name": "Cobalt",
            "arrow": "#FFF",
            "background": "#002240",
            "hover": "#00162A",
            "link": "#FFF",
            "separator": "#FFF",
            "text": "#FFF",
            "type": "dark",
            "arg separ": {},
            "dice roll": {
                "color": "#9EFF80"
            },
            "group close": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #FFF"
            },
            "group open": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #FFF"
            },
            "function": {
                "color": "#80FCFF"
            },
            "invalid": {
                "background": "#800F00",
                "color": "#F8F8F8"
            },
            "named": {
                "color": "#FFB054",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#FF80E1"
            },
            "operator": {
                "color": "#D8D8D8"
            },
            "whitespace": {
                "color": "#0088FF"
            }
        },
        "Dracula": {
            "name": "Dracula",
            "arrow": "#00BCD4",
            "background": "#282A36",
            "hover": "#44475A",
            "link": "#F8F8F2",
            "separator": "#F8F8F2",
            "text": "#F8F8F2",
            "type": "dark",
            "arg separ": {},
            "dice roll": {
                "color": "#50fa7b"
            },
            "group close": {
                "borderRadius": ".15em",
                "highlight:background": "#EFFB7B",
                "highlight:color": "#000"
            },
            "group open": {
                "borderRadius": ".15em",
                "highlight:background": "#EFFB7B",
                "highlight:color": "#000"
            },
            "function": {
                "color": "#F1fA8C"
            },
            "invalid": {
                "background": "#FF79C6",
                "color": "#F8F8F0"
            },
            "named": {
                "color": "#8BE9FD",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#BD93F9"
            },
            "operator": {
                "color": "#FF79C6"
            },
            "whitespace": {
                "color": "#6272A4"
            }
        },
        "Material Dark": {
            "name": "Material Dark",
            "arrow": "#64B5F6",
            "background": "#263238",
            "hover": "#1A2226",
            "link": "#82AAFF",
            "separator": "#EFF",
            "text": "#EFF",
            "type": "dark",
            "arg separ": {
                "color": "#B2CCD6"
            },
            "dice roll": {
                "color": "#C3E88D"
            },
            "function": {
                "color": "#D6C100"
            },
            "group close": {
                "borderRadius": ".15em",
                "color": "#BED1D6",
                "highlight:boxShadow": "0 0 0 .1em #BED1D6"
            },
            "group open": {
                "borderRadius": ".15em",
                "color": "#BED1D6",
                "highlight:boxShadow": "0 0 0 .1em #BED1D6"
            },
            "invalid": {
                "background": "#FF5370",
                "color": "#FFFFFF"
            },
            "named": {
                "color": "#C792EA",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#F78C6C"
            },
            "operator": {
                "color": "#89DDFF"
            },
            "whitespace": {
                "color": "#546E7A"
            }
        },
        "Material Light": {
            "name": "Material Light",
            "arrow": "#2196F3",
            "background": "#FAFAFA",
            "hover": "#EDF0F1",
            "link": "#6182B8",
            "separator": "#272727",
            "text": "#80CBC4",
            "type": "light",
            "arg separ": {
                "color": "#39ADB5"
            },
            "dice roll": {
                "color": "#91B859"
            },
            "function": {
                "color": "#D6C100"
            },
            "group close": {
                "borderRadius": ".15em",
                "color": "#91B859",
                "highlight:boxShadow": "0 0 0 .1em #91B859"
            },
            "group open": {
                "borderRadius": ".15em",
                "color": "#91B859",
                "highlight:boxShadow": "0 0 0 .1em #91B859"
            },
            "invalid": {
                "background": "#E53935",
                "color": "#FFFFFF"
            },
            "named": {
                "color": "#7C4DFF",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#F76D47"
            },
            "operator": {
                "color": "#39ADB5"
            },
            "whitespace": {
                "color": "#CCD7DA"
            }
        },
        "Monokai": {
            "name": "Monokai",
            "arrow": "#FFFFFF",
            "background": "#272822",
            "hover": "#3E3D32",
            "link": "#FFFFFF",
            "separator": "#FFFFFF",
            "text": "#FFFFFF",
            "type": "dark",
            "arg separ": {},
            "dice roll": {
                "color": "#A6E22E"
            },
            "function": {
                "color": "#66D9EF"
            },
            "group close": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em white",
            },
            "group open": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em white",
            },
            "invalid": {
                "background": "#FF6188"
            },
            "named": {
                "color": "#FD971F",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#AE81FF"
            },
            "operator": {
                "color": "#FF6188"
            },
            "whitespace": {
                "color": "#75715E"
            }
        },
        "Solarized Dark": {
            "name": "Solarized Dark",
            "arrow": "#93A1A1",
            "background": "#002B36",
            "hover": "#073642",
            "link": "#FDF6E3",
            "separator": "#FDF6E3",
            "text": "#839496",
            "type": "dark",
            "arg separ": {},
            "dice roll": {
                "color": "#859900"
            },
            "function": {
                "color": "#B58900",
            },
            "group close": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #839496"
            },
            "group open": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #839496"
            },
            "invalid": {
                "backgroundColor": "#DC322F",
                "color": "#EEE8D5"
            },
            "named": {
                "color": "#2AA198",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#268BD2"
            },
            "operator": {
                "color": "#D33682"
            },
            "whitespace": {
                "color": "#073642"
            }
        },
        "Solarized Light": {
            "name": "Solarized Light",
            "arrow": "#073642",
            "background": "#FDF6E3",
            "hover": "#EEE8D5",
            "link": "#586E75",
            "separator": "#002B36",
            "text": "#002B36",
            "type": "light",
            "arg separ": {},
            "dice roll": {
                "color": "#859900"
            },
            "function": {
                "color": "#B58900",
            },
            "group close": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #839496"
            },
            "group open": {
                "borderRadius": ".15em",
                "highlight:boxShadow": "0 0 0 .1em #839496"
            },
            "invalid": {
                "backgroundColor": "#DC322F",
                "color": "#EEE8D5"
            },
            "named": {
                "color": "#2AA198",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#268BD2"
            },
            "operator": {
                "color": "#D33682"
            },
            "whitespace": {
                "color": "#EEE8D5"
            }
        },
        "Verdandi Dark": {
            "name": "Verdandi Dark",
            "arrow": "#C0C5CA",
            "background": "#050607",
            "hover": "#111316",
            "link": "#C0C5CA",
            "separator": "#D6DADE",
            "text": "#A1A8AE",
            "type": "dark",
            "arg separ": {},
            "dice roll": {},
            "function": {
                "color": "#D6DADE",
                "fontWeight": "bold"
            },
            "group close": {
                "borderRadius": ".15em",
                "color": "#7E868D",
                "highlight:background": "#D6DADE",
                "highlight:color": "#050607"
            },
            "group open": {
                "borderRadius": ".15em",
                "color": "#7E868D",
                "highlight:background": "#D6DADE",
                "highlight:color": "#050607"
            },
            "invalid": {
                "color": "#B30E0E"
            },
            "named": {
                "color": "#D6DADE",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#D6DADE"
            },
            "operator": {
                "color": "#D6DADE"
            },
            "whitespace": {
                "color": "#5B646C"
            }
        },
        "Verdandi Light": {
            "name": "Verdandi Light",
            "arrow": "#353A3F",
            "background": "#F8F9FA",
            "hover": "#B4E2FC",
            "link": "#353A3F",
            "separator": "#212529",
            "text": "#51575E",
            "type": "light",
            "arg separ": {},
            "dice roll": {},
            "function": {
                "color": "#212529",
                "fontWeight": "bold"
            },
            "group close": {
                "borderRadius": ".15em",
                "color": "#727981",
                "highlight:background": "#212529",
                "highlight:color": "#F8F9FA"
            },
            "group open": {
                "borderRadius": ".15em",
                "color": "#727981",
                "highlight:background": "#212529",
                "highlight:color": "#F8F9FA"
            },
            "invalid": {
                "color": "#F14C4C"
            },
            "named": {
                "color": "#212529",
                "fontStyle": "italic"
            },
            "number": {
                "color": "#212529"
            },
            "operator": {
                "color": "#212529"
            },
            "whitespace": {
                "color": "#939BA4"
            }
        }
    };

    dieroller.theme = dieroller.themes[localStorage["die_roll_theme"] || "Material Light"];
}

dieroller.eval = function eval(tokens) {
	// This function takes an array of tokens (from `syntax.parse') and evaluates it
	// until it reaches one final answer.

	// If any of the tokens are invalid, it can't be parsed.
	if (tokens.invalid) return "undefined";

	// The tokens are simplified beforehand.
	tokens = syntax.normalize(tokens);

	// Since whitespace tokens only get in the way, they are removed completely before
	// anything.
	for (var i = 0; i < tokens.length; i++) {
	    if (tokens[i].type == "whitespace") tokens.splice(i, 1);
	}

	// A list of tokens may include "named" tokens. These types of tokens refer to one
	// of the already set rolls stored in `diceroller.savedRolls'. First, these are
	// looked for in the array and replaced with their respective definitions. Each one
	// is also surrounded by parentheses to ensure it is evaluated before any surround-
	// ing tokens.
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "named") {
			var replacement = dieroller.savedRolls[tokens[i].refer],
				closingParen = {
					type: "group close",
					value: ")"
				};
			tokens.splice.apply(tokens, [i, 1, {
				type: "group open",
				value: "(",
				closer: closingParen
			}].concat(syntax.parse(dieroller.savedRolls[tokens[i].refer])).concat(closingParen));
		}
	}

	// Now, each function is evaluated by separating its arguments into their own
	// groups of tokens and evaluating each one. Depending on the function, only one
	// number will remain.
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "function") {
			var index = tokens.indexOf(tokens[i + 1].closer),
				inner = tokens.slice(i + 2, index);

			// All the arguments are now stored in `inner', but they still need to be separated
			// at each comma. Commas inside a group of parentheses don't count as separators
            // since it would be wrong to separate a pair of parentheses into different argu-
            // ments.
			inner.push({
				type: "arg separ",
				value: ","
			});
			var args = [],
                openGroups = 0;
			for (var n = 0; n < inner.length; n++) {
				if (inner[n].type == "arg separ" && !openGroups) {
					args.push(inner.splice(0, n));
					inner.shift();
					n = -1;
				} else if (inner[n].type == "group open") {
                    openGroups++;
                } else if (inner[n].type == "group close") {
                    openGroups--;
                }
			}

			// Now, if there was only one argument, and it has a multiplier (e.g. 4d8), it
			// should be expanded. This is where a distinction is made between something like
			// "max(4d4, 2d8)" and  "max(4d4)". In the first, there are two arguments to the
			// function: "4d4" and "2d8". Both are evaluated separately and then the "max" re-
			// turned the greater of the two. In the second though, there is only one argument
			// to "max": "4d4". In this case, instead of just evaluating "4d4" and returning it
			// (since there are no other arguments that can be greater than it), it is expanded
			// to "max(1d4, 1d4, 1d4, 1d4)". That way, it's taking the maximum of the four
			// rolls instead of the sum. You can still do something like "max(max(4d4), 1d4)"
			// to get a combination of the two (it'll basically be "max(5d4)" in this case.
			if (args.length == 1) {
				args = args[0];
				if (
					(
						args[0].type == "number" &&
						args[1] && (
							args[1].type == "dice roll" &&
							!args[2] ||
							args[1].type == "operator" &&
							args[1].value == "*" &&
							args[2] &&
							args[2].type == "group open" &&
							args[2].closer == args[args.length - 1]
						)
					) || (
						args[args.length - 1].type == "number"&&
						args[args.length - 2] &&
						args[args.length - 2].type == "operator" &&
						args[args.length - 2].value == "*" &&
						args[args.length - 3] && (
							args[args.length - 3].type == "dice roll" ||
							args[args.length - 3].type == "group close" &&
							args[0].closer == args[args.length - 3]
						)
					)
				) {
					var multiplicand = args[0].type == "number" ? args[1].type == "dice roll" ? [args[1]] :
						args.slice(2, args.length) : args.slice(0, args.length - 2);
                    if (args[0].type == "number" ? args[0].value[0] == "-" : args[args.length - 1].value[0] == "-") {
                        multiplicand.unshift({
                            type: "operator",
                            value: "-",
                            isMinus: true
                        });
                    }
					for (var n = Math.abs(args[0].type == "number" ? args[0].value : args[args.length - 1].value), args = []; n > 0; n--) {
						args.push(multiplicand);
					}
				} else {
					args = [args];
				}
			}

			for (var n = args.length - 1; n >= 0; n--) {
				args[n] = dieroller.eval(args[n]);
			}

			switch (tokens[i].refer) {
				case "max":
				case "maximum":
				case "keepHighest":
				case "saveHighest":
					tokens.splice(i, index - i + 1, {
						type: "number",
						value: Math.max.apply(Math, args.map(function(number) {return +number})).toString()
					});
					break;

				case "min":
				case "minimum":
				case "keepLowest":
				case "saveLowest":
					tokens.splice(i, index - i + 1, {
						type: "number",
						value: Math.min.apply(Math, args.map(function(number) {return +number})).toString()
					});
					break;

				case "dropHighest":
				case "loseHighest":
					var highest = args[0];
					for (var n = args.length, j = args.length; n < j; n++) {
						if (args[n] > highest) highest = args[n];
					}
					args.splice(args.indexOf(highest), 1);
					tokens.splice(i, index - i + 1, {
						type: "number",
						value: args.reduce(function(a, b) {return +a+ +b}, 0).toString()
					})
					break;

				case "dropLowest":
				case "loseLowest":
					var lowest = args[0];
					for (var n = args.length, j = args.length; n < j; n++) {
						if (args[n] < lowest) lowest = args[n];
					}
					args.splice(args.indexOf(lowest), 1);
					tokens.splice(i, index - i + 1, {
						type: "number",
						value: args.reduce(function(a, b) {return +a+ +b}, 0).toString()
					})
					break;
			}
		}
	}

	// Now that named tokens and functions have been taken care of, parentheses are
	// evaluated next.
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "group open") {
			var index = tokens.indexOf(tokens[i].closer),
				inner = tokens.slice(i + 1, index);

			tokens.splice(i, index - i + 1, {
				type: "number",
				value: dieroller.eval(inner)
			});
		}
	}

	// All parentheses, functions, and names should be gone now. The only real things
	// that are left is just pure numbers and dice rolls. Dice rolls are done next.
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "dice roll") {
			var max = tokens[i].value.substring(1),
				sum = 0;

			for (var n = Math.abs(tokens[i - 1].type == "number" ? tokens[i - 1].value : "1"); n > 0; n--) {
				sum += Math.floor(max * Math.random()) + 1;
			}

			tokens.splice(tokens[i - 1].type == "number" ? i - 1 : i, tokens[i - 1].type == "number" ? 2 : 1, {
				type: "number",
				value: (tokens[i - 1].value[0] == "-" ? "-" : "") + sum.toString()
			});
		}
	}

	// Everything should now just be a bunch of numbers and operators connecting them.
	// Before they are all reduced to just one number, any minus signs are evaluated to
	// prevent them from being treated like operators.
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].isMinus) {
			tokens[i + 1].value = tokens[i + 1].value[0] == "-" ? tokens[i + 1].value.substring(1) : "-" + tokens[i + 1].value;
			tokens.splice(i, 1);
		}
	}

	// Now, multiplication, division, and modulus are all evaluated (to respect the
	// order of operations).
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "operator" && tokens[i].value == "*") {
			tokens.splice(i - 1, 3, {
				type: "number",
				value: (tokens[i - 1].value * tokens[i + 1].value).toString()
			});
			i--;
		} else if (tokens[i].type == "operator" && tokens[i].value == "/") {
            if (tokens[i + 1].value == "0") {
                tokens.splice(i - 1, 3, {
                    type: "number",
                    value: "NaN"
                });
            } else {
                tokens.splice(i - 1, 3, {
                    type: "number",
                    value: (tokens[i - 1].value / tokens[i + 1].value).toString()
                });
            }
			i--;
		} else if (tokens[i].type == "operator" && tokens[i].value == "%") {
			tokens.splice(i - 1, 3, {
				type: "number",
				value: (tokens[i - 1].value % tokens[i + 1].value).toString()
			});
			i--;
		}
	}

	// Now, just addition and subtraction.
	// Now, multiplication, division, and modulus are all evaluated (to respect the
	// order of operations).
	for (var i = 0; i < tokens.length; i++) {
		if (tokens[i].type == "operator" && tokens[i].value == "+") {
			tokens.splice(i - 1, 3, {
				type: "number",
				value: (+tokens[i - 1].value + +tokens[i + 1].value).toString()
			});
			i--;
		} else if (tokens[i].type == "operator" && tokens[i].value == "-") {
			tokens.splice(i - 1, 3, {
				type: "number",
				value: (tokens[i - 1].value - tokens[i + 1].value).toString()
			});
			i--;
		}
	}

	return tokens[0] ? tokens[0].value : "undefined";
}
