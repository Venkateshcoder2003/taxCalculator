"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rl = void 0;
exports.takeName = takeName;
exports.takePrice = takePrice;
exports.takeQuantity = takeQuantity;
exports.takeType = takeType;
exports.confirm = confirm;
var Logger_1 = require("./Logger");
var readline = require("readline");
// Readline interface for terminal input/output
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//Prompts user for item name.
function takeName() {
    return new Promise(function (res) {
        exports.rl.question("Enter Name: ", function (name) {
            res(name);
        });
    });
}
//Prompts user for item Price.
function takePrice() {
    return new Promise(function (res) {
        exports.rl.question("Enter Price: ", function (userInput) {
            var price = parseFloat(userInput);
            if (price < 0) {
                Logger_1.Logger.error("Price can't be Negative");
                res(takePrice());
            }
            else {
                res(price);
            }
        });
    });
}
//Prompts user for item Quantity.
function takeQuantity() {
    return new Promise(function (res) {
        exports.rl.question("Enter quantity: ", function (userInput) {
            var quantity = parseInt(userInput);
            if (quantity < 1) {
                Logger_1.Logger.info("Invalid quantity. Please enter a positive integer.");
                res(takeQuantity());
            }
            else {
                res(quantity);
            }
        });
    });
}
//Prompts user for item Type.
function takeType() {
    return new Promise(function (res) {
        exports.rl.question("Enter type (1 for RAW, 2 for MANUFACTURED, 3 for IMPORTED): ", function (typeStr) {
            switch (typeStr.trim()) {
                case "1":
                    res("raw");
                    break;
                case "2":
                    res("manufactured");
                    break;
                case "3":
                    res("imported");
                    break;
                default:
                    Logger_1.Logger.info("Invalid type. Please enter 1, 2, or 3.");
                    res(takeType());
            }
        });
    });
}
//Asks user if they want to continue adding items.
function confirm() {
    return new Promise(function (res) {
        exports.rl.question("Do you want to enter another item? (y/n): ", function (again) {
            res(again.trim().toLowerCase() === "y");
        });
    });
}
