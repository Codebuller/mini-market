import { createClient }  from 'redis';

export class Redis {
    async putProduct(key:any, value:any){
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        return await client.set('product:'+JSON.stringify(key), JSON.stringify(value));
    }
    async deleteBucket(id:string){
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        return await client.del('bucket:'+JSON.stringify(id));
    }
    async getProduct(key:any){
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        return await client.get('product:'+JSON.stringify(key));
    }

    async getBucketById(id:any){
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
        return await client.get('bucket:'+id.toString());
    }
    async putInBucketById(id:any, product:any){
        const client = await createClient()
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
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