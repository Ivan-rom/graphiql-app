import { describe, it, expect } from 'vitest';
import {
  encodeToBase64,
  decodeFromBase64,
  variableObject,
  variablesToString,
  prettifyingBody,
  removeItemFromArray,
  handleChangeVariables,
  formatGraphQLQuery,
  compactGraphQLQuery,
} from './methods';

describe('Base64 encoding and decoding', () => {
  it('encodes string to Base64', () => {
    const result = encodeToBase64('Hello World');
    expect(result).toBe('SGVsbG8gV29ybGQ=');
  });

  it('decodes Base64 string', () => {
    const result = decodeFromBase64('SGVsbG8gV29ybGQ=');
    expect(result).toBe('Hello World');
  });
});

describe('variableObject', () => {
  it('converts array of variables into an object', () => {
    const variables = [{ id: 0, key: 'key1', value: 'value1' }];
    const result = variableObject(variables, {});
    expect(result).toEqual({ key1: 'value1' });
  });
});

describe('variablesToString', () => {
  it('converts array of variables into string array', () => {
    const variables = [
      { id: 1, key: 'key1', value: 'value1' },
      { id: 2, key: 'key2', value: 'value2' },
    ];
    const result = variablesToString(variables);
    expect(result).toEqual(['key1=value1', 'key2=value2']);
  });
});

describe('variablesToString', () => {
  it('converts array of variables into string array', () => {
    const variables = [
      { id: 3, key: 'key1', value: 'value1' },
      { id: 4, key: 'key2', value: 'value2' },
    ];
    const result = variablesToString(variables);
    expect(result).toEqual(['key1=value1', 'key2=value2']);
  });
});

describe('prettifyingBody', () => {
  it('formats valid JSON string', () => {
    const jsonString = '{"key":"value"}';
    const result = prettifyingBody(jsonString);
    expect(result).toBe('{\n  "key": "value"\n}');
  });

  it('returns original string if not valid JSON', () => {
    const invalidJsonString = 'invalid json';
    const result = prettifyingBody(invalidJsonString);
    expect(result).toBe(invalidJsonString);
  });
});

describe('removeItemFromArray', () => {
  it('removes item from array by index', () => {
    const array = [
      { id: 1, key: 'key1', value: 'value1' },
      { id: 2, key: 'key2', value: 'value2' },
      { id: 3, key: 'key3', value: 'value3' },
    ];
    const result = removeItemFromArray(array, 1);
    expect(result).toEqual([
      { id: 1, key: 'key1', value: 'value1' },
      { id: 3, key: 'key3', value: 'value3' },
    ]);
  });
});

describe('handleChangeVariables', () => {
  it('updates variable key or value', () => {
    const variables = [{ id: 5, key: 'key1', value: 'value1' }];
    const result = handleChangeVariables('newKey', 'key', 0, variables);
    expect(result[0].key).toBe('newKey');
  });
});

describe('GraphQL query formatting', () => {
  it('formats GraphQL query', () => {
    const query = '{ field1, field2 }';
    const result = formatGraphQLQuery(query);
    expect(result).toBe(` {\n   field1,\n   field2\n}`);
  });

  it('compacts GraphQL query', () => {
    const query = `{
      field1,
      field2
    }`;
    const result = compactGraphQLQuery(query);
    expect(result).toBe('{field1,field2}');
  });
});
