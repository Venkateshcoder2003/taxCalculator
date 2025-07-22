"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemManager = void 0;
//Itemmanager responsible for storing and printing the items entered by the user.
var ItemManager = /** @class */ (function () {
    function ItemManager() {
        //array to hold multiple Item instances.
        this.items = [];
    }
    ItemManager.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ItemManager.prototype.printItems = function () {
        console.log("\n🧾 Final Bill Summary:\n");
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            //calculating the tax and final price for each item.
            var tax = item.calculateTax();
            var finalPrice = item.getFinalPrice();
            console.log("Item: ".concat(item.name));
            console.log("Type: ".concat(item.type));
            //.toFixed() method is used to format the number to a fixed numberof decimal places.
            console.log("Price: ".concat(item.price.toFixed(2)));
            console.log("Sales Tax: ".concat(tax.toFixed(2)));
            console.log("Final Price: ".concat(finalPrice.toFixed(2), "\n"));
        }
    };
    return ItemManager;
}());
exports.ItemManager = ItemManager;
