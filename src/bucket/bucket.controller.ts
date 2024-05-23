import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BucketService } from './bucket.service';
import { BucketPostDTO } from './dto/bucket-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { request } from 'http';

@ApiTags('Bucket')
@ApiBearerAuth()
@Controller('bucket')
export class BucketController {
    constructor(private bucketService: BucketService){}


    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200})
    @Get('/')
    async approve( @Req() request){
        const user = request.user;
        return await this.bucketService.getBucketById(user.id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200})
    @Post('/:id')
    async postProductInBucket( @Req() request, @Body() bucketPostDTO:BucketPostDTO){
        const user = request.user;
        return await this.bucketService.postProductInBucket(user.id, bucketPostDTO.products_id)
    }


    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200})
    @Get('/with-products/')
    async getProductsInBucket( @Req() request){
        const user = request.user;
        return await this.bucketService.getProductsInBucket(user.id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200})
    @Delete('/clear-bucket/')
    async clearBucket( @Req() request){
        const user = request.user;
        return await this.bucketService.clearBucket(user.id)
    }

    @UseGuards(JwtAuthGuard)
    @ApiResponse({status:200})
    @Delete('/clear-product/:id')
    async clearProductFromBucket( @Req() request, @Param('id') id:string){
        const user = request.user;
        return await this.bucketService.clearProductFromBucket(user.id, id)
    }
}
