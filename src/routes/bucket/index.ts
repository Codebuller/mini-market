import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Redis } from "../../implementations/redis";

const bucket: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  
    fastify.get('/with_products/:userId',
      async function (request:FastifyRequest<{Params:{userId:string}}>, reply) {
        try{
        const redis = new Redis();
        let bucket = await redis.getBucketById(request.params.userId);
        if(!bucket)
            return [];
        const parsedBucket  = JSON.parse(bucket) as string[];
        const redisPromises:Promise<null|string>[] = [];
        parsedBucket.forEach((value:any, index:number) => {
            redisPromises[index] = redis.getProduct(value)
        })
        const dataFromRedis = await Promise.all(redisPromises);
        const isNotExistInRedis = [];
        dataFromRedis.forEach((element, index)=>{
            if(!element){
                isNotExistInRedis.push(parsedBucket[index])
            }
        })

        }
        catch(er){

        }
    })
    fastify.delete('/:id',
    async function (request:FastifyRequest<{Params:{id:string}}>, reply) {
        const redis = new Redis();
        redis.deleteBucket(request.params.id)
    })
    fastify.get('/:userId',
      async function (request:FastifyRequest<{Params:{userId:string}}>, reply) {
        const redis = new Redis();
        return await redis.getBucketById(request.params.userId)
    })

    fastify.post('/:userId',{
        schema:{
            body:{
                type:'object'
            }
        }
    },
      async function (request:FastifyRequest<{Params:{userId:string}, Body:any}>, reply) {
        const redis = new Redis();
        return await redis.putInBucketById(request.params.userId, request.body);
    })

    
  
  }
  
  export default bucket;