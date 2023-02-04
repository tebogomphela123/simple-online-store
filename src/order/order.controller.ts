import { ClassSerializerInterceptor, Controller, 
         Get, 
         UseInterceptors} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
    constructor(
        private orderService:OrderService
    ){}

    @Get('admin/order')
    @UseInterceptors(ClassSerializerInterceptor)
    async all (){
            return this.orderService.find({
                
        });
    }
}
