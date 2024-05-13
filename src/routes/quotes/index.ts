import { FastifyPluginAsync, FastifyRequest } from "fastify"
// import { createClient } from 'redis'; rediska
import { ProductCard } from "../../implementations/mariadb/interfaces";
import { MariaDB } from "../../implementations/mariadb";
const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
    // const client = await createClient() rediska
    //     .on('error', (err) => console.log('Redis Client Error', err))
    //     .connect();
    
  fastify.post('/', 
    async function (request:FastifyRequest<{Body:ProductCard}>, reply) {
      const client = await new MariaDB();
      await client.initPromise;
      return client.putItem(request.body);
  })

}

export default example;
