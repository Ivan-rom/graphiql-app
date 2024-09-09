import { useState } from 'react';
import { decodeFromBase64, prettifyingBody } from '../methods';
import { useParams, useSearchParams } from 'next/navigation';
import { DEFAULT_VARIABLE, emptyURL } from '../constants';

export function useDefaultParams() {
  const params = useParams();
  const lang = params.lang;
  const [methodValue, urlBase64, bodyBase64] = params.request;
  const searchParams = useSearchParams();

  const defaultUrl = urlBase64 && urlBase64 !== emptyURL ? decodeFromBase64(urlBase64) : '';

  const headersArray = [{ ...DEFAULT_VARIABLE }];
  for (const [key, value] of searchParams.entries()) {
    headersArray.push({ key, value });
  }

  const [url, setURL] = useState(defaultUrl);
  const [method, setMethod] = useState(methodValue.toUpperCase());
  const [headers, setHeaders] = useState([...headersArray]);
  const [body, setBody] = useState(prettifyingBody(decodeFromBase64(bodyBase64)));

  return {
    lang,
    method,
    setMethod,
    url,
    setURL,
    body,
    setBody,
    headers,
    setHeaders,
  };
}
