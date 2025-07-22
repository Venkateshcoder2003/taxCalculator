"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.manufacturedItem = void 0;
var manufacturedItem = /** @class */ (function () {
    function manufacturedItem(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    manufacturedItem.prototype.calculateTax = function () {
        var basic = this.price * 0.125;
        return basic + 0.02 * (this.price + basic);
    };
    manufacturedItem.prototype.getFinalPrice = function () {
        return this.price + this.calculateTax();
    };
    return manufacturedItem;
}());
exports.manufacturedItem = manufacturedItem;
