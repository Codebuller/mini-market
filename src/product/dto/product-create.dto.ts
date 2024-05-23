import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class ProductCreateDTO {
    @ApiProperty( {example:'product1_name_default',description:'Name of the product'} )
    readonly name: string
    @ApiProperty( {example:'this is a product',description:'Description of the product'} )
    readonly description:string
    @ApiProperty( {example:'1000',description:'Cost of the product'} )
    readonly price:number
    @ApiPropertyOptional( {example:null,description:'Id of provider(optional)'} )
    readonly provider_id?:number
}