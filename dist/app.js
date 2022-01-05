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
exports.fastify = void 0;
const dotenv = require("dotenv");
const fastify_1 = require("fastify");
const ajv_1 = require("ajv");
const plugin_1 = require("./plugin");
const util_1 = require("./util");
const router_1 = require("./router");
// load enviroment variables
dotenv.config();
// fastify application instance
exports.fastify = (0, fastify_1.default)({
    logger: true
});
// listen to port
const PORT = process.env.PORT || 5000;
/**
 * bootstraps server
 */
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.fastify.listen(PORT);
        }
        catch (err) {
            exports.fastify.log.error(err);
            process.exit(1);
        }
    });
}
// register errorHandler plugin
exports.fastify.register(plugin_1.errorHandlerPlugin);
// request /docs url to get api info
exports.fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        info: { title: 'fastify-api' }
    }
});
// schema validation configs
const ajv = new ajv_1.default({
    removeAdditional: 'all',
    useDefaults: true,
    allErrors: true
});
exports.fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
});
// register cors
exports.fastify.register(require('fastify-cors'));
// register router
exports.fastify.register(router_1.router);
// app.get('/api/v1/products', async (req, res, next) => {
//   console.log('Firing the request')
//   const correlationId = Math.random().toString()
//   const broker = await MessageBroker.getInstance()
//   await broker.send('get_products', Buffer.from('12'), {
//     correlationId,
//     replyTo: 'products_result'
//   })
//   await broker.consume('products_result', msg => {
//     if (msg!.properties.correlationId == correlationId) {
//       console.log('I got message bro ', msg!.content.toString())
//       res.status(200).json({
//         result: msg!.content.toString()
//       })
//     }
//   })
// })
// stop rabbitmq connection when server stops
process.on('beforeExit', () => __awaiter(void 0, void 0, void 0, function* () {
    const amqp = yield util_1.MessageBroker.getInstance();
    console.log('closing');
    yield amqp.close();
}));
// start server
startServer();
//# sourceMappingURL=app.js.map