import { RequestMethods } from '@/helpers/enums';

export type VariablesRequest = {
  [key: string]: string;
};

export interface RequestData {
  url: string;
  method: RequestMethods;
  body: string;
  headers: IVariable[];
}

export interface IVariable {
  key: string;
  value: string;
}

export enum VariableKeys {
  key = 'key',
  value = 'value',
}

export type changeVariableType = (value: string, name: VariableKeys, index: number) => void;
