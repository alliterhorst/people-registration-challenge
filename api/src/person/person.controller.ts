import { Body, Controller, Get, Post } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Person } from './person.entity';
import { CreatePersonDto } from './dto/create-person.dto';

@ApiTags('people')
@Controller('people')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @ApiOkResponse({
    description: 'People list',
    type: Person,
    isArray: true,
  })
  @Get()
  getPeople(): Promise<Person[]> {
    return this.personService.getPeople();
  }

  @ApiCreatedResponse({ type: Person, description: 'Created Person' })
  @Post()
  createTask(@Body() body: CreatePersonDto): Promise<Person> {
    return this.personService.createPerson(body);
  }
}
