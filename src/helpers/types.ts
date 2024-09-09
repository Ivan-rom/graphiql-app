import { RequestMethods } from '@/helpers/enums';
import { SetStateAction } from 'react';

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

export enum VariableKeys {
  key = 'key',
  value = 'value',
}

export type setVariablesType = (value: SetStateAction<IVariable[]>) => void;

export type changeVariableType = (value: string, name: VariableKeys, index: number) => void;
