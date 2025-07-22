"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputParser = void 0;
//This class handels parsing of command-line arguments and make it an interface of type parsedInput.
var InputParser = /** @class */ (function () {
    function InputParser() {
    }
    InputParser.prototype.parseArguments = function (args) {
        var input = {}; // creating an input object to store the parsedarguments
        //looping through all arguments and extracting the key-value pairs.
        for (var i = 2; i < args.length; i += 2) {
            var key = args[i];
            var value = args[i + 1];
            //Validating user input: value should not be mising or look like other flags it need to start with "-".
            if (!value || value.startsWith("-")) {
                //if input validation fails we need to throw an error.
                throw new Error("Missing Value for Argument: ".concat(key));
            }
            //mapping of CLI flags to input object fields using switch.
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
        //Explicitly checking whether user entered all required fields or not.
        if (!input.name || !input.price || !input.quantity || !input.type) {
            throw new Error("Missing Some Arguments");
        }
        //now we are returning the input object as parsedInput type.
        return input;
    };
    return InputParser;
}());
exports.InputParser = InputParser;
