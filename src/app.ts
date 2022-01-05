import * as dotenv from 'dotenv'
import Fastify from 'fastify'
import Ajv from 'ajv'
import { errorHandlerPlugin } from './plugin'
import { MessageBroker } from './util'
import { router } from './router'

// load enviroment variables
dotenv.config()
// fastify application instance
export const fastify = Fastify({
  logger: true
})

// listen to port
const PORT = process.env.PORT || 5000

/**
 * bootstraps server
 */
async function startServer() {
  try {
    await fastify.listen(PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
// register errorHandler plugin
fastify.register(errorHandlerPlugin)
// request /docs url to get api info
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' }
  }
})
// schema validation configs
const ajv = new Ajv({
  removeAdditional: 'all',
  useDefaults: true,
  allErrors: true
})
fastify.setValidatorCompiler(({ schema }): any => {
  return ajv.compile(schema)
})

// register cors
fastify.register(require('fastify-cors'))
// register router
fastify.register(router)

// app.get('/api/v1/products', async (req, res, next) => {
//   console.log('Firing the request')
//   const correlationId = Math.random().toString()

//   const broker = await MessageBroker.getInstance()
//   await broker.send('get_products', Buffer.from('12'), {
//     correlationId,
//     replyTo: 'products_result'
//   })

//   await broker.consume('products_result', msg => {
//     if (msg!.properties.correlationId == correlationId) {
//       console.log('I got message bro ', msg!.content.toString())
//       res.status(200).json({
//         result: msg!.content.toString()
//       })
//     }
//   })
// })

// stop rabbitmq connection when server stops
process.on('beforeExit', async () => {
  const amqp = await MessageBroker.getInstance()
  console.log('closing')
  await amqp.close()
})

// start server
startServer()
