import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseService } from 'src/utils/response/response.service';
import { PasswordHashService } from 'src/utils/password-hash/password-hash.service';
import { UsersQueryService } from './users-query/users-query.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly responseService: ResponseService,
    private readonly passwordHashService: PasswordHashService,
    private readonly usersQueryService: UsersQueryService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...item } = createUserDto;

    const hashedPassword =
      await this.passwordHashService.hashPassword(password);

    const user = await this.usersQueryService.createUser({
      ...item,
      password: hashedPassword,
    });

    return this.responseService.response(true, 'User created successfully', {
      user,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
