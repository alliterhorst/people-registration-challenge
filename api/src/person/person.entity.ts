import { ApiProperty } from '@nestjs/swagger';
import { Color } from 'src/color/color.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Person {
  @ApiProperty({
    example: '5c7942a8-b895-4fdf-ba93-669fcf07bf74',
    description: 'Person Identifier',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Person fullname',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '11111111111',
    description: 'CPF',
  })
  @Column({ unique: true, width: 11 })
  cpf: string;

  @ApiProperty({
    example: 'john.doe@gmail.com',
    description: 'E-mail',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'Favorite color',
    type: Color,
  })
  @ManyToOne(() => Color)
  @JoinColumn({ name: 'color_id' })
  favoriteColor: Color;

  @ApiProperty({
    example: 'Contact only during business hours',
    description: 'Comment',
    required: false,
  })
  @Column({ nullable: true })
  comment: string;
}
