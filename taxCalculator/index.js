"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tax_calculator_factory_1 = require("./utils/tax_calculator_factory");
var item_biller_1 = require("./utils/item_biller");
var logger_1 = require("./utils/logger");
var input_manager_1 = require("./utils/input_manager");
// Initialize factory and manager instances.
var itemBiller = new item_biller_1.ItemBiller();
var taxFactory = new tax_calculator_factory_1.TaxFactory();
//Recursive function to accept item input, create item via factory, and add to manager.
//Uses async/await to ensure sequential prompts.
function takeItemInput() {
    return __awaiter(this, void 0, void 0, function () {
        var name_1, price, quantity, type, item, err_1, moreInput;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, input_manager_1.validateName)()];
                case 1:
                    name_1 = _a.sent();
                    return [4 /*yield*/, (0, input_manager_1.validatePrice)()];
                case 2:
                    price = _a.sent();
                    return [4 /*yield*/, (0, input_manager_1.validateQuantity)()];
                case 3:
                    quantity = _a.sent();
                    return [4 /*yield*/, (0, input_manager_1.validateType)()];
                case 4:
                    type = _a.sent();
                    item = taxFactory.createItem(name_1, price, quantity, type);
                    itemBiller.addItem(item);
                    return [3 /*break*/, 6];
                case 5:
                    err_1 = _a.sent();
                    logger_1.Logger.error("".concat(err_1.message));
                    return [3 /*break*/, 6];
                case 6: return [4 /*yield*/, (0, input_manager_1.confirm)()];
                case 7:
                    moreInput = _a.sent();
                    if (moreInput) {
                        takeItemInput(); // Continue Loop.
                    }
                    else {
                        itemBiller.printItems(); //add Items.
                        (0, input_manager_1.closeRl)(); //close Input loop
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// Start input loop
takeItemInput();
