import { FastifyInstance } from 'fastify'
import { productService } from '../service'
// import { CareerGetAndDeleteByIdSchema } from '../../schemas'

export async function productController(fastify: FastifyInstance) {
  // GET /api/v1/products
  fastify.get('/', productService.getAllProducts)

  // // GET /api/v1/products/:productId
  // fastify.get('/:productId', {
  //   schema: CareerGetAndDeleteByIdSchema,
  //   handler: careerService.getCareerById
  // })
}
