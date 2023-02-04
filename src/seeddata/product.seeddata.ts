import { NestFactory } from "@nestjs/core";
import { ProductService } from "../product/product.service";
import { AppModule } from "../app.module";
import * as faker from "faker";

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const productService = app.get(ProductService);

    for (let index = 0; index < 20; index++) {
        await productService.save({ 
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price()
        });
    }
    process.exit();
};
bootstrap()