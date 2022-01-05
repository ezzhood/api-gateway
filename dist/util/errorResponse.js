"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const constant_1 = require("../constant");
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super();
        this.statusCode = 500;
        this.statusCode = statusCode;
        this.message = message;
    }
    static getErrorByStatusCode(statusCode) {
        const exists = Object.keys(constant_1.ErrorCodes).includes(statusCode.toString());
        if (exists) {
            return constant_1.ErrorCodes[statusCode.toString()];
        }
        else {
            return 'Default Error';
        }
    }
}
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=errorResponse.js.map