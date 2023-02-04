import { Exclude, Expose } from "class-transformer";
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

    @Column({nullable: true})
    transaction_id: string;

    @Column({nullable: true})
    user_id: number;


    @Column({nullable: true})
    code: string;


    @Column({nullable: true})
    ambassador_email: string;

    @Exclude()
    @Column({nullable: true})
    first_name: string;

    @Exclude()
    @Column({nullable: true})
    last_name: string;

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

    @Exclude()
    @Column({nullable: true})
    complete: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[];

    @Expose()
    get name(){
        return `${this.first_name} ${this.last_name}`
    }
}
