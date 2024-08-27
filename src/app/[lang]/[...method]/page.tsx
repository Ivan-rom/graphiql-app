'use client';
import { RequestMethods, Routes } from '@/helpers/enums';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './page.module.css';
import { usePathname, useRouter } from '@/helpers/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import {
  addVariablesHandler,
  decodeFromBase64,
  formatURL,
  handleChangeVariables,
  prettifyingBody,
  removeItemFromArray,
  variableObject,
} from '@/helpers/methods';
import { useTranslations } from 'next-intl';
import { getData, setOptions } from '@/services/api';
import { useSearchParams } from 'next/navigation';
import { VariableComponent } from '@/components/VariableComponent/Variable';
import { MethodSelector } from '@/components/MethodSelector/MethodSelector';

export default function RestfullClientPage() {
  const tPage = useTranslations('RestfulClient');
  const [path, setPath] = useState('');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const methodURL = pathname.split('/')[1].toUpperCase();
  const router = useRouter();
  const lang = path.split('/')[1];
  const [user] = useAuthState(auth);
  const [url, setURL] = useState('');
  const [methodValue, setMethod] = useState(methodURL);
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [bodyVariable, setBodyVariable] = useState([{ key: '', value: '' }]);
  const [response, setResponse] = useState('');
  const [variableBodyVisible, setVariableBodyVisible] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace(Routes.signIn);
    }
  }, [router, user]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPath(window.location.pathname);
    }
    const pathnameArray = pathname.split('/');
    if (pathnameArray[2]) {
      setURL(decodeFromBase64(pathnameArray[2]));
    }
    if (pathnameArray[3]) {
      const bodyString = decodeFromBase64(pathnameArray[3])
        .replace(/\\n/g, '')
        .replace(/\\"/g, '"')
        .replace(/^"|"$/g, '');
      prettifyingBody(bodyString, setBody);
    }
    const headersArray = [];
    for (const [key, value] of searchParams.entries()) {
      headersArray.push({ key: key, value: value });
    }
    setHeaders(
      headersArray.length !== 0 ? headersArray : [{ key: '', value: '' }],
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value.trim());
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(event.target.value.trim(), methodValue, body, bodyVariable, headers, variableBodyVisible)}`,
    );
  };

  const handleChangeMethod = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(url, event.target.value, body, bodyVariable, headers, variableBodyVisible)}`,
    );
  };

  const removeHeaderVariable = (index: number) => {
    const changedHeaders = removeItemFromArray(headers, index);
    setHeaders(changedHeaders);
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(url, methodValue, body, bodyVariable, changedHeaders, variableBodyVisible)}`,
    );
  };

  const bodyOnBlurHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(url, methodValue, event.target.value.trim(), bodyVariable, headers, variableBodyVisible)}`,
    );
  };

  const handleChangeHeaders = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const changedVariables = handleChangeVariables(event, index, headers);
    setHeaders(changedVariables);
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(url, methodValue, body, bodyVariable, changedVariables, variableBodyVisible)}`,
    );
  };

  const handleChangeBodyVariables = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const changedVariables = handleChangeVariables(event, index, bodyVariable);
    setBodyVariable(changedVariables);
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(url, methodValue, body, changedVariables, headers, variableBodyVisible)}`,
    );
  };

  const removeBodyVariable = (index: number) => {
    const changedVariables = removeItemFromArray(bodyVariable, index);
    setBodyVariable(changedVariables);
    window.history.replaceState(
      null,
      '',
      `/${lang}${formatURL(url, methodValue, body, changedVariables, headers, variableBodyVisible)}`,
    );
  };

  const sendRequestHandler = async () => {
    try {
      const data = await getData(
        url,
        setOptions(methodValue, body, variableObject(headers, {})),
      );
      setResponse(JSON.stringify(data, null, 2));
    } catch {
      setResponse('Error');
    }
    router.replace(
      formatURL(
        url,
        methodValue,
        body,
        bodyVariable,
        headers,
        variableBodyVisible,
      ),
    );
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
          <MethodSelector
            methodValue={methodValue}
            callback={handleChangeMethod}
          />
          <input
            className={styles.url_input}
            value={url}
            onChange={(event) => handleChangeURL(event)}
            type="text"
            placeholder={tPage('url-placeholder')}
          />
        </div>
        <button
          className={styles.send_button}
          onClick={() => sendRequestHandler()}
          disabled={url ? false : true}
        >
          {tPage('send')}
        </button>
      </div>
      <div className={styles.headers_container}>
        <div className={styles.headers_header}>
          <p> {tPage('headers')}:</p>
          <button
            className={styles.header_button}
            onClick={() => addVariablesHandler(headers, setHeaders)}
          >
            {tPage('add-header')}
          </button>
        </div>
        <div className={styles.headers_input}>
          {headers.map((value, index) => {
            return (
              <VariableComponent
                key={index}
                variable={value}
                index={index}
                callback={handleChangeHeaders}
                removeCallback={removeHeaderVariable}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.body_container}>
        <label htmlFor="input_body">
          {!variableBodyVisible ? tPage('body-text') : tPage('body-variables')}:
        </label>
        <div className={styles.body_container_title}>
          <button
            className={styles.header_button}
            onClick={() => setVariableBodyVisible((visible) => !visible)}
          >
            {!variableBodyVisible
              ? tPage('show-variables')
              : tPage('hide-variables')}
          </button>
          <button
            className={`${styles.header_button} ${!variableBodyVisible ? `${styles.hidden}` : ''}`}
            onClick={() => addVariablesHandler(bodyVariable, setBodyVariable)}
          >
            {tPage('add-variable')}
          </button>
        </div>
        <textarea
          id="input_body"
          className={`${styles.input_body} ${variableBodyVisible ? `${styles.hidden}` : ''}`}
          value={body}
          onChange={(event) =>
            prettifyingBody(event.target.value.trim(), setBody)
          }
          onBlur={bodyOnBlurHandler}
          inputMode="text"
        />
        <div
          className={`body_variable_container ${!variableBodyVisible ? `${styles.hidden}` : ''}`}
        >
          <div className={styles.headers_input}>
            {bodyVariable.map((value, index) => {
              return (
                <VariableComponent
                  key={index}
                  variable={value}
                  index={index}
                  callback={handleChangeBodyVariables}
                  removeCallback={removeBodyVariable}
                />
              );
            })}
          </div>
        </div>
      </div>
      <textarea
        id="response_section"
        className={styles.input_body}
        value={response}
        inputMode="text"
        readOnly
      />
    </section>
  );
}
