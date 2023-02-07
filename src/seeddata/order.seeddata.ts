import { NestFactory } from "@nestjs/core";
import { AppModule } from "../app.module";
import * as faker from "faker";
import { OrderService } from "../order/order.service";
import { OrderItemService } from "../order/order_tem.service";
import { randomInt } from "crypto";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const orderService = app.get(OrderService);

    const orderItemService = app.get(OrderItemService);

    for (let index = 0; index < 1; index++) {
        const order = await orderService.save({ 
            user_id: randomInt(1, 30),
            code: faker.lorem.slug(2) ,
            ambassador_email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            complete: true
        });

        for (let j = 0; j < 2; j++) {
            await orderItemService.save({
                order,
                product_title: faker.lorem.words(2),
                price: faker.commerce.price(),
                quantity: randomInt(1,3),
                admin_revenue: randomInt(50, 100),
                ambassador_revenue: randomInt(1, 10)
            })
        }
    }

    process.exit();
};

bootstrap()