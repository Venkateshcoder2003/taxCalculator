"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
//This is the file
var readline = require("readline");
var taxFactory_1 = require("./utils/taxFactory"); //Factory responsible for creating item objects.
var inputParser_1 = require("./utils/inputParser"); // Parses CLI arguments.
var itemManager_1 = require("./utils/itemManager"); // Manages list of items and prints final result
//creating the interface for reading the inputs from user
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// Creating instances of required classes
var manager = new itemManager_1.ItemManager(); //Holds and manages created items.
var inputParser = new inputParser_1.InputParser(); //object that Handles command-line parsing.
var taxFactory = new taxFactory_1.TaxFactory(); // Factory object Responsible for item creation based on type.
// Recursive function to continuously take user input.
function takeUserInput() {
    //asking the user whether he enters the items or not.
    rl.question('\nDo you want to enter te details "y" for YES and "n" for NO(y/n): ', function (answer) {
        if (answer.toLocaleLowerCase() === "y") {
            // Prompt user to enter item details
            rl.question('Enter args like: -name "Soap" -price 20 -quantity 2 -type raw\n: ', function (userInput) {
                //storing all the arguments in an array.
                var argument = __spreadArray(["node", "app.ts"], userInput.trim().split(" "), true);
                try {
                    // Parsing  arguments into structured object.
                    var parsedArguments = inputParser.parseArguments(argument);
                    // Create appropriate item using factory based on type.
                    var item = taxFactory.createItem(parsedArguments.name, parsedArguments.price, parsedArguments.quantity, parsedArguments.type);
                    // Adding the item to manager list.
                    manager.addItem(item);
                    // Recursively asking the user  for next item.
                    takeUserInput();
                }
                catch (err) {
                    // Handling  any parsing or creation errors
                    console.log(err.message);
                    takeUserInput();
                }
            });
        }
        else {
            // if User chose to stop entering data, then  printing the  final list.
            manager.printItems();
            rl.close(); // Close the input interface
        }
    });
}
// Starting  input process
takeUserInput();
