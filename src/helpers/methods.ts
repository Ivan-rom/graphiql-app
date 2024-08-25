import { HeadersRequest } from './types';

export function encodeToBase64(text: string) {
  const encoder = new TextEncoder();
  const utf8Array = encoder.encode(text);
  return btoa(String.fromCharCode(...utf8Array));
}

export function headersToQueryParams(headers: HeadersRequest[]) {
  const queryParamsArray = headers
    .map((header) => {
      if (header.key && header.value) {
        return `${header.key}=${header.value}`;
      }
    })
    .filter((value) => value !== undefined);
  const queryParamsString = queryParamsArray.join('&');
  return queryParamsString ? `/?${queryParamsString}` : '';
}
