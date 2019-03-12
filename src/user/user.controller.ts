import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/auth.guard';
import { UserPostInDto } from './user-post-in.dto';
import { UserService } from './user.service';

@ApiUseTags('User')
@ApiBearerAuth()
@UseGuards(new JwtAuthGuard())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ title: 'Create an user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User créé',
  })
  async create(
    @Body(new ValidationPipe({ whitelist: true }))
    dto: UserPostInDto,
  ) {
    return this.userService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ title: 'Get a user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User trouvé et retourné',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User non trouvé :/ ',
  })
  async getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @Put(':id')
  @ApiOperation({ title: 'Update an user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User trouvé et mis à jour',
  })
  async updateById(
    @Param('id') id: string,
    @Body(new ValidationPipe({ whitelist: true })) dto: UserPostInDto,
  ) {
    return this.userService.updateById(id, dto);
  }
}
