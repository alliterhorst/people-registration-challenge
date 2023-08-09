import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from 'src/color/color.entity';
import { Person } from './person.entity';
import { ColorService } from 'src/color/color.service';

@Module({
  imports: [TypeOrmModule.forFeature([Color, Person])],
  controllers: [PersonController],
  providers: [PersonService, ColorService],
})
export class PersonModule {}
