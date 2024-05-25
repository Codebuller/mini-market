import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';


@Injectable()
export class RedisService implements OnModuleInit {
    redisClient:RedisClientType|undefined
    async onModuleInit() {
        this.redisClient = await createClient({
            url: 'redis://0.0.0.0:6378'
        })
        .on('error', err => console.log('Redis Client Error', err))
        .connect() as RedisClientType;
    }
    async putProduct(key:any, value:any){
        await this.redisClient.set('product:'+key.toString(), JSON.stringify(value));
        this.redisClient.expire('product:'+key.toString(), 60*60*24*7);
    }
    async deleteBucket(id:string){
        return await this.redisClient.del('bucket:'+id.toString());
    }
    async getProduct(key:any){
        return await this.redisClient.get('product:'+key.toString());
    }

    async getBucketById(id:any){
        return await this.redisClient.get('bucket:'+id.toString());
    }
    async putInBucketById(id:any, product:any){
        const dataInRedis = await this.getBucketById(id);
        if(dataInRedis){
            const newData = JSON.parse(dataInRedis);
            newData.push(product);
            this.redisClient.set('bucket:'+id, JSON.stringify(newData));
            return newData;
        }
        else{
            this.redisClient.set('bucket:'+id, JSON.stringify([product]));
            return [product];
        }
    }
}
