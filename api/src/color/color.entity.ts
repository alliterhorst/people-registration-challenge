import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Color {
  @ApiProperty({
    example: '3c7942a8-b895-4fdf-ba93-669fcf07bf90',
    description: 'Color Identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Hexadecimal color',
  })
  @Column({ unique: true })
  color: string;

  @ApiProperty({
    example: 'Vermelho',
    description: 'Color name',
  })
  @Column({ unique: true })
  name: string;
}
