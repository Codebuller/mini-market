export interface Product {
    id: number
    name: string
    description:string
    price:number
    provider_id:number
    created_at:string
}
export interface ProductCreationAttrs{
    readonly name: string
    readonly description:string
    readonly price:number
    readonly provider_id?:number
}