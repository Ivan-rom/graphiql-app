'use client';

import { decodeUrlBase64 } from '@/helpers/decodeUrlBase64';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from './response.module.css';

function Response() {
  const params = useParams();
  const request = params.request || [];
  const [method, urlBase64, bodyBase64] = request;

  const url = decodeUrlBase64(urlBase64);
  const body = decodeUrlBase64(bodyBase64);

  const searchParams = useSearchParams();
  const headers = useMemo(() => {
    const headersObject: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      headersObject[key] = value;
    });
    return headersObject;
  }, [searchParams]);

  const [responseObject, setResponseObject] = useState({ status: 0, body: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const requestOptions: RequestInit = {};
        requestOptions.method = method;
        requestOptions.headers = headers;
        if (method !== 'GET') requestOptions.body = body;

        const response = await fetch(url, requestOptions);
        const res = await response.json();

        const resultObject = {
          status: response.status,
          body: JSON.stringify(res, null, 4),
        };

        return resultObject;
      } catch {
        return { status: 500, body: 'Something went wrong' };
      }
    };

    setIsLoading(true);

    makeRequest().then((res) => {
      setResponseObject(res);
      setIsLoading(false);
    });
  }, [body, method, url, headers]);

  return (
    <div className={styles.response}>
      {isLoading && <div>Loading...</div>}
      <div>Status: {responseObject.status}</div>
      <pre className={styles.code}>{responseObject.body}</pre>
    </div>
  );
}

export default Response;
