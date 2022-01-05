import { FastifyInstance } from 'fastify'
import { v1Router } from './v1'

export async function apisRouter(fastify: FastifyInstance) {
  fastify.register(v1Router, { prefix: '/v1' })
}
