import { decodeFromBase64, prettifyingBody } from '../methods';
import { useParams, useSearchParams } from 'next/navigation';
import { DEFAULT_VARIABLE, emptyURL } from '../constants';

export function useDefaultParams() {
  const params = useParams();
  const lang = params.lang;
  const [defaultMethodValue, defaultUrlBase64, defaultBodyBase64] = params.request;
  const searchParams = useSearchParams();

  const defaultHeaders = [];
  let id = 1;
  for (const [key, value] of searchParams.entries()) {
    defaultHeaders.push({ key, value, id });
    id++;
  }

  const emptyHeader = defaultHeaders.find(
    (header) => header.key === DEFAULT_VARIABLE.key && header.value === DEFAULT_VARIABLE.value,
  );

  if (!emptyHeader) {
    defaultHeaders.unshift(DEFAULT_VARIABLE);
  }

  const defaultUrl = defaultUrlBase64 && defaultUrlBase64 !== emptyURL ? decodeFromBase64(defaultUrlBase64) : '';
  const defaultMethod = defaultMethodValue;
  const defaultBody = prettifyingBody(decodeFromBase64(defaultBodyBase64));

  return {
    lang,
    defaultMethod,
    defaultUrl,
    defaultBody,
    defaultHeaders,
  };
}
