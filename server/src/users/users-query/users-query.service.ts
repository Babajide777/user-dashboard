import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserType } from '../types/create-user-type';
import { User } from '@prisma/client';
import { EditUserDto } from '../dto/edit-user.dto';

@Injectable()
export class UsersQueryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
        deleted: false,
      },
    });
  }

  async findUserByUserName(userName: string) {
    return await this.prismaService.user.findUnique({
      where: {
        userName,
        deleted: false,
      },
    });
  }

  async findUserById(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
        deleted: false,
      },
    });
  }

  async createUser(data: CreateUserType) {
    return await this.prismaService.user.create({
      data,
    });
  }

  async editUser(id: string, data: Partial<User>) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: { ...data, updatedAt: new Date(Date.now()) },
    });
  }
}
