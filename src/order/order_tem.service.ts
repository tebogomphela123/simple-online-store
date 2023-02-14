import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../sharedservices/abstract.service';
import { Repository } from 'typeorm';
import { OrderItem } from './order_item';

@Injectable()
export class OrderItemService extends AbstractService {
    constructor(
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>
    ){
        super(orderItemRepository);
    }
}