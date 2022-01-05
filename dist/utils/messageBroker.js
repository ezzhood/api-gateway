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
exports.MessageBroker = void 0;
// imports
const amqp = require("amqplib");
/**
 * Broker for async messaging
 * Singleton class
 */
class MessageBroker {
    /**
     * The Singleton classes' constructor should always be private to prevent
     * direct construction calls with the `new` operator
     */
    constructor() { }
    /**
     * Initialize connection to rabbitMQ
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield amqp.connect(process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672');
            this.channel = yield this.connection.createChannel();
            return this;
        });
    }
    /**
     * This method sends message to connected application listening on this queue
     * @param queue Queue to be sended with name
     * @param msg Message to be sended in buffer form
     */
    send(queue, msg, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                yield this.init();
            }
            yield this.channel.assertQueue(queue, { durable: true });
            if (options) {
                this.channel.sendToQueue(queue, msg, options);
            }
            else {
                this.channel.sendToQueue(queue, msg);
            }
        });
    }
    /**
     * This method consumes message from connected application sending on this queue
     * @param queue Queue to be consumed with name
     * @param onMessage Message handler function to be consumed from buffer form
     */
    consume(queue, onMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                yield this.init();
            }
            yield this.channel.assertQueue(queue, { durable: true });
            yield this.channel.consume(queue, onMessage, { noAck: true });
        });
    }
    /**
     * This method used to close rabbitmq connection when server turns down
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.connection) {
                yield this.init();
            }
            yield this.connection.close();
        });
    }
    /**
     * This method for getting message broker instance
     * @returns Singleton instance of Message Broker
     */
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!MessageBroker.instance) {
                const broker = new MessageBroker();
                MessageBroker.instance = yield broker.init();
            }
            return MessageBroker.instance;
        });
    }
}
exports.MessageBroker = MessageBroker;
//# sourceMappingURL=messageBroker.js.map