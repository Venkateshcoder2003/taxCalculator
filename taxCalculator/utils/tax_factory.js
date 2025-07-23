"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxFactory = exports.ItemType = void 0;
// Importing the class for handling imported items.
var imported_item_1 = require("../src/models/imported_item");
// Importing the class for handling manufactured items.
var manufactured_item_1 = require("../src/models/manufactured_item");
// Importing the class for handling raw items.
var raw_item_1 = require("../src/models/raw_item");
var Logger_1 = require("./Logger");
// Enum to restrict the type of items.
var ItemType;
(function (ItemType) {
    ItemType["Raw"] = "raw";
    ItemType["Manufactured"] = "manufactured";
    ItemType["Imported"] = "imported";
})(ItemType || (exports.ItemType = ItemType = {}));
//Factory class to abstract object creation logic based on input type.
var TaxFactory = /** @class */ (function () {
    function TaxFactory() {
    }
    TaxFactory.prototype.createItem = function (name, price, quantity, type) {
        //case-sensitive type handling using string function.
        var lowerType = type.toLocaleLowerCase();
        //Dynamically creating the item based on user input.
        switch (lowerType) {
            case ItemType.Raw:
                return new raw_item_1.rawItem(name, price, quantity, type);
            case ItemType.Manufactured:
                return new manufactured_item_1.manufacturedItem(name, price, quantity, type);
            case ItemType.Imported:
                return new imported_item_1.importedItem(name, price, quantity, type);
            default:
                Logger_1.Logger.error("Invalid item type: ".concat(type));
        }
    };
    return TaxFactory;
}());
exports.TaxFactory = TaxFactory;
