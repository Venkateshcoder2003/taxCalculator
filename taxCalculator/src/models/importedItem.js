"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importedItem = void 0;
// Class representing an Imported Item.
// Implements the Item interface and provides tax calculation specific to imported Item.
var importedItem = /** @class */ (function () {
    //constructor that initializes the name, price, quantity and type of the importedItem.
    function importedItem(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    //tax for this item is basically calculated as the sum of import duty and surcharge
    //importduty tax=10 % of item price
    //surcharge
    // Surcharge:
    //  Rs.5 if final cost <= 100
    //  Rs.10 if final cost <= 200
    //  5% of final cost if > 200
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
    // Final price = base price + total import tax
    importedItem.prototype.getFinalPrice = function () {
        return this.price + this.calculateTax();
    };
    return importedItem;
}());
exports.importedItem = importedItem;
