"use strict";
//import all items
//This taxFactory.ts is a main factory class for creating instances of required type based on user input
//This ensures SRP and OCP
//SRP-Single responsibility principle
//OCP-open closed principle
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxFactory = void 0;
var importedItem_1 = require("../src/models/importedItem");
var manufacturedItem_1 = require("../src/models/manufacturedItem");
var rawItem_1 = require("../src/models/rawItem");
//Factory class to abstract object creation logic based on input type.
var TaxFactory = /** @class */ (function () {
    function TaxFactory() {
    }
    TaxFactory.prototype.createItem = function (name, price, quantity, type) {
        //case-sensitive type handling using string function.
        var lowerType = type.toLocaleLowerCase();
        //Dynamically creating the item based on user input.
        if (lowerType == "raw") {
            return new rawItem_1.rawItem(name, price, quantity, type);
        }
        else if (lowerType == "manufactured") {
            return new manufacturedItem_1.manufacturedItem(name, price, quantity, type);
        }
        else if (lowerType == "imported") {
            return new importedItem_1.importedItem(name, price, quantity, type);
        }
        else {
            //if the item is not the one listed above then an error is returned with an appropriate message.
            throw new Error("Invalid item type: " + type);
        }
    };
    return TaxFactory;
}());
exports.TaxFactory = TaxFactory;
