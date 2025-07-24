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
exports.showMenu = showMenu;
var user_manager_1 = require("../services/user_manager");
var input_manager_1 = require("../utils/input_manager");
var user_factory_1 = require("./user_factory");
var choises_1 = require("../models/choises");
var serializer_1 = require("../services/serializer");
var logger_1 = require("./logger");
var userFactory = new user_factory_1.UserFactory();
var serializer = new serializer_1.Serializer();
function showMenu() {
    return __awaiter(this, void 0, void 0, function () {
        var manager, choice, _a, fullName, age, address, rollNumber, courses, user, err_1, rollNumber, save;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    manager = user_manager_1.UserManager.getInstance();
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 19];
                    logger_1.Logger.info("\n----- MENU -----");
                    logger_1.Logger.info("1. Add User");
                    logger_1.Logger.info("2. Display Users");
                    logger_1.Logger.info("3. Delete User");
                    logger_1.Logger.info("4. Save Users");
                    logger_1.Logger.info("5. Exit");
                    return [4 /*yield*/, (0, input_manager_1.validateChoice)()];
                case 2:
                    choice = _b.sent();
                    _a = choice;
                    switch (_a) {
                        case choises_1.choises.ADD: return [3 /*break*/, 3];
                        case choises_1.choises.DISPLAY: return [3 /*break*/, 11];
                        case choises_1.choises.DELETE: return [3 /*break*/, 12];
                        case choises_1.choises.UPDATE: return [3 /*break*/, 14];
                        case choises_1.choises.EXIT: return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 17];
                case 3:
                    _b.trys.push([3, 9, , 10]);
                    return [4 /*yield*/, (0, input_manager_1.validateName)()];
                case 4:
                    fullName = _b.sent();
                    return [4 /*yield*/, (0, input_manager_1.validateAge)()];
                case 5:
                    age = _b.sent();
                    return [4 /*yield*/, (0, input_manager_1.validateAddress)()];
                case 6:
                    address = _b.sent();
                    return [4 /*yield*/, (0, input_manager_1.validateRollNumber)()];
                case 7:
                    rollNumber = _b.sent();
                    return [4 /*yield*/, (0, input_manager_1.validateCourses)()];
                case 8:
                    courses = _b.sent();
                    user = userFactory.createUser(fullName, age, address, rollNumber, courses);
                    manager.addUser(user);
                    logger_1.Logger.info("User Added Successfully");
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _b.sent();
                    logger_1.Logger.error("".concat(err_1.message));
                    return [3 /*break*/, 10];
                case 10: return [3 /*break*/, 18];
                case 11:
                    {
                        return [3 /*break*/, 18];
                    }
                    _b.label = 12;
                case 12: return [4 /*yield*/, (0, input_manager_1.validateRollNumber)()];
                case 13:
                    rollNumber = _b.sent();
                    logger_1.Logger.info("User data with roll RollNumber ".concat(rollNumber, " deleted Successfully"));
                    manager.deleteUser(rollNumber);
                    return [3 /*break*/, 18];
                case 14:
                    {
                        serializer.saveDataToDisk(manager.getUsers());
                        logger_1.Logger.info("User data Update in Student Registry");
                        return [3 /*break*/, 18];
                    }
                    _b.label = 15;
                case 15: return [4 /*yield*/, (0, input_manager_1.saveDataBeforeExit)()];
                case 16:
                    save = _b.sent();
                    if (save === "y") {
                        serializer.saveDataToDisk(manager.getUsers());
                        logger_1.Logger.info(" User Data saved.");
                    }
                    (0, input_manager_1.closeRl)();
                    return [2 /*return*/];
                case 17:
                    logger_1.Logger.info("Invalid choice. Please try again.");
                    _b.label = 18;
                case 18: return [3 /*break*/, 1];
                case 19: return [2 /*return*/];
            }
        });
    });
}
