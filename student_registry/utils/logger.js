"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// Logger class for standard logging throughout the application.
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.info = function (message) {
        console.log("[studentRegistry]".concat(message));
    };
    Logger.error = function (message) {
        console.log("[studentRegistry]".concat(message));
    };
    return Logger;
}());
exports.Logger = Logger;
