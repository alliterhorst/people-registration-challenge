import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Color } from './color/color.entity';
import { Person } from './person/person.entity';
import { SeedRainbowColors1691564183013 } from './migration/1691564183013-SeedRainbowColors';
import { ColorModule } from './color/color.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Color, Person],
      migrations: [SeedRainbowColors1691564183013],
      migrationsRun: true,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ColorModule,
    PersonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
