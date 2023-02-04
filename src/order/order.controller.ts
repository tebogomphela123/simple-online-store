import { Controller, 
         Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
    constructor(
        private orderService:OrderService
    ){}

    @Get('admin/order')
    async all (res){
       
        return this.orderService.find({
            
        });
    }
}
