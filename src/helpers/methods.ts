import { ChangeEvent } from 'react';
import { IVariable, setBodyType, setVariablesType, VariablesRequest } from './types';
import { emptyURL } from './constants';

export function encodeToBase64(text: string) {
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(text);
  return btoa(String.fromCharCode(...utf8Array));
}

export function decodeFromBase64(text: string) {
  try {
    return atob(text);
  } catch {
    return '';
  }
}

export function variableObject(variableArray: { key: string; value: string }[], object: VariablesRequest) {
  return variableArray.reduce((acc: VariablesRequest, variable) => {
    if (variable.key) {
      acc[variable.key] = variable.value;
    }
    return acc;
  }, object);
}

export function variablesToString(variables: IVariable[]) {
  const stringsArray = variables
    .map((variable) => {
      if (variable.key) {
        return `${variable.key}=${variable.value}`;
      }
    })
    .filter((value) => value !== undefined);
  return stringsArray;
}

export function variablesToQueryParams(variables: IVariable[]) {
  const queryParamsArray = variablesToString(variables);
  const queryParamsString = queryParamsArray.join('&');
  return queryParamsString;
}

export const prettifyingBody = (bodyString: string, setValue: setBodyType) => {
  try {
    const jsonObject = JSON.parse(bodyString);
    const prettyJson = JSON.stringify(jsonObject, null, 2);
    setValue(prettyJson);
  } catch {
    setValue(bodyString);
  }
};

export function removeItemFromArray(array: IVariable[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export const handleChangeVariables = (event: ChangeEvent<HTMLInputElement>, index: number, variables: IVariable[]) => {
  const { name, value } = event.target;
  const changedVariables = [...variables];
  if (name === 'key' || name === 'value') {
    changedVariables[index][name] = value;
  }
  return changedVariables;
};

export const formatURL = (
  urlText: string,
  methodText: string,
  bodyText: string,
  variables: IVariable[],
  headersObject: IVariable[],
  variableBodyVisible: boolean,
) => {
  let requestURL = `/${methodText}`;
  requestURL += urlText ? `/${encodeToBase64(urlText)}` : `/${encodeToBase64(emptyURL)}`;
  if (variableBodyVisible) {
    requestURL += variables.length !== 0 ? `/${encodeToBase64(JSON.stringify(variableObject(variables, {})))}` : '';
  } else {
    requestURL += bodyText ? `/${encodeToBase64(bodyText)}` : '';
  }
  const headersVariables = variablesToQueryParams(headersObject);
  requestURL += headersVariables ? `/?${headersVariables}` : '';
  return requestURL;
};

export const addVariablesHandler = (variablesArray: IVariable[], callback: setVariablesType) => {
  const changedVariables = [...variablesArray];
  changedVariables.push({ key: '', value: '' });
  callback(changedVariables);
};
