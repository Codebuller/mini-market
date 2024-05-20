import { ProductCreationAttrs } from "./interfaces";
import mariadb from 'mysql2/promise';
export class MariaDB {
    pool: any
    connection:any
    initPromise:undefined|Promise<mariadb.Connection>
    constructor() { 
        this.initPromise = mariadb.createConnection({host: process.env.MARYADB_HOST, 
            password: process.env.MARIA_DB_PASSWORD, 
            user: process.env.MARIA_DB_USERNAME, 
            connectionLimit: 5, 
            database: process.env.MARIA_DB_DATABASE})
        .then((connection) => this.connection = connection);
        
    }
    async getAllProduct(){
        const response = await this.connection.query(
        'SELECT * FROM `Product`')
        
        return response[0];
    }
    async getSomeProductByIdArray(idArray:string[]){
        if(idArray.length===0)
            throw new Error('Empty array for request in MariaDB');
        let range = idArray.map(el=>"'"+el+"'"+",");
        range = range.slice(0, -1);
        const response = await this.connection.query(
        `SELECT * FROM Product WHERE id IN ( ${range} )})`)
        
        return response[0];
    }
    async getProductById(id:number){
        const response = await this.connection.query(
        'SELECT * FROM `Product` WHERE id=(?)', 
        [id])
        
        return response[0];
    }
    async putProduct(card:ProductCreationAttrs){
        const response = await this.connection.query(
            'INSERT INTO Product ( name, description,price, provider_id ) VALUES(?, ?, ?, ?);',
        [card.name, card.description, card.price, card.provider_id]);
        return response;
    }
}