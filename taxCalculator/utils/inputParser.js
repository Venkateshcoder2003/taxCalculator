"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputParser = void 0;
var InputParser = /** @class */ (function () {
    function InputParser() {
    }
    InputParser.prototype.parseArguments = function (args) {
        var input = {}; // creating an input object to store the parsedarguments
        for (var i = 2; i < args.length; i += 2) {
            var key = args[i];
            var value = args[i + 1];
            if (!value || value.startsWith("-")) {
                throw new Error("Missing Value for Argument: ".concat(key));
            }
            switch (key) {
                case "-name":
                    input.name = value;
                    break;
                case "-price":
                    input.price = parseFloat(value);
                    break;
                case "-quantity":
                    input.quantity = parseInt(value);
                    break;
                case "-type":
                    input.type = value;
                    break;
                default:
                    throw new Error("Unknown Argument Entered: ".concat(key));
            }
        }
        if (!input.name || !input.price || !input.quantity || !input.type) {
            throw new Error("Missing Some Arguments");
        }
        return input;
    };
    return InputParser;
}());
exports.InputParser = InputParser;
;
