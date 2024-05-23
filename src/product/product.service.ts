import { Injectable } from '@nestjs/common';
import { ProductCreationAttrs } from 'src/maria/interfaces';
import { MariaService } from 'src/maria/maria.service';
import { RedisService } from 'src/redis/redis.service';
import { ProductCreateDTO } from './dto/product-create.dto';

@Injectable()
export class ProductService {

    constructor(private mariaService:MariaService, 
        private redisService:RedisService) {}

    async getAllProduct(){
        return await this.mariaService.getAllProduct();
    }
    async deleteProductById(id:number){
        
        this.redisService.redisClient.del('product:'+id.toString());
        return await this.mariaService.deleteProductById(id);
    }


    async getProductById(id:number){
        const dataFromRedis = await this.redisService.getProduct(id);
        if(dataFromRedis){
            return dataFromRedis;
        }
        const dataRromMaria = await this.mariaService.getProductById(id);
        this.redisService.putProduct(id, dataRromMaria);
        return dataRromMaria;

    }

    async putProduct(productCreationAttrs:ProductCreateDTO){
        
        return await this.mariaService.putProduct(productCreationAttrs)
    }

}
