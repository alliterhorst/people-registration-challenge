import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { IsCPF } from 'brazilian-class-validator';

export class CreatePersonDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Person fullname',
    required: true,
  })
  @IsString({ message: 'O nome é obrigatório' })
  name: string;

  @ApiProperty({
    example: '11111111111',
    description: 'CPF',
    required: true,
  })
  @IsString({ message: 'O CPF é obrigatório' })
  @Length(11, 11, { message: 'O CPF deve possuir 11 digitos' })
  @IsCPF({ message: 'CPF inválido' })
  cpf: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'E-mail',
    required: true,
  })
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @ApiProperty({
    description: 'Color ID',
    example: '3c7942a8-b895-4fdf-ba93-669fcf07bf90',
    required: true,
  })
  @IsString({ message: 'A cor é obrigatória' })
  colorId: string;

  @ApiProperty({
    example: 'Contact only during business hours',
    description: 'Comment',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'A observação deve ser um texto' })
  comment: string;
}
