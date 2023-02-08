import { Exclude, Expose } from "class-transformer";
import { Link } from "../link/link";
import { Column, 
         Entity,
         ManyToOne,
         OneToMany, 
         PrimaryGeneratedColumn, } from "typeorm";
import { OrderItem } from "./order_item";
import { User } from "../user/user";
 
@Entity('orders')
export class Order{

    @PrimaryGeneratedColumn()
    id: string;

    @Column({nullable: true})
    transaction_id: string;

    @Column()
    user_id: number;


    @Column()
    code: string;


    @Column()
    ambassador_email: string;

    @Exclude()
    @Column()
    first_name: string;

    @Exclude()
    @Column()
    last_name: string;

    @Column()
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
    @Column({nullable: false})
    complete: boolean;

    @OneToMany((type) => OrderItem, order_items => order_items.order)
    order_items: OrderItem[];

    @ManyToOne(()=> User, user => user.orders, {createForeignKeyConstraints: false})
    user: User;

    @ManyToOne(()=> Link, link => link.orders,
    {createForeignKeyConstraints: false})
    link: Link;

    @Expose()
    get name(){
        return `${this.first_name} ${this.last_name}`;
    }

    get ambassador_revenue(): number{
        return this.order_items.reduce((s,i)=> s + i.ambassador_revenue, 0);
    }
}
