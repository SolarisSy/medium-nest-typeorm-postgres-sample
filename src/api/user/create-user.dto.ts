import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  public cidade?: string;

  @IsString()
  @IsNotEmpty()
  public celular?: string;
}