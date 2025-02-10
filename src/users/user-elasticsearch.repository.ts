import { Injectable } from '@nestjs/common';
import { ElasticsearchRepository } from 'src/elasticsearch/elasticsearch.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserElasticsearchRepository extends ElasticsearchRepository<User> {}
