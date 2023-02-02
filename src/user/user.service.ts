import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../sharedservies/abstract.service';
import { Repository } from 'typeorm';
import { User } from './user';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){
        super(userRepository)
    }
}
