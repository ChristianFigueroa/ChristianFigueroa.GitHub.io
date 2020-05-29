var syntax = {};

syntax.parse = function parse(str) {
    // This will parse a string (`str') into an array of tokens. The tokens can be bet-
    // ter understood and manipulated by other functions. If the string doesn't follow
    // the syntax exactly, some tokens may be marked as invalid.
    var scope = "start",
        tokens = [],
        groupOpeners = [],
        namedRolls = Object.keys(dieroller.savedRolls).sort(function(a, b) {
            return a.length > b.length;
        });

    function lastToken(n) {
        // This will return the last token in `tokens' that actually matters (i.e. white-
        // space tokens are skipped over). `n' is an optional argument that will return
        // the `n'th to last token (default is 1).
        n = n || 1;
        for (var i = tokens.length - 1; i >= 0; i--) {
            if (tokens[i].type != "whitespace") n -= 1;
            if (n == 0) return tokens[i];
        }
    }

    while (str) {
        // Look for plain whitespace characters
        if (~"\u00A0 \t".indexOf(str[0])) {
            var whitespace = "";
            while (~"\u00A0 \t".indexOf(str[0])) {
                whitespace += str[0];
                str = str.substring(1);
            }
            tokens.push({
                type: "whitespace",
                value: whitespace
            });
            continue;
        }

        contLoop = false;

        switch (scope) {
            case "start":
                // Look for names of saved rolls (case sensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length) == namedRolls[i]) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for names of saved rolls (case insensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length).toLowerCase() == namedRolls[i].toLowerCase()) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for a name of a function (e.g. dropLowest(), min(), etc.)
                for (var i = dieroller.functionNames.length - 1; i >= 0; i--) {
                    if (str.substring(0, dieroller.functionNames[i].length).toLowerCase() == dieroller.functionNames[i].toLowerCase() &&
                        str.substring(dieroller.functionNames[i].length).trim()[0] == "(") {
                        tokens.push({
                            type: "function",
                            value: str.substring(0, dieroller.functionNames[i].length),
                            refer: dieroller.functionNames[i]
                        });
                        str = str.substring(dieroller.functionNames[i].length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for a plain number
                if (~"0123456789.".indexOf(str[0])) {
                    var num = "";
                    while (~"0123456789".indexOf(str[0])) {
                        num += str[0];
                        str = str.substring(1);
                    }
                    if (str[0] == "." && (num || ~"0123456789".indexOf(str[1]))) {
                        num += ".";
                        str = str.substring(1);
                        while (~"0123456789".indexOf(str[0])) {
                            num += str[0];
                            str = str.substring(1);
                        }
                    } else if (str[0] == ".") {
                        tokens.push({
                            type: "invalid",
                            value: "."
                        });
                        str = str.substring(1);
                        continue;
                    }
                    tokens.push({
                        type: "number",
                        value: num
                    });
                    scope = "post num";
                    continue;
                }

                // Look for a minus sign
                if (str[0] == "-") {
                    tokens.push({
                        type: "operator",
                        value: "-",
                        isMinus: true
                    });
                    str = str.substring(1);
                    scope = "post op";
                    continue;
                }

                // Look for opening parenthesis
                if (str[0] == "(") {
                    var last = lastToken() || {};
                    tokens.push({
                        type: "group open",
                        value: "(",
                        fromFunction: last.type == "function" ? last : false
                    });
                    str = str.substring(1);
                    scope = "start";
                    groupOpeners.push(lastToken());
                    continue;
                }

                // Look for closing parenthesis
                if (str[0] == ")" && lastToken() && lastToken().type != "group open") {
                    if (groupOpeners.length) {
                        if (lastToken().type == "arg separ") lastToken().type = "invalid";
                        tokens.push({
                            type: "group close",
                            value: ")"
                        });
                        scope = "post paren";
                        groupOpeners[groupOpeners.length - 1].closer = lastToken();
                        groupOpeners.pop();
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: ")"
                        });
                    }
                    str = str.substring(1);
                    continue;
                }

                // Look for "d" or "D" followed by an integer (indicates a dice roll)
                if (str[0] == "d" || str[0] == "D") {
                    var d = str[0];
                    str = str.substring(1);
                    var num = "",
                        afterD = str;
                    while (~"0123456789".indexOf(str[0])) {
                        num += str[0]
                        str = str.substring(1);
                    }
                    if (num && num.split("").some(function(digit) {
                        return digit != "0";
                    })) {
                        tokens.push({
                            type: "dice roll",
                            value: d + num
                        });
                        scope = "post die";
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: d
                        });
                        str = afterD;
                    }
                    continue;
                }

                // Look for a comma character, as long they are inside of a set of parentheses and
                // those parentheses are from a function call.
                if (str[0] == "," && groupOpeners.length && groupOpeners[groupOpeners.length - 1].fromFunction && !~dieroller.functionNames.single.indexOf(groupOpeners[groupOpeners.length - 1].fromFunction.refer) && lastToken().type != "arg separ") {
                    tokens.push({
                        type: "arg separ",
                        value: ","
                    });
                    str = str.substring(1);
                    scope = "start";
                    continue
                }
                break;

            case "post num":
                // Look for names of saved rolls (case sensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length) == namedRolls[i]) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for names of saved rolls (case insensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length).toLowerCase() == namedRolls[i].toLowerCase()) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for a name of a function (e.g. dropLowest(), min(), etc.)
                for (var i = dieroller.functionNames.length - 1; i >= 0; i--) {
                    if (str.substring(0, dieroller.functionNames[i].length).toLowerCase() == dieroller.functionNames[i].toLowerCase() &&
                        str.substring(dieroller.functionNames[i].length).trim()[0] == "(") {
                        tokens.push({
                            type: "function",
                            value: str.substring(0, dieroller.functionNames[i].length),
                            refer: dieroller.functionNames[i]
                        });
                        str = str.substring(dieroller.functionNames[i].length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for operator characters (+, -, *, /, %)
                if (~"+-*/%".indexOf(str[0])) {
                    tokens.push({
                        type: "operator",
                        value: str[0]
                    });
                    str = str.substring(1);
                    scope = "post op";
                    continue;
                }

                // Look for opening parenthesis
                if (str[0] == "(") {
                    var last = lastToken() || {};
                    tokens.push({
                        type: "group open",
                        value: "(",
                        fromFunction: last.type == "function" ? last : false
                    });
                    str = str.substring(1);
                    scope = "start";
                    groupOpeners.push(lastToken());
                    continue;
                }

                // Look for closing parenthesis
                if (str[0] == ")") {
                    if (groupOpeners.length) {
                        tokens.push({
                            type: "group close",
                            value: ")"
                        });
                        scope = "post paren";
                        groupOpeners[groupOpeners.length - 1].closer = lastToken();
                        groupOpeners.pop();
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: ")"
                        });
                    }
                    str = str.substring(1);
                    continue;
                }

                // Look for "d" or "D" followed by an integer (indicates a dice roll)
                if (str[0] == "d" || str[0] == "D") {
                    var d = str[0];
                    str = str.substring(1);
                    var num = "",
                        afterD = str;
                    while (~"0123456789".indexOf(str[0])) {
                        num += str[0]
                        str = str.substring(1);
                    }
                    if (num && num.split("").some(function(digit) {
                        return digit != "0";
                    })) {
                        tokens.push({
                            type: "dice roll",
                            value: d + num
                        });
                        scope = "post die";
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: d
                        });
                        str = afterD;
                    }
                    continue;
                }

                // Look for a comma character, as long they are inside of a set of parentheses and
                // those parentheses are from a function call.
                if (str[0] == "," && groupOpeners.length && groupOpeners[groupOpeners.length - 1].fromFunction && !~dieroller.functionNames.single.indexOf(groupOpeners[groupOpeners.length - 1].fromFunction.refer)) {
                    tokens.push({
                        type: "arg separ",
                        value: ","
                    });
                    str = str.substring(1);
                    scope = "start";
                    continue
                }
                break;

            case "post op":
                // Look for names of saved rolls (case sensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length) == namedRolls[i]) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for names of saved rolls (case insensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length).toLowerCase() == namedRolls[i].toLowerCase()) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for a name of a function (e.g. dropLowest(), min(), etc.)
                for (var i = dieroller.functionNames.length - 1; i >= 0; i--) {
                    if (str.substring(0, dieroller.functionNames[i].length).toLowerCase() == dieroller.functionNames[i].toLowerCase() &&
                        str.substring(dieroller.functionNames[i].length).trim()[0] == "(") {
                        tokens.push({
                            type: "function",
                            value: str.substring(0, dieroller.functionNames[i].length),
                            refer: dieroller.functionNames[i]
                        });
                        str = str.substring(dieroller.functionNames[i].length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for a plain number
                if (~"0123456789.".indexOf(str[0])) {
                    var num = "";
                    while (~"0123456789".indexOf(str[0])) {
                        num += str[0];
                        str = str.substring(1);
                    }
                    if (str[0] == "." && (num || ~"0123456789".indexOf(str[1]))) {
                        num += ".";
                        str = str.substring(1);
                        while (~"0123456789".indexOf(str[0])) {
                            num += str[0];
                            str = str.substring(1);
                        }
                    } else if (str[0] == ".") {
                        tokens.push({
                            type: "invalid",
                            value: "."
                        });
                        str = str.substring(1);
                        continue;
                    }
                    tokens.push({
                        type: "number",
                        value: num
                    });
                    scope = "post num";
                    continue;
                }

                // Look for a minus sign, so long as the operator before it was not already a minus
                // sign
                if (str[0] == "-" && lastToken(2) &&
                    lastToken(2).type != "operator" && lastToken(2).type != "group open") {
                    tokens.push({
                        type: "operator",
                        value: "-",
                        isMinus: true
                    });
                    str = str.substring(1);
                    scope = "post op";
                    continue;
                }

                // Look for opening parenthesis
                if (str[0] == "(") {
                    var last = lastToken() || {};
                    tokens.push({
                        type: "group open",
                        value: "(",
                        fromFunction: last.type == "function" ? last : false
                    });
                    str = str.substring(1);
                    scope = "start";
                    groupOpeners.push(lastToken());
                    continue;
                }

                // Look for closing parenthesis
                if (str[0] == ")") {
                    if (groupOpeners.length) {
                        // If a closing parenthesis follows an operator, the operator is marked as invalid
                        // since it needs to be followed up by something.
                        lastToken().type = "invalid";
                        if (lastToken(2).type == "operator") lastToken(2).type = "invalid";
                        tokens.push({
                            type: "group close",
                            value: ")"
                        });
                        scope = "post paren";
                        groupOpeners[groupOpeners.length - 1].closer = lastToken();
                        groupOpeners.pop();
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: ")"
                        });
                    }
                    str = str.substring(1);
                    continue;
                }

                // Look for "d" or "D" followed by an integer (indicates a dice roll)
                if (str[0] == "d" || str[0] == "D") {
                    var d = str[0];
                    str = str.substring(1);
                    var num = "",
                        afterD = str;
                    while (~"0123456789".indexOf(str[0])) {
                        num += str[0]
                        str = str.substring(1);
                    }
                    if (num && num.split("").some(function(digit) {
                        return digit != "0";
                    })) {
                        tokens.push({
                            type: "dice roll",
                            value: d + num
                        });
                        scope = "post die";
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: d
                        });
                        str = afterD;
                    }
                    continue;
                }

                // Look for a comma character, as long they are inside of a set of parentheses and
                // those parentheses are from a function call.
                if (str[0] == "," && groupOpeners.length && groupOpeners[groupOpeners.length - 1].fromFunction && !~dieroller.functionNames.single.indexOf(groupOpeners[groupOpeners.length - 1].fromFunction.refer)) {
                    // Since a comma completely closes separates one set of tokens from another, if the
                    // previous set ended in an operator, it is marked as invalid.
                    lastToken().type = "invalid";
                    if (lastToken(2).type == "operator") lastToken(2).type = "invalid";
                    tokens.push({
                        type: "arg separ",
                        value: ","
                    });
                    str = str.substring(1);
                    scope = "start";
                    continue
                }
                break;

            case "post die":
                // Look for names of saved rolls (case sensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length) == namedRolls[i]) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for names of saved rolls (case insensitive)
                for (var i = namedRolls.length - 1; i >= 0; i--) {
                    if (str.replace(/\s+/g, "\u00A0").substring(0, namedRolls[i].length).toLowerCase() == namedRolls[i].toLowerCase()) {
                        var copy = str;
                        for (var n = namedRolls[i].split("\u00A0").length - 1; n > 0; n--) {
                            copy = copy.replace(/\s+/, "\u00A0");
                        }
                        var match = str.substring(0, str.length - copy.length + namedRolls[i].length);
                        tokens.push({
                            type: "named",
                            value: match,
                            refer: namedRolls[i]
                        });
                        scope = "post paren";
                        str = str.substring(match.length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for a name of a function (e.g. dropLowest(), min(), etc.)
                for (var i = dieroller.functionNames.length - 1; i >= 0; i--) {
                    if (str.substring(0, dieroller.functionNames[i].length).toLowerCase() == dieroller.functionNames[i].toLowerCase() &&
                        str.substring(dieroller.functionNames[i].length).trim()[0] == "(") {
                        tokens.push({
                            type: "function",
                            value: str.substring(0, dieroller.functionNames[i].length),
                            refer: dieroller.functionNames[i]
                        });
                        str = str.substring(dieroller.functionNames[i].length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for operator characters (+, -, *, /, %)
                if (~"+-*/%".indexOf(str[0])) {
                    tokens.push({
                        type: "operator",
                        value: str[0]
                    });
                    str = str.substring(1);
                    scope = "post op";
                    continue;
                }

                // Look for opening parenthesis
                if (str[0] == "(") {
                    var last = lastToken() || {};
                    tokens.push({
                        type: "group open",
                        value: "(",
                        fromFunction: last.type == "function" ? last : false
                    });
                    str = str.substring(1);
                    scope = "start";
                    groupOpeners.push(lastToken());
                    continue;
                }

                // Look for closing parenthesis
                if (str[0] == ")") {
                    if (groupOpeners.length) {
                        tokens.push({
                            type: "group close",
                            value: ")"
                        });
                        scope = "post paren";
                        groupOpeners[groupOpeners.length - 1].closer = lastToken();
                        groupOpeners.pop();
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: ")"
                        });
                    }
                    str = str.substring(1);
                    continue;
                }

                // Look for a comma character, as long they are inside of a set of parentheses and
                // those parentheses are from a function call.
                if (str[0] == "," && groupOpeners.length && groupOpeners[groupOpeners.length - 1].fromFunction && !~dieroller.functionNames.single.indexOf(groupOpeners[groupOpeners.length - 1].fromFunction.refer)) {
                    tokens.push({
                        type: "arg separ",
                        value: ","
                    });
                    str = str.substring(1);
                    scope = "start";
                    continue
                }
                break;

            case "post paren":
                // Look for a name of a function (e.g. dropLowest(), min(), etc.)
                for (var i = dieroller.functionNames.length - 1; i >= 0; i--) {
                    if (str.substring(0, dieroller.functionNames[i].length).toLowerCase() == dieroller.functionNames[i].toLowerCase() &&
                        str.substring(dieroller.functionNames[i].length).trim()[0] == "(") {
                        tokens.push({
                            type: "function",
                            value: str.substring(0, dieroller.functionNames[i].length),
                            refer: dieroller.functionNames[i]
                        });
                        str = str.substring(dieroller.functionNames[i].length);
                        contLoop = true;
                        break;
                    }
                }

                if (contLoop) continue;

                // Look for operator characters (+, -, *, /, %)
                if (~"+-*/%".indexOf(str[0])) {
                    tokens.push({
                        type: "operator",
                        value: str[0]
                    });
                    str = str.substring(1);
                    scope = "post op";
                    continue;
                }

                // Look for opening parenthesis
                if (str[0] == "(") {
                    var last = lastToken() || {};
                    tokens.push({
                        type: "group open",
                        value: "(",
                        fromFunction: last.type == "function" ? last : false
                    });
                    str = str.substring(1);
                    scope = "start";
                    groupOpeners.push(lastToken());
                    continue;
                }

                // Look for closing parenthesis
                if (str[0] == ")") {
                    if (groupOpeners.length) {
                        tokens.push({
                            type: "group close",
                            value: ")"
                        });
                        scope = "post paren";
                        groupOpeners[groupOpeners.length - 1].closer = lastToken();
                        groupOpeners.pop();
                    } else {
                        tokens.push({
                            type: "invalid",
                            value: ")"
                        });
                    }
                    str = str.substring(1);
                    continue;
                }

                // Look for a comma character, as long they are inside of a set of parentheses and
                // those parentheses are from a function call.
                if (str[0] == "," && groupOpeners.length && groupOpeners[groupOpeners.length - 1].fromFunction && !~dieroller.functionNames.single.indexOf(groupOpeners[groupOpeners.length - 1].fromFunction.refer)) {
                    tokens.push({
                        type: "arg separ",
                        value: ","
                    });
                    str = str.substring(1);
                    scope = "start";
                    continue
                }
                break;
        }

        // If the character didn't match anything above, it's considered invalid
        tokens.push({
            type: "invalid",
            value: str[0]
        });
        str = str.substring(1);
        continue;
    }

    if (scope == "post op") {
        lastToken().type = "invalid";
        if (lastToken(2) && lastToken(2).type == "operator") lastToken(2).type = "invalid";
    } else if (lastToken() && lastToken().type == "arg separ") {
        lastToken().type = "invalid";
    }

    while (groupOpeners.length) {
        groupOpeners[0].type = "invalid";
        groupOpeners.shift();
    }

    tokens.invalid = tokens.some(function(token) {
        return token.type == "invalid";
    });

    return tokens;
}

syntax.reform = function reform(tokens, trackOperators) {
    // This function takes an array of tokens (from `syntax.parse') and returns a
    // string that, if parsed, would return the same array of tokens. The string is
    // pretty printed though, so something like "2* D4 + (4)(4 +d2)", after being
    // parsed and passed to this function, would return "2d4 + 4 * (4 + 1d2)".
    // `trackOperators' controls what is returned: if it is false (default), the string
    // is returned by itself. If it is true, a boolean is returned that indicates
    // whether any operator tokens were encountered (or created). It's used for when
    // a parenthesis is encountered. If there is at least one operator withing a paren-
    // theses group, it means the parentheses can't be safely stripped. If there aren't
    // any operators though, the outer parentheses are stripped off since it wouldn't
    // affect anything.

    var string = "";

    // To prevent messing with the original tokens, a clone of the array is made first.
    tokens = tokens.slice();
    for (var i = 0, l = tokens.length - 1; i < l; i++) {
        if (tokens[i].isCloser) continue;
        var token = {}
        for (var key in tokens[i]) {
            if (key == "closer") {
                token.closer = {
                    type: "group close",
                    value: ")",
                    isCloser: true
                };
                tokens.splice(tokens.indexOf(tokens[i].closer), 1, token.closer);
            } else token[key] = tokens[i][key];
        }
        tokens[i] = token;
    }

    // Since whitespace tokens are completely ignored when pretty printing, they get
    // removed form the list altogether right away.
    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type == "whitespace") tokens.splice(i, 1);
    }

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (trackOperators && token.type == "operator" && !token.isMinus) return true;

        if (token.type == "number") {
            // The number is simplified to convert stuff like "007" => "7" and ".030" => ".03"
            while (token.value[0] == "0") token.value = token.value.substring(1);
            if (~token.value.indexOf(".")) {
                while (token.value[token.value.length - 1] == "0") token.value = token.value.substring(0, token.value.length - 1);
            }
            if (token.value[token.value.length - 1] == ".") token.value = token.value.substring(0, token.value.length - 1);
            if (token.value == "") token.value = "0";
            if (token.value[0] == ".") token.value = "0" + token.value;
            if (tokens[i + 1] && tokens[i + 1].type == "operator" && tokens[i + 1].value == "*" &&
                tokens[i + 2] && tokens[i + 2].type == "dice roll") {
                tokens.splice(i + 1, 1);
            } else if (tokens[i + 1] && (tokens[i + 1].type == "group open" || tokens[i + 1].type == "named")) {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }

            // If a 0, or a decimal number is followed by a dice roll (e.g. 0d4 or 3.5d8), it
            // doesn't really make sense. How would you roll three and a half times? And what
            // would be the point of rolling 0 times? To prevent that, an extra "*" operator
            // is added between them. That way, "3.5d8" becomes three and a half times whatever
            // a d8 rolls. A 0 still doesn't really make sense either, but what can you do with
            // that?
            if ((token.value == "0" || ~token.value.indexOf(".")) && tokens[i + 1] && tokens[i + 1].type == "dice roll") {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }

            string += token.value;
        } else if (token.type == "dice roll") {
            if (!tokens[i - 1] || tokens[i - 1].type != "number") {
                string += "1";
            }
            if (tokens[i + 1] && tokens[i + 1].type == "group open") {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }
            string += "d" + token.value.substring(1);
        } else if (token.type == "operator") {
            if (token.isMinus) {
                if (tokens[i - 1] && tokens[i - 1].type == "operator" && tokens[i - 1].isMinus) {
                    string = string.substring(0, string.length - 1);
                    tokens.splice(i - 1, 2);
                    i -= 2;
                } else string += "-";
            } else string += " " + token.value + " ";
        } else if (token.type == "group open") {
            // Each opening parenthesis matches with its closing parenthesis and finds all the
            // tokens in between the two. Then that sub-array of tokens is reformed by itself.
            // After returning, if any operators were found, the parentheses are not stripped
            // off. Otherwise, the parentheses are stripped off.

            // If the parentheses are from a function call though (e.g. "min( ... )"), they are
            // not removed no matter what.
            if (token.fromFunction) {
                string += "(";
            } else {
                var index = tokens.indexOf(token.closer),
                    inner = tokens.slice(i + 1, index);

                // If `trackOperators' is true, it only cares about operators at the top level. Any
                // operators inside a set of parentheses don't count because they won't be affected
                // if the outer parentheses are removed. That lets it realize "(((1 + 1)))"" can be
                // simplified to just "(1 + 1)" since only the innermost set of parentheses need to
                // stay there.
                if (trackOperators) {
                    i = index;
                    continue;
                }

                // If the current opening parentheses is the first token, and the matching closing
                // token is the last token, then the parentheses can be removed because there is
                // nothing outside of them. That lets it realize that "(1 + 1)" is really equal to
                // just "1 + 1".
                if (i == 0 && index == tokens.length - 1) {
                    tokens.splice(index, 1);
                    tokens.splice(i, 1);
                    i--;
                } else if (syntax.reform(inner, true)) {
                    string += "(";
                } else {
                    tokens.splice(index, 1);
                    tokens.splice(i, 1);
                    i--;
                }
            }
        } else if (token.type == "group close") {
            if (tokens[i + 1] && tokens[i + 1].type == "group open") {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }
            string += ")";
        } else if (token.type == "named" || token.type == "function") {
            string += token.refer;
            if (token.type == "named") {
                if (tokens[i + 1] && tokens[i + 1].type == "group open") {
                    tokens.splice(i + 1, 0, {
                        type: "operator",
                        value: "*"
                    });
                }
            }
        } else if (token.type == "arg separ") {
            string += ", ";
        } else {
            string += token.value;
        }
    }

    return trackOperators ? false : string;
}

syntax.normalize = function normalize(tokens, trackOperators) {
    // This function normalizes an array of tokens. It prettifies the tokens like
    // `syntax.reform', but it ensures that the meaning of the tokens remains the same.
    // Imagine you have two named rolls: "name" and "2 * name" (both are technically
    // valid names). Now, imagine you type "2name", which would translate to: you want
    // twice the result of "name". Before that gets evaluated though, it gets pretti-
    // fied into "2 * name" so that the die roller knows what to do with that preceding
    // "2". But, now if you re-parse the prettified string, it'll get converted to your
    // other named token "2 * name", instead of being treated as twice the result of
    // "name". Obviously, it's stupid to name rolls like that, but just in case you
    // really want to, this function will fix it. This function still normalizes a
    // group of tokens (e.g. adding the "*" operator after that "2"), but it ensures
    // named tokens stay their correct names. It'll return another group of tokens.

    tokens = tokens.slice();
    for (var i = 0, l = tokens.length - 1; i < l; i++) {
        if (tokens[i].span) delete tokens[i].span;
        if (tokens[i].isCloser) continue;
        var token = {}
        for (var key in tokens[i]) {
            if (key == "closer") {
                token.closer = {
                    type: "group close",
                    value: ")",
                    isCloser: true
                };
                tokens.splice(tokens.indexOf(tokens[i].closer), 1, token.closer);
            } else token[key] = tokens[i][key];
        }
        tokens[i] = token;
    }

    for (var i = 0; i < tokens.length; i++) {
        if (tokens[i].type == "whitespace") tokens.splice(i, 1);
    }

    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];

        if (trackOperators && token.type == "operator" && !token.isMinus) return true;

        if (token.type == "number") {
            while (token.value[0] == "0") token.value = token.value.substring(1);
            if (~token.value.indexOf(".")) {
                while (token.value[token.value.length - 1] == "0") token.value = token.value.substring(0, token.value.length - 1);
            }
            if (token.value[token.value.length - 1] == ".") token.value = token.value.substring(0, token.value.length - 1);
            if (token.value == "") token.value = "0";
            if (token.value[0] == ".") token.value = "0" + token.value;
            if (tokens[i + 1] && tokens[i + 1].type == "operator" && tokens[i + 1].value == "*" &&
                tokens[i + 2] && tokens[i + 2].type == "dice roll") {
                tokens.splice(i + 1, 1);
            } else if (tokens[i + 1] && (tokens[i + 1].type == "group open" || tokens[i + 1].type == "named")) {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }

            while (tokens[i - 1] && tokens[i - 1].type == "operator" && tokens[i - 1].isMinus) {
                if (token.value[0] == "-") token.value = token.value.substring(1);
                else token.value = "-" + token.value;
                tokens.splice(i - 1, 1);
                i--;
            }

            if ((token.value == "0" || ~token.value.indexOf(".")) && tokens[i + 1] && tokens[i + 1].type == "dice roll") {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }
        } else if (token.type == "dice roll") {
            if (!tokens[i - 1] || tokens[i - 1].type != "number") {
                tokens.splice(i, 0, {
                    type: "number",
                    value: "1"
                });
                i++;
            }
            if (tokens[i + 1] && tokens[i + 1].type == "group open") {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }
        } else if (token.type == "operator") {
            if (token.isMinus) {
                if (tokens[i - 1] && tokens[i - 1].type == "operator" & tokens[i - 1].isMinus) {
                    tokens.splice(i - 1, 2);
                    i -= 2;
                    continue;
                }
                if (tokens[i + 1].type == "number") {
                    tokens[i + 1] = {
                        type: "number",
                        value: tokens[i + 1].value[0] == "-" ? tokens[i + 1].value.substring(1) : "-" + tokens[i + 1].value
                    };
                    tokens.splice(i, 1);
                    i--;
                } else if (tokens[i + 1].type == "dice roll") {
                    tokens.splice(i, 1, {
                        type: "number",
                        value: "-1"
                    });
                }
            } else {
                tokens.splice(i, 1, {
                    type: "whitespace",
                    value: " "
                }, token, {
                    type: "whitespace",
                    value: " "
                });
                i += 2;
            }
        } else if (token.type == "group open") {
            if (!token.fromFunction) {
                var index = tokens.indexOf(token.closer),
                    inner = tokens.slice(i + 1, index);

                if (trackOperators) {
                    i = index;
                    continue;
                }

                if (!syntax.normalize(inner, true) || (i == 0 && index == tokens.length - 1)) {
                    tokens.splice(index, 1);
                    tokens.splice(i, 1);
                    i--;
                }
            }
        } else if (token.type == "group close") {
            if (tokens[i + 1] && tokens[i + 1].type == "group open") {
                tokens.splice(i + 1, 0, {
                    type: "operator",
                    value: "*"
                });
            }
        } else if (token.type == "named" || token.type == "function") {
            if (token.type == "named") {
                if (tokens[i + 1] && tokens[i + 1].type == "group open") {
                    tokens.splice(i + 1, 0, {
                        type: "operator",
                        value: "*"
                    });
                }
            }
            token.value = token.refer;
        } else if (token.type == "arg separ") {
            tokens.splice(i + 1, 0, {
                type: "whitespace",
                value: " "
            });
            i++;
        }
    }

    return trackOperators ? false : tokens;
}

syntax.render = function render(tokens) {
    // This function turns an array of tokens (from `syntax.parse') into an HTML elem-
    // ent. Each token is color coded to act as highlighting.

    var div = document.createElement("div");
    div.style.display = "inline-block";
    div.originalTokens = tokens;
    var theme = dieroller.theme;

    for (var i = tokens.length - 1; i >= 0; i--) {
        var token = tokens[i];

        if (token.type == "whitespace" && token.value.length > 1) {
            var expanded = token.value.split("").map(function(char) {
                return {
                    type: "whitespace",
                    value: char
                }
            });
            tokens.splice.apply(tokens, [i, 1].concat(expanded));
            i += expanded.length;
            continue;
        }

        if (token.type == "operator" && token.isMinus) {
            token = {
                type: "number",
                value: "-"
            };
        }

        var span = document.createElement("span");
        token.span = span;

        if (token.type == "whitespace") {
            switch (token.value) {
                case " ":
                case "\u00A0":
                    span.className = "ws_sp";
                    break;

                case "\t":
                    span.className = "ws_tb";
                    break;
            }
        }

        if (token.type == "group open") {
            span.closer = token.closer;
            span.addEventListener("mouseenter", function() {
                for (var key in theme["group close"]) {
                    if (key.substring(0, 10) == "highlight:") {
                        this.closer.span.style[key.substring(10)] = theme["group close"][key];
                    }
                }
            });
            span.addEventListener("mouseleave", function() {
                for (var key in theme["group close"]) {
                    if (key.substring(0, 10) == "highlight:") {
                        this.closer.span.style[key.substring(10)] = "";
                    }
                }
                this.closer.span.style.color = theme.text;
                for (var key in theme["group close"]) {
                    this.closer.span.style[key] = theme["group close"][key];
                }
            });

            token.closer.span.opener = token;
            token.closer.span.addEventListener("mouseenter", function() {
                for (var key in theme["group open"]) {
                    if (key.substring(0, 10) == "highlight:") {
                        this.opener.span.style[key.substring(10)] = theme["group open"][key];
                    }
                }
            });
            token.closer.span.addEventListener("mouseleave", function() {
                for (var key in theme["group open"]) {
                    if (key.substring(0, 10) == "highlight:") {
                        this.opener.span.style[key.substring(10)] = "";
                    }
                }
                this.opener.span.style.color = theme.text;
                for (var key in theme["group open"]) {
                    this.opener.span.style[key] = theme["group open"][key];
                }
            });
        }

        span.style.color = theme.text;

        for (var key in theme[token.type]) {
            span.style[key] = theme[token.type][key];
        }

        span.appendChild(document.createTextNode(token.value));
        div.insertBefore(span, div.firstElementChild);
    }

    return div;
}
