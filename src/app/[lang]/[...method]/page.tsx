'use client';
import { RequestMethods, Routes } from '@/helpers/enums';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './page.module.css';
import { usePathname, useRouter } from '@/helpers/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { encodeToBase64, headersToQueryParams } from '@/helpers/methods';
import { useTranslations } from 'next-intl';

export default function RestfullClientPage() {
  const tPage = useTranslations('RestfulClient');
  const pathname = usePathname();
  const methodURL = pathname.split('/')[1].toUpperCase();
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [url, setURL] = useState('');
  const [methodValue, setMethod] = useState(methodURL);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');

  useEffect(() => {
    if (!user) {
      router.replace(Routes.signIn);
    }
  }, [router, user]);

  const handleChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value.trim());
  };

  const handleChangeMethod = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
  };

  const handleChangeBody = (event: ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const json = JSON.parse(event.target.value.trim());
      setBody(JSON.stringify(json, null, 4));
    } catch {
      setBody(event.target.value.trim());
    }
  };

  const handleChangeHeaders = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = event.target;
    const changedHeaders = [...headers];
    if (name === 'key' || name === 'value') {
      changedHeaders[index][name] = value;
    }
    setHeaders(changedHeaders);
  };

  const addHeadersHandler = () => {
    const changedHeaders = [...headers];
    changedHeaders.push({ key: '', value: '' });
    setHeaders(changedHeaders);
  };

  const sendRequestHandler = () => {
    let requestURL = `/restful-client/${methodValue}`;
    requestURL += url ? `/${encodeToBase64(url)}` : '';
    requestURL += body ? `/${encodeToBase64(JSON.stringify(body))}` : '';
    requestURL += headersToQueryParams(headers);
    router.replace(`${requestURL}`);
  };

  if (
    methodURL !== null &&
    !Object.values(RequestMethods).includes(methodURL as RequestMethods)
  ) {
    return <h1>Method not found</h1>;
  }

  return (
    <section className={styles.restfill_container}>
      <h1>RESTful client</h1>
      <div className={styles.send_container}>
        <div className={styles.methods_container}>
          <select
            value={methodValue ? methodValue : ''}
            className={styles.select_methods}
            onChange={(event) => handleChangeMethod(event)}
          >
            {Object.values(RequestMethods).map((method) => {
              return (
                <option key={method} value={method}>
                  {method}
                </option>
              );
            })}
            ;
          </select>
          <input
            className={styles.url_input}
            value={url}
            onChange={(event) => handleChangeURL(event)}
            type="text"
            placeholder={tPage('url-placeholder')}
          />
        </div>
        <button
          className={styles.header_button}
          onClick={() => sendRequestHandler()}
        >
          {tPage('send')}
        </button>
      </div>
      <div className={styles.headers_container}>
        <div className={styles.headers_header}>
          <p> {tPage('headers')}:</p>
          <button
            className={styles.header_button}
            onClick={() => addHeadersHandler()}
          >
            {tPage('add-header')}
          </button>
        </div>
        <div className={styles.headers_input}>
          {headers.map((value, index) => {
            return (
              <div key={index}>
                <input
                  name="key"
                  value={value.key}
                  placeholder={tPage('key-placeholder')}
                  onChange={(event) => handleChangeHeaders(event, index)}
                />
                <input
                  name="value"
                  value={value.value}
                  placeholder={tPage('value-placeholder')}
                  onChange={(event) => handleChangeHeaders(event, index)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.body_container}>
        <label htmlFor="input_body">{tPage('body-text')}:</label>
        <textarea
          id="input_body"
          className={styles.input_body}
          value={body}
          onChange={(event) => handleChangeBody(event)}
          inputMode="text"
        />
      </div>
    </section>
  );
}
