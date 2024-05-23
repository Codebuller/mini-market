import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductCreationAttrs } from 'src/maria/interfaces';
import { ProductCreateDTO } from './dto/product-create.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}

    @Get('/')
    async getAllProduct(){
        return await this.productService.getAllProduct();
    }

    @Get('/:id')
    async getProductById(@Param('id') id:number){
        return await this.productService.getProductById(id);
    }


    @Delete('/:id')
    async deleteProductById(@Param('id') id:number){
        return await this.productService.deleteProductById(id);
    }


    @Post('/')
    async postProduct( @Body() productCreationAttrs:ProductCreateDTO){
        return await this.productService.putProduct(productCreationAttrs);
    }
}
