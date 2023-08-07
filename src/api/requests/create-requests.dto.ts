import {IsNotEmpty, IsNumber, IsString, } from 'class-validator';

export class CreateRequestsDto {
  @IsNumber()
  @IsNotEmpty()
  public valor?: number;

  @IsString()
  @IsNotEmpty()
  public paymentmethod: string;
}