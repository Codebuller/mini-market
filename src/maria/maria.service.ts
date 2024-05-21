import { Injectable, OnModuleInit } from '@nestjs/common';
const mariadb = require('mysql2');
import  * as mysql from 'mysql2/promise.js';
import { ProductCreationAttrs } from './interfaces';
var client:mysql.Connection|undefined; 
@Injectable() 
export class MariaService implements OnModuleInit {
    async getAllProduct(){
        const response = await client.query(
        'SELECT * FROM `Product`')
        
        return response[0];
    }
    async getSomeProductByIdArray(idArray:string[]){
        if(idArray.length===0)
            throw new Error('Empty array for request in MariaDB');
        let range = idArray.map(el=>"'"+el+"'"+",");
        range = range.slice(0, -1);
        const response = await client.query(
        `SELECT * FROM Product WHERE id IN ( ${range} )})`)
        
        return response[0];
    }
    async getProductById(id:number){
        const response = await client.query(
        'SELECT * FROM `Product` WHERE id=(?)', 
        [id])
        
        return response[0];
    }
    async putProduct(card:ProductCreationAttrs){
        const response = await client.query(
            'INSERT INTO Product ( name, description,price, provider_id ) VALUES(?, ?, ?, ?);',
        [card.name, card.description, card.price, card.provider_id]);
        return response;
    }


    async onModuleInit(){
        client = await mysql.createConnection({host: process.env.MARYADB_HOST, 
            password: process.env.MARIA_DB_PASSWORD, 
            user: process.env.MARIA_DB_USERNAME, 
            connectionLimit: 5, 
            database: process.env.MARIA_DB_DATABASE})
    }
}
