import { ClassSerializerInterceptor, 
         Controller, 
         Get, 
         UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, 
         ApiForbiddenResponse, 
         ApiOkResponse, 
         ApiTooManyRequestsResponse} from '@nestjs/swagger';
import { User } from './user';
import { UserService } from './user.service';


@Controller()
@ApiBadRequestResponse({description: 'Bad Request'})
@ApiForbiddenResponse({ description: 'Forbidden Request'})
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(private readonly useService: UserService){
    }

    @ApiTooManyRequestsResponse({description: 'Too many requests' })
    @Get('admin/ambassador')
    @ApiOkResponse({description: 'OK'})
    async ambassadors(){
        return this.useService.find(
            {
                is_ambassador: true
            }
        )
    }

    @Get('ambassador/rankings')
    async ranking() {
        const ambassadors: User[] =  await this.useService.find(
            {
                is_ambassador: true,
                relations: ['orders', 'orders.order_items']
            }
        ) 
        return ambassadors.map(ambassadors =>{
            return{
                name: ambassadors.name,
                revenue: ambassadors.revenue
            }
        })
    }
}
