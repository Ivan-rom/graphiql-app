import { RequestMethods } from '@/helpers/enums';

export type VariablesRequest = {
  [key: string]: JSONTypes;
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
  id: number;
}

export enum VariableKeys {
  key = 'key',
  value = 'value',
}

export type changeVariableType = (value: string, name: VariableKeys, index: number) => void;

export type JSONTypes = string | null | number | boolean | { [key: string]: JSONTypes } | JSONTypes[];

export type HistoryElement = {
  href: string;
  method: string;
  url: string;
};
