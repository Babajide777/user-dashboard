import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Req,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { FailResponseDto } from 'src/auth/dto/fail-response.dto';
import { IResponse } from 'src/utils/response/response.type';
import { EditUserDto } from './dto/edit-user.dto';
import { SuccessResponseDto } from 'src/auth/dto/success-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('')
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({
    status: 201,
    description: 'User created successfully',
    // type: CreateEmployeesResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to create user',
    type: FailResponseDto,
  })
  @ApiBody({ type: CreateUserDto })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<IResponse> {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Edit user' })
  @ApiOkResponse({
    status: 200,
    description: 'User edited successfully',
    // type: CreateEmployeesResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Unable to edit user',
    type: FailResponseDto,
  })
  @ApiBody({ type: EditUserDto })
  @HttpCode(HttpStatus.OK)
  async editEmployee(
    @Body() editUserDto: EditUserDto,
    @Param('userId')
    userId: string,
  ): Promise<IResponse> {
    return this.usersService.editUser(userId, editUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete User' })
  @ApiOkResponse({
    status: 200,
    description: 'User deleted successfully',
    type: SuccessResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error deleting user',
    type: FailResponseDto,
  })
  @HttpCode(HttpStatus.OK)
  async deleteRole(
    @Param('userId')
    userId: string,
  ): Promise<IResponse> {
    return await this.usersService.deleteUser(userId);
  }
}
