import { FastifyInstance } from 'fastify'
import { productService } from '../service'

export async function productController(fastify: FastifyInstance) {
  // GET /api/v1/products
  fastify.get('/', productService.getAllProducts)
}
