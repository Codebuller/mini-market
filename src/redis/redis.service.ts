import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
var client:RedisClientType|undefined;

@Injectable()
export class RedisService implements OnModuleInit {
    async onModuleInit() {
        client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect() as RedisClientType;
    }
    async putProduct(key:any, value:any){
        return await client.set('product:'+JSON.stringify(key), JSON.stringify(value));
    }
    async deleteBucket(id:string){
        return await client.del('bucket:'+JSON.stringify(id));
    }
    async getProduct(key:any){
        return await client.get('product:'+JSON.stringify(key));
    }

    async getBucketById(id:any){
        return await client.get('bucket:'+id.toString());
    }
    async putInBucketById(id:any, product:any){
        const dataInRedis = await this.getBucketById(id);
        if(dataInRedis){
            const newData = JSON.parse(dataInRedis);
            newData.push(product);
            client.set('bucket:'+id, JSON.stringify(newData));
            return newData;
        }
        else{
            client.set('bucket:'+id, JSON.stringify([product]));
            return [product];
        }
    }
}
