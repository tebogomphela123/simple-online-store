import { NestFactory } from "@nestjs/core";
import * as faker from "faker";
import { AppModule } from "../app.module";
import { UserService } from "../user/user.service";

import * as bcrypt from 'bcryptjs';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userService = app.get(UserService);

    for (let index = 0; index < 30; index++) {
        await userService.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password: await bcrypt.hash(faker.name.firstName(), 12),
            is_ambassador: true,
        });
    }

    process.exit();
};

bootstrap();