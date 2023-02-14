import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order';
import { OrderItem } from './order_item';
import { OrderItemService } from './order_tem.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { SharedservicesModule } from '../sharedservices/sharedservices.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Order, OrderItem]),
    SharedservicesModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService]
})
export class OrderModule {}
