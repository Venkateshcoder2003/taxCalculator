"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateName = validateName;
exports.validatePrice = validatePrice;
exports.validateQuantity = validateQuantity;
exports.validateType = validateType;
exports.confirm = confirm;
exports.closeRl = closeRl;
var logger_1 = require("./logger");
var readline = require("readline");
// Readline interface for terminal input/output
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//Prompts user for item name.
function validateName() {
    return new Promise(function (res) {
        rl.question("Enter Name: ", function (name) {
            res(name);
        });
    });
}
//Prompts user for item Price.
function validatePrice() {
    return new Promise(function (res) {
        rl.question("Enter Price: ", function (userInput) {
            console.log(userInput);
            var price = parseFloat(userInput);
            if (price < 0) {
                logger_1.Logger.error("Price can't be less than 0.");
                res(validatePrice());
            }
            else {
                res(price);
            }
        });
    });
}
//Prompts user for item Quantity.
function validateQuantity() {
    return new Promise(function (res) {
        rl.question("Enter Quantity: ", function (userInput) {
            var quantity = parseInt(userInput);
            console.log(userInput);
            if (quantity < 1) {
                logger_1.Logger.info("Quantity must be greater than 1. Please provide a valid number.");
                res(validateQuantity());
            }
            else {
                res(quantity);
            }
        });
    });
}
//Prompts user for item Type.
function validateType() {
    return new Promise(function (res) {
        rl.question("Enter type (1 for RAW, 2 for MANUFACTURED, 3 for IMPORTED): ", function (typeStr) {
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
                    logger_1.Logger.info("Invalid type. Please enter 1(Raw), 2(Manufactured), or 3(Imported).");
                    res(validateType());
            }
        });
    });
}
//Asks user if they want to continue adding items.
function confirm() {
    return new Promise(function (res) {
        rl.question("Do you want to enter another item? (y/n): ", function (again) {
            res(again.trim().toLowerCase() === "y");
        });
    });
}
function closeRl() {
    rl.close();
}
