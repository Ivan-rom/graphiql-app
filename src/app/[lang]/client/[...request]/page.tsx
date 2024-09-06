'use client';
import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './page.module.css';
import {
  addVariablesHandler,
  formatURL,
  handleChangeVariables,
  prettifyingBody,
  removeItemFromArray,
} from '@/helpers/methods';
import { useTranslations } from 'next-intl';
import { VariableComponent } from '@/components/VariableComponent/Variable';
import { MethodSelector } from '@/components/MethodSelector/MethodSelector';
import { clientPath, DEFAULT_VARIABLE } from '@/helpers/constants';
import { useDefaultParams } from '@/helpers/hooks/useDefaultParams';
import { useRouter } from '@/helpers/navigation';
import Response from '@/components/Response/Response';
import { makeRequest } from '@/services/request';

const INITIAL_RESPONSE_VALUE = { status: 0, body: '' };

export default function RestfullClientPage() {
  const tPage = useTranslations('RestfulClient');
  const router = useRouter();
  const { lang, method, setMethod, url, setURL, body, setBody, headers, setHeaders } = useDefaultParams();
  const [bodyVariable, setBodyVariable] = useState([{ ...DEFAULT_VARIABLE }]);
  const [variableBodyVisible, setVariableBodyVisible] = useState(false);
  const [responseObject, setResponseObject] = useState(INITIAL_RESPONSE_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value.trim());
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(event.target.value.trim(), method, body, bodyVariable, headers, variableBodyVisible)}`,
    );
  };

  const handleChangeMethod = (event: ChangeEvent<HTMLSelectElement>) => {
    setMethod(event.target.value);
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(url, event.target.value, body, bodyVariable, headers, variableBodyVisible)}`,
    );
  };

  const removeHeaderVariable = (index: number) => {
    const changedHeaders = removeItemFromArray(headers, index);
    setHeaders(changedHeaders);
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(url, method, body, bodyVariable, changedHeaders, variableBodyVisible)}`,
    );
  };

  const bodyOnBlurHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(url, method, event.target.value.trim(), bodyVariable, headers, variableBodyVisible)}`,
    );
  };

  const handleChangeHeaders = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const changedVariables = handleChangeVariables(event, index, headers);
    setHeaders(changedVariables);
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(url, method, body, bodyVariable, changedVariables, variableBodyVisible)}`,
    );
  };

  const handleChangeBodyVariables = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const changedVariables = handleChangeVariables(event, index, bodyVariable);
    setBodyVariable(changedVariables);
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(url, method, body, changedVariables, headers, variableBodyVisible)}`,
    );
  };

  const removeBodyVariable = (index: number) => {
    const changedVariables = removeItemFromArray(bodyVariable, index);
    setBodyVariable(changedVariables);
    window.history.replaceState(
      null,
      '',
      `/${lang}/${clientPath}${formatURL(url, method, body, changedVariables, headers, variableBodyVisible)}`,
    );
  };

  const sendRequestHandler = async () => {
    setIsLoading(true);
    makeRequest(url, body, method, headers)
      .then((res) => setResponseObject(res))

      //TODO: show error result to user
      // use toastify for example
      .catch((error) => setResponseObject(error))

      .finally(() => setIsLoading(false));
  };

  if (!Object.values(RequestMethods).includes(method.toUpperCase() as RequestMethods)) {
    router.replace(RequestMethods.GET);
  }

  useEffect(() => {
    sendRequestHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.restfill_container}>
      <h1>RESTful</h1>
      <div className={styles.send_container}>
        <div className={styles.methods_container}>
          <MethodSelector method={method} callback={handleChangeMethod} />
          <input
            className={styles.url_input}
            value={url}
            onChange={handleChangeURL}
            type="text"
            placeholder={tPage('url-placeholder')}
          />
        </div>
        <button className={styles.send_button} onClick={sendRequestHandler} disabled={url ? false : true}>
          {tPage('send')}
        </button>
      </div>
      <div className={styles.headers_container}>
        <div className={styles.headers_header}>
          <p> {tPage('headers')}:</p>
          <button className={styles.header_button} onClick={() => addVariablesHandler(headers, setHeaders)}>
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
        <label htmlFor="input_body">{tPage(variableBodyVisible ? 'body-variables' : 'body-text')}</label>
        <div className={styles.body_container_title}>
          <button className={styles.header_button} onClick={() => setVariableBodyVisible((visible) => !visible)}>
            {tPage(variableBodyVisible ? 'hide-variables' : 'show-variables')}
          </button>
          <button
            className={`${styles.header_button} ${variableBodyVisible ? '' : `${styles.hidden}`}`}
            onClick={() => addVariablesHandler(bodyVariable, setBodyVariable)}
          >
            {tPage('add-variable')}
          </button>
        </div>
        <textarea
          id="input_body"
          className={`${styles.input_body} ${variableBodyVisible ? `${styles.hidden}` : ''}`}
          value={body}
          onChange={(event) => setBody(prettifyingBody(event.target.value.trim()))}
          onBlur={bodyOnBlurHandler}
          inputMode="text"
        />
        <div className={`body_variable_container ${!variableBodyVisible ? `${styles.hidden}` : ''}`}>
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
      <Response value={responseObject} isLoading={isLoading} />
    </section>
  );
}
