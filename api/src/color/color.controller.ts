import { Controller, Get } from '@nestjs/common';
import { ColorService } from './color.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Color } from './color.entity';

@ApiTags('colors')
@Controller('colors')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @ApiOkResponse({
    description: 'Color list',
    type: Color,
    isArray: true,
  })
  @Get()
  getColors(): Promise<Color[]> {
    return this.colorService.getColors();
  }
}
