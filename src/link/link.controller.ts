import { Body, 
         Controller, 
         Get, 
         Param, 
         Post, 
         Req, 
         UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Order } from '../order/order';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { LinkService } from './link.service';
import { Link } from './link';

@Controller()
export class LinkController {
    constructor(
        private LinkService: LinkService,
        private authService: AuthService
    ){} 

    @UseGuards(AuthGuard)
    @Get('admin/users/:id/links')
    async all(@Param('id') id: number){
        return this.LinkService.find({
            user: id,
            relations: ['orders']
        })
    }


    @UseGuards(AuthGuard)
    @Post('ambassador/links')
    async create(
        @Body('products') products: number[],
        @Req() request: Request
    ){
        const user = await this.authService.user(request);

        return this.LinkService.save({
            code: Math.random().toString(36).substring(6),
            user,
            products: products.map(id => ({id}))
        })
    }

    @UseGuards(AuthGuard)
    @Get('ambassador/stats')
    async stats(
        @Req() request: Request
    ){
        const user = await this.authService.user(request);

        const links: Link[] = await this.LinkService.find({
            user,
            relations: ['orders']
        });

        return links.map( link => {
            const completedOrders:  Order[] = link.orders.filter(o => o.complete)

            return {
                code: link.code,
                count: completedOrders.length,
                revenue: completedOrders.reduce((s, o) => s + o.ambassador_revenue, 0)
            }
        })
    }
}