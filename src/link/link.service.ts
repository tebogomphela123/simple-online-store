import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../sharedservices/abstract.service';
import { Repository } from 'typeorm';
import { Link } from './link';

@Injectable()
export class LinkService extends AbstractService {
    constructor(
        @InjectRepository(Link) private readonly linkRepository: Repository<Link>
    ){
        super(linkRepository);
    }
}
