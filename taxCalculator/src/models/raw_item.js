"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawItem = void 0;
// Class representing a Raw Item.
// Implements the Item interface and provides tax calculation specific to raw Item.
var rawItem = /** @class */ (function () {
    //constructor that initializes the name, price, quantity and type of the rawItem.
    function rawItem(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    //a simple function to claculate the tax of the rawItem.
    //tax =12% of the base price
    rawItem.prototype.calculateTax = function () {
        return this.price * 0.12;
    };
    // Final price = base price + tax
    rawItem.prototype.getFinalPrice = function () {
        return this.price + this.calculateTax();
    };
    return rawItem;
}());
exports.rawItem = rawItem;
