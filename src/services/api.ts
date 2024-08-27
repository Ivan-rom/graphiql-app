import { HeadersRequest } from '@/helpers/types';

export interface IOptions {
  method: string;
  headers: HeadersRequest;
  body: string;
}

export const setOptions = (
  method: string,
  body: string,
  headers: HeadersRequest,
) => {
  return {
    method: method,
    headers: headers,
    body: body,
  };
};

export async function getData(url: string, options: IOptions) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch {
    throw new Error('Fetch failed');
  }
}
