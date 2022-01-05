import { FastifyInstance } from 'fastify'
import { apisRouter } from './api'

export async function router(fastify: FastifyInstance) {
  fastify.register(apisRouter, { prefix: '/api' })
}
