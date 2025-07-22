"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawItem = void 0;
var rawItem = /** @class */ (function () {
    function rawItem(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    rawItem.prototype.calculateTax = function () {
        return this.price * 0.12;
    };
    rawItem.prototype.getFinalPrice = function () {
        return this.price + this.calculateTax();
    };
    return rawItem;
}());
exports.rawItem = rawItem;
