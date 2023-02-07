import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedservicesModule } from '../sharedservies/sharedservices.module';
import { Link } from './link';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    SharedservicesModule
  ],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule {}
