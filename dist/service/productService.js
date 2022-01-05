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
exports.getAllProducts = void 0;
const util_1 = require("../util");
// import { Career, CareerAttributes, CareerCreationAttributes, CareerScopes } from '../models'
// import { SchemaTypes } from '../helpers'
// import { throwNotFoundError, ApiFilter } from '../utils'
const getAllProducts = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = request;
    const broker = yield util_1.MessageBroker.getInstance();
    const requestPayload = {
        query: query || {},
        body: request.body || {},
        params: request.params || {}
    };
    console.log(JSON.stringify(requestPayload));
    const correlationId = Math.random().toString();
    const result = yield broker.sendRpc('products:get-all', Buffer.from(JSON.stringify(requestPayload)), {
        correlationId,
        replyTo: 'products:get-result'
    });
    if (!result) {
        return new util_1.ErrorResponse('Service is not available', 503);
    }
    reply.status(200).send(JSON.parse(result.content.toString()));
});
exports.getAllProducts = getAllProducts;
// export const getCareerById = async (
//   request: FastifyRequest<{ Params: { careerId: SchemaTypes.Number } }>,
//   reply: FastifyReply
// ) => {
//   const { careerId } = request.params
//   const career: Career | null = await Career.scope(
//     CareerScopes.CataloguePopulated
//   ).findByPk(careerId)
//   if (!career) {
//     return throwNotFoundError(careerId, reply, 'career')
//   }
//   reply.status(200).send(career)
// }
// export const createCareer = async (
//   request: FastifyRequest<{ Body: CareerCreationAttributes }>,
//   reply: FastifyReply
// ) => {
//   const career: Career = await Career.create(request.body)
//   reply.status(201).send(career)
// }
// export const updateCareerById = async (
//   request: FastifyRequest<{
//     Params: { careerId: SchemaTypes.Number }
//     Body: CareerCreationAttributes
//   }>,
//   reply: FastifyReply
// ) => {
//   const { careerId } = request.params
//   const career: Career | null = await Career.findByPk(careerId)
//   if (!career) {
//     return throwNotFoundError(careerId, reply, 'career')
//   }
//   await career.update(request.body)
//   reply.status(204).send()
// }
// export const deleteCareerById = async (
//   request: FastifyRequest<{
//     Params: { careerId: SchemaTypes.Number }
//   }>,
//   reply: FastifyReply
// ) => {
//   const { careerId } = request.params
//   const career: Career | null = await Career.findByPk(careerId)
//   if (!career) {
//     return throwNotFoundError(careerId, reply, 'career')
//   }
//   await career.destroy()
//   reply.status(204).send()
// }
//# sourceMappingURL=productService.js.map