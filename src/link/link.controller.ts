import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { LinkService } from './link.service';

@Controller()
export class LinkController {
    constructor(
        private LinkService: LinkService
    ){} 

    @UseGuards(AuthGuard)
    @Get('admin/users/:id/links')
    async all(@Param('id') id: number){
        return this.LinkService.find({
            // user: id
            // relations: ['orders']
        })
    }
}