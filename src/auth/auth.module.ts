import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedservicesModule } from '../sharedservies/sharedservices.module';

@Module({

  imports: [
    UserModule,
    SharedservicesModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
