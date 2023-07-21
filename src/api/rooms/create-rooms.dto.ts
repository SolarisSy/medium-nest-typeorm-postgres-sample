import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomsDto {
  @IsString()
  @IsNotEmpty()
  public n_quarto?: string;

  @IsString()
  @IsNotEmpty()
  public valor?: string;

  @IsBoolean()
  @IsNotEmpty()
  public situacao?: boolean;

  @IsString()
  @IsNotEmpty()
  public data_entrada?: string;

  @IsString()
  @IsNotEmpty()
  public data_saida?: string;
}