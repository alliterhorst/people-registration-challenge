import { IColor } from './color.interface';

export interface IPerson {
  id: string;
  name: string;
  cpf: string;
  email: string;
  favoriteColor: IColor;
  comment?: string;
}
