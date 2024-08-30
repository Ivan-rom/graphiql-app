'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from './response.module.css';
import CodeEditor from '../CodeEditor/CodeEditor';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useStatusCodeClassName } from '@/hooks/useStatusCodeClassName';
import { extensions } from './editorExtensions';
import { makeRequest } from '@/services/request';
import Loader from '../Loader/Loader';

const INITIAL_RESPONSE_VALUE = { status: 0, body: '' };

function Response() {
  const t = useTranslations('Client');
  const params = useParams();
  const request = params.request || [];
  const [method, urlBase64, bodyBase64] = request;

  const searchParams = useSearchParams();
  const headers = useMemo(() => {
    const headersObject: { [key: string]: string } = {};
    searchParams.forEach((value, key) => {
      headersObject[key] = value;
    });
    return headersObject;
  }, [searchParams]);

  const [responseObject, setResponseObject] = useState(INITIAL_RESPONSE_VALUE);
  const [isLoading, setIsLoading] = useState(true);
  const codeClassName = useStatusCodeClassName(responseObject.status);

  useEffect(() => {
    makeRequest(urlBase64, bodyBase64, method, headers)
      .then((res) => setResponseObject(res))

      //TODO: show error result to user
      // use toastify for example
      .catch((error) => setResponseObject(error))

      .finally(() => setIsLoading(false));
  }, [bodyBase64, method, urlBase64, headers]);

  return (
    <div className={styles.response}>
      <h3 className={styles.title}>{t('response.title')}</h3>
      <div className={styles.wrapper}>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <div className={styles.status}>
              <span className={styles.statusText}>{t('response.status')}</span>
              <span className={classNames(styles.code, styles[codeClassName])}>
                {responseObject.status}
              </span>
            </div>

            <div className={styles.editorWrapper}>
              <CodeEditor
                className={styles.viewer}
                extensions={extensions}
                value={responseObject.body}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Response;
