import { Injectable, OnModuleInit } from '@nestjs/common';
// const mariadb = require('mysql2');
import  * as mysql from 'mysql2/promise.js';
import { ProductCreationAttrs } from './interfaces';

@Injectable() 
export class MariaService implements OnModuleInit {
    mariaClient:mysql.Connection|undefined
    async onModuleInit(){
    //     console.log('this new  host: 0.0.0.0')
 	// console.log({
    //             password: process.env.MARIA_DB_PASSWORD, 
    //             user: process.env.MARIA_DB_USERNAME, 
    //             port: parseInt(process.env.MARIA_DB_PORT),
    //             connectionLimit: 1000, 
    //             database: process.env.MARIA_DB_DATABASE,
    //             host: '0.0.0.0'
    //         }
	// 	   );       
    //         this.mariaClient = await mysql.createConnection(
    //             {
                
                
    //             password: process.env.MARIA_DB_PASSWORD, 
    //             user: process.env.MARIA_DB_USERNAME, 
    //             port: parseInt(process.env.MARIA_DB_PORT),
    //             connectionLimit: 1000, 
    //             database: process.env.MARIA_DB_DATABASE,
    //             host: '0.0.0.0'
    //         }
            // )


        
    }
    async getAllProduct(){
        const response = await this.mariaClient.query(
        'SELECT * FROM `Product`')
        
        return response[0];
    }
    async deleteProductById(id:number){
        const response = await this.mariaClient.query(
            'DELETE FROM `Product` WHERE id=?',
            [id]
        )
        return response[0];
    }
    async getSomeProductByIdArray(idArray:string[]){
        if(idArray.length===0)
            throw new Error('Empty array for request in MariaDB');
        let range = idArray.map(el=>"'"+el+"'"+",");
        range = range.slice(0, -1);
        const response = await this.mariaClient.query(
        `SELECT * FROM Product WHERE id IN ( ${range} )})`)
        
        return response[0];
    }
    async getProductById(id:number){
        const response = await this.mariaClient.query(
        'SELECT * FROM `Product` WHERE id=(?)', 
        [id])
        
        return response[0];
    }
    async putProduct(productCreationAttrs:ProductCreationAttrs){
        const response = await this.mariaClient.query(
            'INSERT INTO Product ( name, description,price, provider_id ) VALUES(?, ?, ?, ?);',
        [productCreationAttrs.name, productCreationAttrs.description, productCreationAttrs.price, productCreationAttrs.provider_id]);
        return response;
    }


    
}
