"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemManager = void 0;
var Logger_1 = require("./Logger");
// Manager class to handle storing and displaying items.
var ItemManager = /** @class */ (function () {
    function ItemManager() {
        //array to hold multiple Item instances.
        this.items = [];
    }
    ItemManager.prototype.addItem = function (item) {
        this.items.push(item);
    };
    // Prints details of all added items with tax calculation
    ItemManager.prototype.printItems = function () {
        console.log("\n🧾 Final Bill Summary:\n");
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            //calculating the tax and final price for each item.
            var tax = item.calculateTax();
            var finalPrice = item.getFinalPrice();
            Logger_1.Logger.info("Item: ".concat(item.name));
            Logger_1.Logger.info("Type: ".concat(item.type));
            //.toFixed() method is used to format the number to a fixed numberof decimal places.
            Logger_1.Logger.info("Price: ".concat(item.price.toFixed(2)));
            Logger_1.Logger.info("Sales Tax: ".concat(tax.toFixed(2)));
            Logger_1.Logger.info("Final Price: ".concat(finalPrice.toFixed(2), "\n"));
        }
    };
    return ItemManager;
}());
exports.ItemManager = ItemManager;
