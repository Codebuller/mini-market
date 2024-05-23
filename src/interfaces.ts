export interface User{
    id:number;
    name:string;
    lastName:string;
    email:string;
    password:string;
    transaction_id?:number;   
}


export interface Product{
    id:number;
    name:string;
    description:string;
    price:number;
    provider_id?:number;
    created_at:string;
}