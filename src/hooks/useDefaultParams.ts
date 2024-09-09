import { decodeFromBase64, prettifyingBody } from '../helpers/methods';
import { useParams, useSearchParams } from 'next/navigation';
import { DEFAULT_VARIABLE, emptyURL } from '../helpers/constants';

export function useDefaultParams() {
  const params = useParams();
  const lang = params.lang;
  const [method, urlBase64, bodyBase64] = params.request;
  const searchParams = useSearchParams();

  const headers = [];
  let id = 1;
  for (const [key, value] of searchParams.entries()) {
    headers.push({ key, value, id });
    id++;
  }

  const emptyHeader = headers.find(
    (header) => header.key === DEFAULT_VARIABLE.key && header.value === DEFAULT_VARIABLE.value,
  );

  if (!emptyHeader) {
    headers.unshift(DEFAULT_VARIABLE);
  }

  const url = urlBase64 && urlBase64 !== emptyURL ? decodeFromBase64(urlBase64) : '';
  const body = prettifyingBody(decodeFromBase64(bodyBase64));

  return {
    lang,
    method,
    url,
    body,
    headers,
  };
}
