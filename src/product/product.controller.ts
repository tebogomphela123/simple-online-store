import { Controller, Get } from '@nestjs/common';
import { Repository } from 'typeorm';

@Controller('product')
export class ProductController {
    constructor(private readonly productRepository: Repository<any>){}

    // @Get('admin/')
}
