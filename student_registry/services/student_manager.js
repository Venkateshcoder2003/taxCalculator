"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
var logger_1 = require("../utils/logger"); // import Logger
var UserManager = /** @class */ (function () {
    // Private constructor to ensure that no one creates object.
    function UserManager() {
    }
    //Singleton methid to share single instance across entire application.
    UserManager.getInstance = function () {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    };
    // Set users array while loading from disk.
    UserManager.prototype.setUsers = function (users) {
        this.users = users;
        this.sortUsers();
    };
    // Get list of all students.
    UserManager.prototype.getUsers = function () {
        return this.users;
    };
    // Add new student to the list
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
    //Deleting a student by rollNumber.
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
    // Sort students alphabetically by fullName, then by rollNumber.
    UserManager.prototype.sortUsers = function () {
        this.users.sort(function (a, b) {
            if (a.fullName < b.fullName)
                return -1;
            if (a.fullName > b.fullName)
                return 1;
            return a.rollNumber - b.rollNumber;
        });
    };
    // Sort students by given field (like name, age) and type (asc or desc)
    UserManager.prototype.sortUsersBy = function (field, type) {
        this.users.sort(function (a, b) {
            var comparision = 0;
            switch (field) {
                case "rollNumber":
                    comparision = a.rollNumber - b.rollNumber;
                    break;
                case "age":
                    comparision = a.age - b.age;
                    break;
                case "address":
                    if (a.address < b.address)
                        comparision = -1;
                    if (a.address > b.address)
                        comparision = 1;
                    comparision = 0;
                    break;
                case "fullName":
                    if (a.fullName < b.fullName)
                        comparision = -1;
                    if (a.fullName > b.fullName)
                        comparision = 1;
                    comparision = 0;
                    break;
            }
            return type === "desc" ? -comparision : comparision;
        });
    };
    // Print all student Details.
    UserManager.prototype.displayUsers = function () {
        if (this.users.length == 0) {
            logger_1.Logger.info("No Student Details to Display.");
            return;
        }
        logger_1.Logger.info("\n============================================================");
        logger_1.Logger.info("RollNo | Name        | Age | Address     | Courses");
        logger_1.Logger.info("=============================================================");
        for (var i = 0; i < this.users.length; i++) {
            var user = this.users[i];
            logger_1.Logger.info("".concat(user.rollNumber, " | ").concat(user.fullName, " | ").concat(user.age, " | ").concat(user.address, " | ").concat(user.courses));
        }
        logger_1.Logger.info("=============================================================");
    };
    return UserManager;
}());
exports.UserManager = UserManager;
