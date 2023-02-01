import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
@Controller()
export class UserController {

    constructor(private readonly useService: UserService){

    }

    @Get('admin/ambassador')
    async ambassadors(){
        return this.useService.find(
            {
                is_ambassador: true
            }
        )
    }
}
