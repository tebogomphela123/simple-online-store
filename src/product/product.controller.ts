import { Body, 
         CacheInterceptor, 
         CacheKey, 
         CacheTTL, 
         CACHE_MANAGER, 
         Controller, 
         Delete, 
         Get, 
         Inject, 
         Param, 
         Post, 
         Put, 
         Req, 
         UseGuards,
         UseInterceptors} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';

@Controller()
export class ProductController {

    constructor(
        private readonly productService: ProductService,
        @Inject(CACHE_MANAGER) private cacheManager :Cache
    ){}


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

 
    @CacheKey('products_frontend')
    @CacheTTL(60*360*1000)
    @UseInterceptors(CacheInterceptor)  
    @Get('ambassador/products/frontend')
    async frontend(
    ){
        return this.productService.find();
    }


    @Get('ambassador/products/backend') 
    async backend(
        @Req() request: Request
    ){
        let products = await this.productService.find();
        if(request.query.search){
            const search = request.query.search.toString().toLowerCase();
            products = products.filter(p => p.title.toLowerCase().indexOf(search) >=0 || 
            p.description.toLowerCase().indexOf(search) >= 0)
        }

        if(request.query.sort  ===  'asc'  || request.query.sort === 'desc'){
            products.sort((a, b) => {
                const differecne = a.price - b.price;

                if(differecne === 0) return 0;

                let sorted = Math.abs(differecne)/ differecne;
                
                return request.query.sort === 'asc' ? sorted : -sorted;
            })
        }


        const page: number = parseInt(request.query.page as any) || 1;
        const perPage = 5;
        const total = products.length;

        
        const data = products.slice((page -1) * perPage, page * perPage);

        return {
            data, 
            total,
            page,
            lastPage: Math.ceil(total / perPage)
        };
    }
}
