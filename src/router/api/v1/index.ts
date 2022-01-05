import { FastifyInstance } from 'fastify'
import { productRouter } from './productRouter'

export async function v1Router(fastify: FastifyInstance) {
  fastify.register(productRouter, { prefix: '/products' })
}
