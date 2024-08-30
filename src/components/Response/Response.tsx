'use client';

import { decodeUrlBase64 } from '@/helpers/decodeUrlBase64';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from './response.module.css';
import CodeEditor from '../CodeEditor/CodeEditor';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useStatusCodeClassName } from '@/hooks/useStatusCodeClassName';
import { extensions } from './editorExtensions';

function Response() {
  const t = useTranslations('Client');
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
  const [isLoading, setIsLoading] = useState(true);
  const statusCodeClassName = useStatusCodeClassName(responseObject.status);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const requestOptions: RequestInit = {};
        if (method === 'GRAPHQL') {
          requestOptions.method = 'POST';
          requestOptions.headers = {
            'Content-Type': 'application/json',
            ...headers,
          };
          requestOptions.body = body;
        } else {
          requestOptions.method = method;
          requestOptions.headers = headers;
          if (method !== 'GET') requestOptions.body = body;
        }
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

    makeRequest().then((res) => {
      setResponseObject(res);
      setIsLoading(false);
    });
  }, [body, method, url, headers]);

  return (
    <div className={styles.response}>
      <h3>{t('response.title')}: </h3>
      {isLoading ? (
        <div>{t('loading')}...</div>
      ) : (
        <>
          <div className={styles.status}>
            {t('response.status')}:{' '}
            <span
              className={classNames(
                styles.statusCode,
                styles[statusCodeClassName],
              )}
            >
              {responseObject.status}
            </span>
          </div>
          <CodeEditor
            className={styles.code}
            extensions={extensions}
            value={responseObject.body}
          />
        </>
      )}
    </div>
  );
}

export default Response;
