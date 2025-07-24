"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
var logger_1 = require("../utils/logger");
var UserManager = /** @class */ (function () {
    function UserManager() {
    }
    UserManager.getInstance = function () {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    };
    UserManager.prototype.setUsers = function (users) {
        this.users = users;
        this.sortUsers();
    };
    UserManager.prototype.getUsers = function () {
        return this.users;
    };
    UserManager.prototype.addUser = function (user) {
        var exists = false;
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var u = _a[_i];
            if (u.rollNumber === user.rollNumber) {
                exists = true;
                break;
            }
        }
        if (exists)
            logger_1.Logger.error("Roll number already exists.");
        this.users.push(user);
        this.sortUsers();
    };
    UserManager.prototype.deleteUser = function (rollNumber) {
        for (var i = 0; i < this.users.length; i++) {
            if (this.users[i].rollNumber === rollNumber) {
                //splice takes (startIndex, numberOfItemsToBeDeletedFromThatIndex)
                this.users.splice(i, 1); // Remove 1 item at index i
                return true;
            }
        }
        return false;
    };
    UserManager.prototype.sortUsers = function () {
    };
    return UserManager;
}());
exports.UserManager = UserManager;
