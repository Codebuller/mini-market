import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Order')
@Controller('order')
export class OrderController {
    constructor(private orderService:OrderService){}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getOrders(@Req() request){
        const id = request.user.id;
        return await this.orderService.getOrders(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/buy')
    async createOrder(@Req() request){
        const id = request.user.id;
        return await this.orderService.createOrder(id);
    }

}
