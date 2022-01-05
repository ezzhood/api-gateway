import { ConsumeMessage } from 'amqplib'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ErrorResponse, MessageBroker } from '../util'
// import { Career, CareerAttributes, CareerCreationAttributes, CareerScopes } from '../models'
// import { SchemaTypes } from '../helpers'
// import { throwNotFoundError, ApiFilter } from '../utils'

export const getAllProducts = async (
  request: FastifyRequest<{ Querystring: string }>,
  reply: FastifyReply
) => {
  const { query } = request
  const broker = await MessageBroker.getInstance()
  const requestPayload = {
    query: query || {},
    body: request.body || {},
    params: request.params || {}
  }
  console.log(JSON.stringify(requestPayload))
  const correlationId = Math.random().toString()
  const result: ConsumeMessage | null = await broker.sendRpc(
    'products:get-all',
    Buffer.from(JSON.stringify(requestPayload)),
    {
      correlationId,
      replyTo: 'products:get-result'
    }
  )
  if (!result) {
    return new ErrorResponse('Service is not available', 503)
  }

  reply.status(200).send(JSON.parse(result.content.toString()))
}

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
