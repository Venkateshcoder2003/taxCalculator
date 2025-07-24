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
exports.validateChoice = validateChoice;
exports.saveDataBeforeExit = saveDataBeforeExit;
exports.validateName = validateName;
exports.validateAge = validateAge;
exports.validateAddress = validateAddress;
exports.validateRollNumber = validateRollNumber;
exports.validateCourses = validateCourses;
exports.closeRl = closeRl;
var readline = require("readline");
var course_1 = require("../models/course");
var logger_1 = require("./logger");
// Readline interface for terminal input/output
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
function validateChoice() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question("Enter your Choice(1-5): ", function (userInput) {
                        var choice = parseInt(userInput.trim());
                        if (choice >= 1 && choice <= 5) {
                            res(choice);
                        }
                        else {
                            logger_1.Logger.info("Invalid choice. Please enter a number between 1 and 5.");
                            // Recursively call and properly await the result
                            res(validateChoice());
                        }
                    });
                })];
        });
    });
}
function saveDataBeforeExit() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question("Do You Want To Save Data Before Exit: ", function (userInput) {
                        var choice = userInput.trim().toLowerCase();
                        res(choice);
                    });
                })];
        });
    });
}
function validateName() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question("Enter Name: ", function (name) {
                        res(name);
                    });
                })];
        });
    });
}
function validateAge() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question(("Enter Age: "), function (userInput) {
                        var age = parseInt(userInput);
                        if (age < 0) {
                            res(validateAge());
                        }
                        else {
                            res(age);
                        }
                    });
                })];
        });
    });
}
function validateAddress() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question("Enter Address: ", function (userInput) {
                        if (typeof userInput === 'string') {
                            res(userInput);
                        }
                        else {
                            res(validateAddress());
                        }
                    });
                })];
        });
    });
}
function validateRollNumber() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question("Enter Your Roll Number: ", function (userInput) {
                        var rollNumber = parseInt(userInput);
                        if (rollNumber < 0) {
                            res(validateRollNumber());
                        }
                        else {
                            res(rollNumber);
                        }
                    });
                })];
        });
    });
}
// export async function validateCourses():Promise<Course>{
//     return new Promise((res)=>{
//         rl.question("Enter your courses A-F(comma Separated): ", (userInput)=>{
//             const validCourses = Object.keys(Course);
//             if(userInput.length == 4){
//                 for(let course of userInput){
//                     if(!validCourses.includes(course)){
//                         console.log(`The course ${course} is Not Valid Please chooose between A-F`);
//                         res(validateCourses());
//                     }
//                 }
//                 res(userInput as Course);
//             }else{
//                 res(validateCourses());
//             }
//         })
//     })
// }
function validateCourses() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (res) {
                    rl.question("Enter your Courses A-F:(Comma Separated)", function (userInput) {
                        var inputCourses = [];
                        var parts = userInput.split(",");
                        for (var i = 0; i < parts.length; i++) {
                            var toUpper = parts[i].trim().toUpperCase();
                            if (toUpper) {
                                inputCourses.push(toUpper);
                            }
                        }
                        if (inputCourses.length !== 4) {
                            logger_1.Logger.info("Error: You must enter exactly 4 courses. You entered ".concat(inputCourses.length, "."));
                            res(validateCourses());
                        }
                        var validCourses = Object.keys(course_1.default);
                        var allValid = true;
                        for (var i = 0; i < inputCourses.length; i++) {
                            var isValid = false;
                            for (var j = 0; j < validCourses.length; j++) {
                                if (inputCourses[i] === validCourses[j]) {
                                    isValid = true;
                                    break;
                                }
                            }
                            if (isValid == false) {
                                logger_1.Logger.info("The course '".concat(inputCourses[i], "' is not valid. Please choose between A-F"));
                                allValid = false;
                                break;
                            }
                        }
                        //not be duplicated
                        if (allValid) {
                            for (var i = 0; i < inputCourses.length; i++) {
                                for (var j = i + 1; j < inputCourses.length; j++) {
                                    if (inputCourses[i] === inputCourses[j]) {
                                        logger_1.Logger.info("Duplicate course found: '".concat(inputCourses[i], "'. Please enter unique courses."));
                                        allValid = false;
                                        break;
                                    }
                                }
                                if (!allValid)
                                    break;
                            }
                        }
                        if (allValid) {
                            var courseEnum = [];
                            for (var i = 0; i < inputCourses.length; i++) {
                                courseEnum.push(inputCourses[i]);
                            }
                            res(courseEnum);
                        }
                        else {
                            logger_1.Logger.info("Please Try Again");
                            res(validateCourses());
                        }
                    });
                })];
        });
    });
}
function closeRl() {
    rl.close();
}
