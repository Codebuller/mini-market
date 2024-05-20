import { FastifyPluginAsync, FastifyRequest } from "fastify"
// import { createClient } from 'redis'; rediska
import { ProductCreationAttrs } from "../../implementations/mariadb/interfaces";
import { MariaDB } from "../../implementations/mariadb";
import { Redis } from "../../implementations/redis";
const product: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
  fastify.post('/',{
    schema:{
      body:{

        type: 'object',
        required: ['name', 'description','price' ],
        additionalProperties: false,
        properties: {
          name:{type:'string'},
          price:{type:'number'},
          description:{type:'string',},
          provider_id:{type:'number'},
        }
      }
    }
  }, 
    async function (request:FastifyRequest<{Body:ProductCreationAttrs}>, reply) {
      const client = await new MariaDB();
      await client.initPromise;
      return client.putProduct(request.body);
  })

  fastify.get('/',
    async function (request:FastifyRequest, reply) {
      const client = await new MariaDB();
      await client.initPromise;
      return client.getAllProduct();
  })

  fastify.get('/:id',
  async function (request:FastifyRequest<{Params:{id:number}}>, reply) {
    const redis = new Redis();
    const dataInRedis = await redis.getProduct(request.params.id);
    if(dataInRedis){
      return JSON.parse(dataInRedis);
    }
    else{
    const client = await new MariaDB();
    await client.initPromise;
    const data = await client.getProductById(request.params.id);
    redis.putProduct(request.params.id, data)
    return data;
    }
  })

}

export default product;
