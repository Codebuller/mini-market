import { ProductCard } from "./interfaces";
import mariadb from 'mysql2/promise';
export class MariaDB {
    pool: any
    connection:any
    initPromise:undefined|Promise<mariadb.Connection>
    constructor() { 
        this.initPromise = mariadb.createConnection({host: process.env.MARYADB_HOST, password: process.env.MARIA_DB_PASSWORD, user: process.env.MARIA_DB_USERNAME, connectionLimit: 5})
        .then((connection) => this.connection = connection);
    }

    async putItem(card:ProductCard){
        const response = await this.connection.query('INSERT INTO products (id, name, price) VALUES (?, ?, ?)', [card.id, card.name, card.price]);
        return response;
    }
}