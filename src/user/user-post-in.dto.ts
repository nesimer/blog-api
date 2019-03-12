import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString } from 'class-validator';

export class UserPostInDto {
  @IsEmail()
  @ApiModelProperty()
  email: string;

  @IsString()
  @ApiModelProperty()
  firstName: string;

  @IsString()
  @ApiModelProperty()
  lastName: string;

  @IsString()
  @ApiModelProperty()
  mobilePhone: string;

  @IsDefined()
  @ApiModelProperty()
  password: string;
}
