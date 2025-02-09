import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    if (createUserDto.role !== Role.user && createUserDto.role !== Role.admin) {
      throw new BadRequestException();
    }
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
