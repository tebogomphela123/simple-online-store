import { ClassSerializerInterceptor, Controller, 
         Get, 
         UseGuards, 
         UseInterceptors} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderService } from './order.service';

@Controller()
export class OrderController { 
    constructor(
        private orderService: OrderService, 
    ){}


    @UseGuards(AuthGuard)
    @Get('admin/order')
    @UseInterceptors(ClassSerializerInterceptor)
    async all (){
        return this.orderService.find({
            // relations: ['order_']
        })
    }
}
