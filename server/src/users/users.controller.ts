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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { FailResponseDto } from 'src/auth/dto/fail-response.dto';
import { IResponse } from 'src/utils/response/response.type';

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
  async createUser(
    @Req() req: any,
    @Body() createUserDto: CreateUserDto,
  ): Promise<IResponse> {
    return this.usersService.createUser(createUserDto);
  }
}
