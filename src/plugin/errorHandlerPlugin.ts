import { FastifyReply, FastifyRequest, FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import { ErrorResponse } from '../util'

const errorHandlerPlugin: FastifyPluginAsync = async (fastify, options) => {
  const errorHandler = (
    error: ErrorResponse,
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    reply.statusCode = error.statusCode || 500

    reply.send({
      error: ErrorResponse.getErrorByStatusCode(reply.statusCode),
      message: error.message
    })
  }

  fastify.setErrorHandler(errorHandler)
}

export default fp(errorHandlerPlugin)
