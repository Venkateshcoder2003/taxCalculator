"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
var logger_1 = require("../utils/logger"); //import Logger
var UserManager = /** @class */ (function () {
    //Private constructor to ensure that no one creates object
    function UserManager() {
    }
    //Singleton method to share single instance across entire application
    UserManager.getInstance = function () {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    };
    //Set users array while loading from disk
    UserManager.prototype.setUsers = function (users) {
        this.users = users;
        if (this.users.length > 1) {
            this.sortUsersBy();
        }
    };
    //Get list of all students
    UserManager.prototype.getUsers = function () {
        return this.users;
    };
    //Add new student to the list
    UserManager.prototype.addUser = function (user) {
        var exists = false;
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var u = _a[_i];
            if (u.rollNumber === user.rollNumber) {
                exists = true;
                break;
            }
        }
        if (exists) {
            logger_1.Logger.error("Roll number already exists.");
            return true;
        }
        else {
            this.users.push(user);
            this.sortUsersBy();
        }
    };
    //Delete student record  from the list using Binary Search
    UserManager.prototype.deleteUser = function (rollNumber) {
        var left = 0;
        var right = this.users.length - 1;
        while (left <= right) {
            var mid = Math.floor((left + right) / 2);
            var midRollNumber = this.users[mid].rollNumber;
            if (midRollNumber === rollNumber) {
                this.users.splice(mid, 1); // Remove user at index mid
                return true;
            }
            else if (midRollNumber < rollNumber) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        return false;
    };
    //Sort students by given field (like name, age) and type (asc or desc)
    UserManager.prototype.sortUsersBy = function (field, type) {
        if (field === void 0) { field = "fullName"; }
        if (type === void 0) { type = "asc"; }
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
                    else if (a.address > b.address)
                        comparision = 1;
                    else
                        comparision = 0;
                    break;
                case "fullName":
                default:
                    if (a.fullName < b.fullName)
                        comparision = -1;
                    else if (a.fullName > b.fullName)
                        comparision = 1;
                    else {
                        comparision = a.rollNumber - b.rollNumber;
                    }
                    break;
            }
            return type === "desc" ? -comparision : comparision;
        });
    };
    //Print all student Details
    UserManager.prototype.displayUsers = function () {
        if (this.users.length === 0) {
            logger_1.Logger.print("No Student Details to Display.");
            return;
        }
        logger_1.Logger.print("\n==============================================================");
        logger_1.Logger.print("RollNo | Name           | Age | Address        | Courses");
        logger_1.Logger.print("==============================================================");
        for (var _i = 0, _a = this.users; _i < _a.length; _i++) {
            var user = _a[_i];
            var roll = String(user.rollNumber).padEnd(6, " ");
            var name_1 = user.fullName.padEnd(14, " ");
            var age = String(user.age).padEnd(3, " ");
            var address = user.address.padEnd(14, " ");
            var courses = user.courses; // assuming it's an array
            logger_1.Logger.print("".concat(roll, " | ").concat(name_1, " | ").concat(age, " | ").concat(address, " | ").concat(courses));
        }
        logger_1.Logger.print("==============================================================");
    };
    return UserManager;
}());
exports.UserManager = UserManager;
