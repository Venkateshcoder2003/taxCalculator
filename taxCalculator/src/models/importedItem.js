"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importedItem = void 0;
var importedItem = /** @class */ (function () {
    function importedItem(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    importedItem.prototype.calculateTax = function () {
        var importDutyCost = 0.1 * this.price;
        var finalCost = importDutyCost + this.price;
        var surCharge = 0;
        if (finalCost <= 100)
            surCharge = 5;
        else if (finalCost <= 200)
            surCharge = 10;
        else
            surCharge = finalCost * 0.05;
        return importDutyCost + surCharge;
    };
    importedItem.prototype.getFinalPrice = function () {
        return this.price + this.calculateTax();
    };
    return importedItem;
}());
exports.importedItem = importedItem;
