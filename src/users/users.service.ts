import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';
import { UserElasticsearchRepository } from './user-elasticsearch.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private userElasticsearchRepository: UserElasticsearchRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.userRepository.create(createUserDto);
    console.log(
      await this.userElasticsearchRepository.addDocument(
        'users',
        createUserDto,
      ),
    );

    return { msg: 'user created' };
  }

  async findAll() {
    console.log(
      await this.userElasticsearchRepository.getAllDocuments('users'),
    );
    return this.userRepository.find({}, { __v: 0 });
  }

  async findOne(id: string) {
    console.log(
      await this.userElasticsearchRepository.getDocumentById('users', id),
    );

    return this.userRepository.findOne({ _id: id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log(
      await this.userElasticsearchRepository.updateDocument(
        'users',
        id,
        updateUserDto,
      ),
    );

    return this.userRepository.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  async remove(id: string) {
    console.log(
      await this.userElasticsearchRepository.deleteDocument('users', id),
    );

    return this.userRepository.deleteMany({ _id: id });
  }
}
