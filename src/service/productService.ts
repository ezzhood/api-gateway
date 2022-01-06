import { ConsumeMessage } from 'amqplib'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ErrorResponse, MessageBroker } from '../util'

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
