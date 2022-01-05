import { FastifyInstance } from 'fastify'
import { productController } from '../../../controller'

export async function productRouter(fastify: FastifyInstance) {
  fastify.register(productController)
}
