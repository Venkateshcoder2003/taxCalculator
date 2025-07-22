"use strict";
//import all items
//This taxFactory.ts is a main factory class for creating instances of required type based on user input
//in this way reducing tight-coupling
Object.defineProperty(exports, "__esModule", { value: true });
exports.taxFactory = void 0;
var importedItem_1 = require("../src/models/importedItem");
var manufacturedItem_1 = require("../src/models/manufacturedItem");
var rawItem_1 = require("../src/models/rawItem");
var taxFactory = /** @class */ (function () {
    function taxFactory() {
    }
    taxFactory.createItem = function (name, price, quantity, type) {
        var lowerType = type.toLocaleLowerCase();
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
            throw new Error("Invalid item type: " + type);
        }
    };
    return taxFactory;
}());
exports.taxFactory = taxFactory;
