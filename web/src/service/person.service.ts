import { IColor } from '../interface/color.interface';
import { ICreatePerson } from '../interface/create-person.interface';
import { IPerson } from '../interface/person.interface';
import { backendApi } from './api';

const colorsPrefix = '/api/colors';
const prefix = '/api/people';
const serverUrl = 'http://localhost:3000';

export const getColors = async (): Promise<IColor[]> => {
  const { data } = await backendApi.get<IColor[]>(
    `${serverUrl}${colorsPrefix}`,
  );
  return data || [];
};

export const postPerson = async (person: ICreatePerson): Promise<IPerson> => {
  const { data } = await backendApi.post<IPerson>(
    `${serverUrl}${prefix}`,
    person,
  );
  return data;
};
