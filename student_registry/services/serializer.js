"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
//Importing necessary modules
var fs = require("fs");
var FILEPATH = "./data/user_data.json";
var Serializer = /** @class */ (function () {
    function Serializer() {
    }
    //Saving the array of students to disk as JSON.
    Serializer.prototype.saveDataToDisk = function (users) {
        fs.writeFileSync(FILEPATH, JSON.stringify(users), "utf-8");
    };
    //Loading Student details from disk or file and parsing them into objects.
    Serializer.prototype.loadDataFromDisk = function () {
        var data = fs.readFileSync(FILEPATH, "utf-8");
        if (!data)
            return [];
        return JSON.parse(data);
    };
    return Serializer;
}());
exports.Serializer = Serializer;
