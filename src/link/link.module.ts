import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SharedservicesModule } from '../sharedservices/sharedservices.module';
import { Link } from './link';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    SharedservicesModule,
    AuthModule
  ],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
