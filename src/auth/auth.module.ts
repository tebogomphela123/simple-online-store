import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedservicesModule } from '../sharedservices/sharedservices.module';

@Module({
  imports: [
    UserModule,
    SharedservicesModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService]


})
export class AuthModule {}
