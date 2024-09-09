import { IVariable, setVariablesType, VariablesRequest } from './types';
import { emptyURL } from './constants';

export function encodeToBase64(text: string) {
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(text);
  return btoa(String.fromCharCode(...utf8Array));
}

export function decodeFromBase64(encodedUrlBase64: string) {
  const decodedUrlBase64 = decodeURIComponent(encodedUrlBase64 || '');
  const decodedUrl = atob(decodedUrlBase64);
  return decodedUrl;
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
  const searchParams = new URLSearchParams();
  variables.forEach(({ value, key }) => {
    searchParams.set(key, value);
  });
  return searchParams.toString();
}

export const prettifyingBody = (bodyString: string) => {
  try {
    const jsonObject = JSON.parse(bodyString);
    const prettyJson = JSON.stringify(jsonObject, null, 2);
    return prettyJson;
  } catch {
    return bodyString;
  }
};

export function removeItemFromArray(array: IVariable[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)];
}

export const handleChangeVariables = (value: string, name: string, index: number, variables: IVariable[]) => {
  const changedVariables = [...variables];
  if (name === 'key' || name === 'value') {
    changedVariables[index][name] = value;
  }
  return changedVariables;
};

export const formatURL = (urlText: string, methodText: string, bodyText: string, headersObject: IVariable[]) => {
  let requestURL = `/${methodText}`;
  requestURL += urlText ? `/${encodeToBase64(urlText)}` : `/${emptyURL}`;
  requestURL += bodyText ? `/${encodeToBase64(bodyText)}` : '';
  const headersVariables = variablesToQueryParams(headersObject);
  requestURL += headersVariables ? `/?${headersVariables}` : '';
  return requestURL;
};

export const addVariablesHandler = (variablesArray: IVariable[], callback: setVariablesType) => {
  const changedVariables = [...variablesArray];
  changedVariables.push({ key: '', value: '' });
  callback(changedVariables);
};
