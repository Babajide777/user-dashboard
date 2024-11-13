import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserType } from '../types/create-user-type';

@Injectable()
export class UsersQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  findUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }
  // findUserByUserName(userName: string) {
  //   return this.prismaService.user.findUnique({
  //     where: {
  //       userName,
  //     },
  //   });
  // }

  findUserById(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  createUser(data: CreateUserType) {
    return this.prismaService.user.create({
      data,
    });
  }
}
