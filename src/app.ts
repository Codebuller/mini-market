import { join } from 'path';
import AutoLoad, {AutoloadPluginOptions} from '@fastify/autoload';
import { FastifyPluginAsync, FastifyServerOptions } from 'fastify';
export interface AppOptions extends FastifyServerOptions, Partial<AutoloadPluginOptions> {

}

const schema = {
  type: 'object',
  required: [ 'PORT' ],
  properties: {
    PORT: {
      type: 'string',
      default: 3000
    }
  }
}

const app: FastifyPluginAsync<AppOptions> = async (
    fastify,
    opts
): Promise<void> => {
  const fastifyEnv = require('@fastify/env')
  void fastify.register(require('@fastify/swagger'), {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Redis for market',
        description: 'Testing the Fastify swagger API',
        version: '1.1.0',

      }
      
    },

    
  })
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
    encapsulate:true, 
    prefix:'suka',

  })
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts
    
  })
  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/api/docs',
    staticCSP: true,
    transformSpecificationClone: true
  })
  
  fastify.register(fastifyEnv, {
    dotenv: {
      path:`${__dirname}/.env`,
    },
    schema:schema
  })
  

}
  

export default app;
export { app }
