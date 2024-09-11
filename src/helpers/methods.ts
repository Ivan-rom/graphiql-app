import { IVariable, JSONTypes, RequestData, VariablesRequest } from './types';
import { emptyURL, METHODS } from './constants';
import { RequestMethods, Routes } from './enums';

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

export function variableObject(variableArray: IVariable[], object: VariablesRequest) {
  return variableArray.reduce((acc: VariablesRequest, variable) => {
    if (variable.key) {
      acc[variable.key] = transformValue(variable.value);
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

export const formatURL = ({ url, method, body, headers }: RequestData) => {
  const validMethod = METHODS.includes(method) ? method : RequestMethods.GET;
  let requestURL = `/${validMethod}`;
  requestURL += url ? `/${encodeToBase64(url)}` : `/${emptyURL}`;
  requestURL += body ? `/${encodeToBase64(body)}` : '';
  const headersVariables = variablesToQueryParams(headers);
  requestURL += headersVariables ? `/?${headersVariables}` : '';
  return requestURL;
};

export const updateUrl = (lang: string, request: RequestData) => {
  window.history.replaceState(null, '', `/${lang}${Routes.client}${formatURL(request)}`);
};

export const addVariablesHandler = (variablesArray: IVariable[]) => {
  const changedVariables = [...variablesArray];
  const newId = variablesArray[variablesArray.length - 1]?.id + 1 || 1;
  changedVariables.push({ key: '', value: '', id: newId });
  return changedVariables;
};

export const transformValue = (value: string): JSONTypes => {
  if (value === '' || value === undefined) return value;

  if (value === 'null') return null;

  if (!isNaN(+value)) return +value;

  if (value === 'true') return true;
  if (value === 'false') return false;

  try {
    const parsedValue = JSON.parse(value);

    if (Array.isArray(parsedValue)) {
      return JSON.parse(value).map((el: string) => transformValue(el));
    }

    if (typeof parsedValue === 'object') {
      const obj: { [key: string]: JSONTypes } = {};
      Object.keys(parsedValue).map((key) => {
        obj[key] = transformValue(parsedValue[key]);
      });
      return obj;
    }

    return value;
  } catch {
    return value;
  }
};

export function formatGraphQLQuery(query: string): string {
  let indentLevel = 0;
  const indentString = '  ';
  let formattedQuery = '';

  for (let i = 0; i < query.length; i++) {
    const char = query[i];

    switch (char) {
      case '{':
        formattedQuery += ' {\n' + indentString.repeat(++indentLevel);
        break;

      case '}':
        formattedQuery += '\n' + indentString.repeat(--indentLevel) + '}';
        break;

      case ',':
        formattedQuery += ',\n' + indentString.repeat(indentLevel);
        break;

      default:
        formattedQuery += char;
        if (char === ' ' && query[i + 1] === '}') {
          formattedQuery = formattedQuery.slice(0, -1);
        }
        break;
    }
  }

  return formattedQuery;
}

export function compactGraphQLQuery(query: string): string {
  return query
    .replace(/\s+/g, ' ')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*,\s*/g, ',')
    .trim();
}
