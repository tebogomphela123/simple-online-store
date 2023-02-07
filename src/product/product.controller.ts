import { Body, 
         Controller, 
         Delete, 
         Get, 
         Param, 
         Post, 
         Put, 
         UseGuards} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {

    constructor(private readonly productService: ProductService){}


    @UseGuards(AuthGuard)
    @Get('admin/products')
    async all(){
        return this.productService.find();
    }

    @UseGuards(AuthGuard)
    @Post('admin/products')
    async createProduct(
        @Body() body: ProductDto
    ){
        return this.productService.save(body)
    }



    @UseGuards(AuthGuard)
    @Get('admin/product/:id')
    async getProduct(
        @Param('id') id:number
    ){
        return this.productService.findOne({id});
    }


    @UseGuards(AuthGuard)
    @Put('admin/product/:id')
    async updateProduct(
        @Param('id') id: number,
        @Body() body: ProductDto
    ){
        await this.productService.update(id, body)
        return this.productService.findOne({id});
    }


    @UseGuards(AuthGuard)
    @Delete('admin/product/:id')
    async deleteProduct(
        @Param('id') id: number
    ){
        return this.productService.delete(id);
    }
}
