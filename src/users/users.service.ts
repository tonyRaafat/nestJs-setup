import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  findAll() {
    return this.userRepository.find({}, { __v: 0 });
  }

  findOne(id: string) {
    return this.userRepository.findOne({ _id: id });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.findOneAndUpdate({ _id: id }, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteMany({ _id: id });
  }
}
