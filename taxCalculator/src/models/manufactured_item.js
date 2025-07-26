"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturedItem = void 0;
// Class representing a Manufactured Item.
// Implements the Item interface and provides tax calculation specific to manufactured Item.
var manufacturedItem = /** @class */ (function () {
    //constructor that initializes the name, price, quantity and type of the manufacturedItem.
    function manufacturedItem(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    // Calculating the tax for manufacturedItem: 12.5% basic + 2% of (price + basic)
    manufacturedItem.prototype.calculateTax = function () {
        var basic = this.price * 0.125;
        return basic + 0.02 * (this.price + basic);
    };
    // Final price = base price + total tax
    manufacturedItem.prototype.getFinalPrice = function () {
        return this.price + this.calculateTax();
    };
    return manufacturedItem;
}());
exports.manufacturedItem = manufacturedItem;
