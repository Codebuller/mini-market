import { Injectable } from '@nestjs/common';
import { BucketService } from 'src/bucket/bucket.service';
import { Product } from 'src/interfaces';
import { MariaService } from 'src/maria/maria.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class OrderService {

    constructor(private mariaService:MariaService, private bucketService:BucketService){}

    async getOrders(id:string){
        const response = await this.mariaService.mariaClient.query('SELECT * FROM `Order` WHERE user_id='+id);
        return response[0];
    }

    async createOrder(id:string){ 
        const products = await this.bucketService.getProductsInBucket(id) ;
        let totalPrice = 0;
        let products_field = [];
        products.forEach((el)=>{
            const product:Product = JSON.parse(el);
            totalPrice += product.price;
            products_field.push(product);
        })
        const response = await this.mariaService.mariaClient.query(
            `INSERT INTO \`Order\` (id, user_id, products, total_price) VALUES (?, ?, ?, ?)`, 
            [uuidv4(),id, JSON.stringify(products_field), totalPrice]
        )
        return response;
    }
}
