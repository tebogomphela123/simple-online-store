import { Body, 
         Controller, 
         Delete, 
         Get, 
         Param, 
         Post, 
         Put } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {

    constructor(private readonly productService: ProductService){}

    @Get('admin/products')
    async all(){
        return this.productService.find();
    }


    @Post('admin/products')
    async createProduct(
        @Body() body: ProductDto
    ){
        return this.productService.save(body)
    }


    @Get('admin/product/:id')
    async getProduct(
        @Param('id') id:number
    ){
        return this.productService.findOne({id});
    }


    @Put('admin/product/:id')
    async updateProduct(
        @Param('id') id: number,
        @Body() body: ProductDto
    ){
        await this.productService.update(id, body)
        return this.productService.findOne({id});
    }


    @Delete('admin/product/:id')
    async deleteProduct(
        @Param('id') id: number
    ){
        return this.productService.delete(id);
    }
}
