import {IsNotEmpty, IsString } from 'class-validator';

export class CreateRequestsDto {
  @IsString()
  @IsNotEmpty()
  public valor?: string;
}