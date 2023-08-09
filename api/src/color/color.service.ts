import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from './color.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color) private colorsRepository: Repository<Color>,
  ) {}

  getColors(): Promise<Color[]> {
    return this.colorsRepository.find();
  }

  getColorById(colorId: string): Promise<Color> {
    return this.colorsRepository.findOne({
      where: {
        id: colorId,
      },
    });
  }
}
