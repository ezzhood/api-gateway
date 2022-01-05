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
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = require("fastify-plugin");
const util_1 = require("../util");
const errorHandlerPlugin = (fastify, options) => __awaiter(void 0, void 0, void 0, function* () {
    const errorHandler = (error, request, reply) => {
        reply.statusCode = error.statusCode || 500;
        reply.send({
            error: util_1.ErrorResponse.getErrorByStatusCode(reply.statusCode),
            message: error.message
        });
    };
    fastify.setErrorHandler(errorHandler);
});
exports.default = (0, fastify_plugin_1.default)(errorHandlerPlugin);
//# sourceMappingURL=errorHandlerPlugin.js.map