import { IsEmail, isEmail, IsNotEmpty, IsOptional } from "class-validator";
import { table } from "console";
import { Column, 
         Entity,
         OneToMany, 
         PrimaryGeneratedColumn, } from "typeorm";
import { OrderItem } from "./order-item";

@Entity('orders')
export class Order{

    @PrimaryGeneratedColumn()
    id: string;

    @IsNotEmpty()

    @Column({nullable: true})
    transaction_id: string;

    @IsOptional()
    @Column({nullable: true})
    user_id: number;

    @IsOptional()
    @Column({nullable: true})
    code: string;

    @IsOptional()
    @Column({nullable: true})
    ambassador_email: string;

    @IsOptional()
    @Column({nullable: true})
    first_name: string;

    @IsOptional()
    @Column({nullable: true})
    last_name: string;

    @IsOptional()
    @IsEmail()
    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    address: string;

    @Column({nullable: true})
    country: string;

    @Column({nullable: true})
    city: string;

    @Column({nullable: true})
    zip: string;

    @Column({nullable: true})
    complete: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[];
}
