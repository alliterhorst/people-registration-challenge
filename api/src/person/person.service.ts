import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { ColorService } from 'src/color/color.service';
import { CreatePersonDto } from './dto/create-person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    private readonly colorService: ColorService,
  ) {}

  private async checkPersonDuplicity({
    cpf,
    email,
  }: CreatePersonDto): Promise<void> {
    const people = await this.personRepository.find({
      where: [{ cpf }, { email }],
    });

    people.forEach((person) => {
      if (person.cpf === cpf)
        throw new UnprocessableEntityException('CPF já cadastrado');
      if (person.email.toUpperCase() === email.toUpperCase())
        throw new UnprocessableEntityException('Email já cadastrado');
    });
  }

  getPeople(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async createPerson(personDto: CreatePersonDto): Promise<Person> {
    const { name, colorId, comment, cpf, email } = personDto;
    const color = await this.colorService.getColorById(colorId);
    if (!color) throw new UnprocessableEntityException('Cor não encontrada');
    await this.checkPersonDuplicity(personDto);
    const person = this.personRepository.create({
      name,
      comment,
      cpf,
      email,
      favoriteColor: color,
    });

    const createdPerson = await this.personRepository.save(person);
    return createdPerson;
  }
}
