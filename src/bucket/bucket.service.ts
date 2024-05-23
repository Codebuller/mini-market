import { Injectable, UseGuards } from '@nestjs/common';
import { Product } from 'src/interfaces';
import { MariaService } from 'src/maria/maria.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class BucketService {


    constructor(private redisService:RedisService, private mariaService: MariaService){}

    
    async getBucketById(id:string){
        return await this.redisService.redisClient.get('bucket:'+id);
    }
    async clearBucket(id:string){
        return await this.redisService.redisClient.del('bucket:'+id);
    }

    async postProductInBucket(id:string, products_ids:string[]){
        const bucket = await this.redisService.redisClient.get('bucket:'+id);
        if(bucket){
            let parsedBucket = JSON.parse(bucket) as string[];
            parsedBucket = parsedBucket.concat(products_ids);
            this.redisService.redisClient.set('bucket:'+id, JSON.stringify(parsedBucket));
            return parsedBucket;
        }
        else{
            this.redisService.redisClient.set('bucket:'+id, JSON.stringify(products_ids));
            return products_ids;
        }
    }
    async clearProductFromBucket(userId:string, index:string){
        const bucket = await this.redisService.redisClient.get('bucket:'+userId);
        if(bucket){
            let parsedBucket = JSON.parse(bucket) as string[];
            parsedBucket = parsedBucket.filter((id, ind)=>ind.toString()!==index);
            this.redisService.redisClient.set('bucket:'+userId, JSON.stringify(parsedBucket));
            return parsedBucket;
        }

    }
    async getProductsInBucket(id:string):Promise<string[]>{
        const bucket = await this.redisService.redisClient.get('bucket:'+id);

        if(bucket){
            
            const parsedBucket = JSON.parse(bucket) as string[];
            
            let promises:any[] = parsedBucket.map(
                id=>this.redisService.redisClient.get('product:'+id)
            );
           
            promises = await Promise.all(promises);
            const misedId = {};
            promises.forEach((element, index) => {
                if(!element){
                    misedId[parsedBucket[index]] = true;
                }
            })
            if(Object.keys(misedId).length === 0)
                return promises;
            let interval = '';
            Object.keys(misedId).forEach(key=>{
                interval+=("'"+key+"'"+","+" ");
            })
            interval = interval.slice(0, -2);
            const response = await this.mariaService.mariaClient.query(`SELECT * FROM Product WHERE id IN (${interval})`);
            (response[0] as Array<any>).forEach(element => {
                this.redisService.redisClient.set('product:'+element.id.toString(), JSON.stringify(element));
            })
            
            promises.forEach((element, index) => {
                if(!element){
                    promises[index] = JSON.stringify((response[0] as Array<any>).filter((value) => value.id.toString()===parsedBucket[index])[0]);
                }
            })
            return promises;
        }
        else return [];
    }
}
