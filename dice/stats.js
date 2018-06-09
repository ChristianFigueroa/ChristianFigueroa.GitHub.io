importScripts("dieroller.js", "syntax.js");

self.addEventListener("message", function(e) {
    dieroller.savedRolls = e.data.savedRolls;
    dieroller.functionNames = e.data.functionNames;
    var roll = e.data.roll,
        possibilities = 1;

    // Named tokens are expanded first.
    while (true) {
        var doBreak = true;
        for (var i = 0; i < roll.length; i++) {
            if (roll[i].type == "named") {
                doBreak = false;
                var replacement = dieroller.savedRolls[roll[i].refer],
                    closingParen = {
                        type: "group close",
                        value: ")"
                    };
                roll.splice.apply(roll, [i, 1, {
                    type: "group open",
                    value: "(",
                    closer: closingParen
                }].concat(syntax.parse(dieroller.savedRolls[roll[i].refer])).concat(closingParen));
            }
        }
        if (doBreak) break;
    }

    // Now, dice rolls inside a function call are expanded (e.g. "max(2d20)" becomes
    // "max(d20, d20)").
    for (var i = 0; i < roll.length; i++) {
        if (roll[i].type == "group open" && roll[i].fromFunction && roll[i + 3] &&
            roll[i + 1].type == "number" && roll[i + 2].type == "dice roll" && roll[i + 3].type == "group close") {

            var n = 0;
            var args = Array.from({length: +roll[i + 1].value * 2 - 1}, function() {
                n++;
                return n % 2 ? {
                    type: "dice roll",
                    value: roll[i + 2].value
                } : {
                    type: "arg separ",
                    value: ","
                };
            });
            roll.splice.apply(roll, [i + 1, 2].concat(args));
        }
    }

    // Now the total amount of possibilities are counted.
    for (var i = roll.length - 1; i >= 0; i--) {
        if (roll[i].type == "dice roll") {
            possibilities *= roll[i - 1] && roll[i - 1].type == "number" ? Math.pow(roll[i].value.substring(1), +roll[i - 1].value) : roll[i].value.substring(1);
        }
    }
    // The number of possibilities is sent back to be displayed for the user.
    possibilities = possibilities.toString();
    self.postMessage(possibilities);

    // Any whitespace the tokens might have is removed now.
    for (var i = roll.length - 1; i >= 0; i--) {
        if (roll[i].type == "whitespace") {
            roll.splice(i, 1);
        }
    }


    // The total number of possibilities has been figured out. Now, each dice roll with
    // a multiplier is changed to addition (e.g. "3d4" => "(d4 + d4 + d4)").
    for (var i = 0; i < roll.length; i++) {
        if (roll[i].type == "dice roll" && roll[i - 1] && roll[i - 1].type == "number") {
            var n = 0,
                operator = roll[i - 1].value[0] == "-" ? "-" : "+";
            var args = Array.from({length: Math.abs(roll[i - 1].value) * 2 - 1}, function() {
                n++;
                return n % 2 ? {
                    type: "dice roll",
                    value: roll[i].value
                } : {
                    type: "operator",
                    value: operator
                };
            });
            if (roll[i - 1].value[0] == "-") args.unshift({
                type: "operator",
                value: "-",
                isMinus: true
            });
            var closeParen = {
                type: "group close",
                value: ")"
            };
            roll.splice.apply(roll, [i - 1, 2, {
                type: "group open",
                value: "(",
                closer: closeParen
            }].concat(args).concat(closeParen));
        }
    }

    // Whitespace is removed next.
    for (var i = roll.length - 1; i >= 0; i--) {
        if (roll[i].type == "whitespace") {

        }
    }

    // A full list of the dice involved in the complete roll is made. This will keep
    // track of what number is being done. One die is incremented each evaluation. Once
    // that die has reached its maximum value, it is set back to 1 and another die is
    // incremented. The whole thing stats again with the original die until the second
    // die has also been completely exhausted, then a third die is incremented. This
    // happens until all the dice has been rolled in every possible combination. With
    // complex rolls (and even some relatively simple ones), the total number of comb-
    // inations can be enormous, which can take a lot of time to go through. That's why
    // this script is supposed to be run in a web worker: so the main thread doesn't
    // stall out while this work is being done.
    var dice = [];
    function createDice(tokens) {
        for (var i = 0, l = roll.length; i < l; i++) {
            if (roll[i].type == "dice roll") {
                dice.push({
                    max: roll[i].value.substring(1),
                    current: "1",
                    orig: roll[i],
                    index: i
                });
            }
        }
    }
    createDice(tokens);

    // Now comes the part where everything starts being evaluated. As an answer is
    // reached, it is kept track of in `distribution'. That object will contain all the
    // results and be used to make all the statistics.
    var distribution = {},
        done = 0;

    // This function is called each time another die has to be incremented. It also
    // makes sure an increment can be carried over to the next die once one die has
    // reached its maximum. It returns a boolean that indicated whether there are
    // still more evaluations to run.
    function increment() {
        for (var i = dice.length - 1; i >= 0; i--) {
            if (dice[i].current == dice[i].max) {
                dice[i].current = "1";
                if (!i) {
                    return false;
                }
            } else {
                dice[i].current = (+dice[i].current + 1).toString();
                break;
            }
        }
        return true;
    }

    // If `dice' is of length 0, it means there are no dice rolls in the original roll,
    // which means you can't get varying results. The evaluation will always return the
    // same constant value no matter how many time you roll it.
    if (dice.length) {
        // The first (actually last in the list, but the first to be incremented) die is
        // set to 0 so that when it is incremented for the first time, all the dice will
        // have a value of 1.
        dice[dice.length - 1].current = "0";

        while (true) {
            if (increment()) {
                // A copy of the `roll' is made so that the array can be changed without affecting
                // the original.
                var tokens = roll.slice();

                // Each dice roll in the list is changed to its static value. For the first evalua-
                // tion, all of them have a value of 1. In the next one, one of the dice will have
                // a value of 2 (unless it was a d1, in which case, it's not even a real dice roll)
                // and so on.
                for (var i = dice.length - 1; i >= 0; i--) {
                    tokens[dice[i].index] = {
                        type: "number",
                        value: dice[i].current
                    };
                }
                // At this point, all dice rolls have been changed to a static number and the whole
                // roll can be parsed.
                var result = evaluate(tokens);
                result = (Math.round(result * 10e4) / 10e4).toString();
                distribution[result] = (distribution[result] || 0) + 1;
                done++;

                if (done % 5000 == 0) {
                    self.postMessage({
                        done: false,
                        progress: done.toString(),
                        total: possibilities
                    })
                }
            } else break;
        }
        for (var key in distribution) {
            distribution[key] = distribution[key].toString();
        }
    } else {
        var result = evaluate(roll);
        result = (Math.round(result * 10e7) / 10e7).toString();
        possibilities = "1";
        distribution[result] = "1";
    }

    self.postMessage({
        done: true,
        progress: possibilities,
        total: possibilities,
        distribution: distribution
    });

    // This function is basically `dieroller.eval', but parts of it have been removed
    // since they're not used. Since there are not dice rolls (all dice rolls are pre-
    // determined before they're passed in) or name expansions, those parts are taken
    // out.
    function evaluate(tokens) {
        // Comments have been removed since the code is copied from `dieroller.eval', but
        // with some parts removed.
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].type == "function") {
                var index = tokens.indexOf(tokens[i + 1].closer),
                    inner = tokens.slice(i + 2, index);

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

                for (var n = args.length - 1; n >= 0; n--) {
                    args[n] = evaluate(args[n]);
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

        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].type == "group open") {
                var index = tokens.indexOf(tokens[i].closer),
                    inner = tokens.slice(i + 1, index);

                tokens.splice(i, index - i + 1, {
                    type: "number",
                    value: evaluate(inner)
                });
            }
        }

        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].isMinus) {
                tokens[i + 1].value = tokens[i + 1].value[0] == "-" ? tokens[i + 1].value.substring(1) : "-" + tokens[i + 1].value;
                tokens.splice(i, 1);
            }
        }

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

        return tokens[0].value;
    }
});