import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsDefined()
  @ApiModelProperty()
  email: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  firstName: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  lastName: string;

  @IsString()
  @IsDefined()
  @MaxLength(31)
  @ApiModelProperty()
  mobilePhone: string;

  @IsString()
  @IsDefined()
  @ApiModelProperty()
  password: string;
}
