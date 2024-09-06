import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent, SetStateAction } from 'react';

export type VariablesRequest = {
  [key: string]: string;
};

export interface RequestData {
  url: string;
  method: RequestMethods;
  body: string;
  header: VariablesRequest;
}

export interface IVariable {
  key: string;
  value: string;
}

export type setVariablesType = (value: SetStateAction<IVariable[]>) => void;

export type changeVariableType = (event: ChangeEvent<HTMLInputElement>, index: number) => void;

export type setBodyType = (value: SetStateAction<string>) => void;
