"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
//Factory Class responsible for creatig student object
var UserFactory = /** @class */ (function () {
    function UserFactory() {
    }
    UserFactory.prototype.createUser = function (fullName, age, address, rollNumber, courses) {
        return {
            fullName: fullName.trim(),
            age: age,
            address: address.trim(),
            rollNumber: rollNumber,
            courses: courses,
        };
    };
    return UserFactory;
}());
exports.UserFactory = UserFactory;
