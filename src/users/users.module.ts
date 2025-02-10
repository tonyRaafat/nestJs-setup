import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserRepository } from './users.repository';
import { UserElasticsearchRepository } from './user-elasticsearch.repository';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ElasticsearchModule.register({
      node: 'http://elastic:j+8cg9O7Jyx-DPkRprlo@localhost:9200',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, UserElasticsearchRepository],
})
export class UsersModule {}
