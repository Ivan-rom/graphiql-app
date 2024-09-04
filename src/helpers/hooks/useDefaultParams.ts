import { useEffect, useState } from 'react';
import { decodeFromBase64, prettifyingBody } from '../methods';
import { useParams, useSearchParams } from 'next/navigation';
import { DEFAULT_VARIABLE, emptyURL } from '../constants';

export function useDefaultParams() {
  const params = useParams();
  const lang = params.lang;
  const [methodValue, urlBase64, bodyBase64] = params.request;
  const searchParams = useSearchParams();
  const [url, setURL] = useState('');
  const [method, setMethod] = useState(methodValue.toUpperCase());
  const [headers, setHeaders] = useState([{ ...DEFAULT_VARIABLE }]);
  const [body, setBody] = useState('');

  useEffect(() => {
    if (urlBase64 && urlBase64 !== emptyURL) {
      setURL(decodeFromBase64(urlBase64));
    }
    if (bodyBase64) {
      const bodyString = decodeFromBase64(bodyBase64);
      prettifyingBody(bodyString, setBody);
    }
    const headersArray = [];
    for (const [key, value] of searchParams.entries()) {
      headersArray.push({ key: key, value: value });
    }
    setHeaders([...headersArray, DEFAULT_VARIABLE]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
