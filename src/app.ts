import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}
// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  const fastifyEnv = require('fastify-env')
  void fastify.register(require('@fastify/swagger'), {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Redis for market',
        description: 'Testing the Fastify swagger API',
        version: '1.1.0'
      }
    }
  })
  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    staticCSP: true,
    transformSpecificationClone: true
  })
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts
  })
  fastify.register(fastifyEnv, {
    confKey: 'config',
    dotenv: true,
    data: process.env
  })
  await fastify.after()
  //https://github.com/fastify/fastify-env!!
  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
  })

  
  

}
  

export default app;
export { app, options }
