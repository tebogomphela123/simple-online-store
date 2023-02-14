import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedservicesModule } from '../sharedservices/sharedservices.module';
import { Product } from './product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product]),
    SharedservicesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
