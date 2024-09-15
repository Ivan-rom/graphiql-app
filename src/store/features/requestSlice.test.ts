import { describe, expect, it } from 'vitest';
import reducer, {
  addHeader,
  initialState,
  setBody,
  setHeaders,
  setMethod,
  setRequest,
  setURL,
  updateHeader,
} from './requestSlice';
import { RequestMethods } from '@/helpers/enums';
import { IVariable, VariableKeys } from '@/helpers/types';
import { DEFAULT_VARIABLE } from '@/helpers/constants';

describe('test request scice', () => {
  it('should set url', () => {
    expect(reducer(initialState, setURL('test'))).toEqual({
      ...initialState,
      url: 'test',
    });
  });

  it('should set method', () => {
    expect(reducer(initialState, setMethod(RequestMethods.GET))).toEqual({
      ...initialState,
      method: RequestMethods.GET,
    });
  });

  it('should set body', () => {
    expect(reducer(initialState, setBody('test'))).toEqual({
      ...initialState,
      body: 'test',
    });
  });

  it('should set headers', () => {
    const headers: IVariable[] = [{ key: 'testKey', value: 'testValue', id: 0 }];
    expect(reducer(initialState, setHeaders(headers))).toEqual({
      ...initialState,
      headers,
    });
  });

  it('should update headers', () => {
    const initialHeaders: IVariable[] = [
      { key: 'testKey', value: 'testValue', id: 0 },
      { key: 'testKey2', value: 'testValue2', id: 1 },
    ];
    const header = { name: VariableKeys.key, value: 'updateTestValue', index: 0 };
    const expectedHeaders = [
      { key: 'updateTestValue', value: 'testValue', id: 0 },
      { key: 'testKey2', value: 'testValue2', id: 1 },
    ];
    expect(reducer({ ...initialState, headers: initialHeaders }, updateHeader(header))).toEqual({
      ...initialState,
      headers: expectedHeaders,
    });
  });

  it('should add header', () => {
    const expectedHeaders = [{ ...DEFAULT_VARIABLE }, { ...DEFAULT_VARIABLE, id: 1 }];
    expect(reducer(initialState, addHeader())).toEqual({
      ...initialState,
      headers: expectedHeaders,
    });
  });

  it('should setRequest', () => {
    const request = {
      url: 'testURL',
      method: RequestMethods.GET,
      headers: [{ ...DEFAULT_VARIABLE }],
      body: 'testBody',
    };
    expect(reducer(initialState, setRequest(request))).toEqual({
      ...request,
    });
  });
});
