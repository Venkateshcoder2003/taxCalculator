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
//this is the place where we take input from user parse it and create the respective items
var readline = require("readline");
var taxFactory_1 = require("./utils/taxFactory"); //Factory that creates items
var inputParser_1 = require("./utils/inputParser");
var itemManager_1 = require("./utils/itemManager");
//creating the interface for reading the inputs from user
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var manager = new itemManager_1.ItemManager();
var inputParser = new inputParser_1.InputParser();
function takeUserInput() {
    rl.question("\nDo you want to enter te details(y/n): ", function (answer) {
        if (answer.toLocaleLowerCase() === "y") {
            rl.question("Enter args like: -name \"Soap\" -price 20 -quantity 2 -type raw\n: ", function (userInput) {
                var argument = __spreadArray(["node", "app.ts"], userInput.trim().split(" "), true);
                try {
                    var parsedArguments = inputParser.parseArguments(argument);
                    var item = taxFactory_1.taxFactory.createItem(parsedArguments.name, parsedArguments.price, parsedArguments.quantity, parsedArguments.type);
                    manager.addItem(item);
                    takeUserInput();
                }
                catch (err) {
                    console.log(err.message);
                    takeUserInput();
                }
            });
        }
        else {
            manager.printItems();
            rl.close();
        }
    });
}
takeUserInput();
