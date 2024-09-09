'use client';
import { RequestMethods, Routes } from '@/helpers/enums';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from './page.module.css';
import {
  addVariablesHandler,
  formatURL,
  handleChangeVariables,
  prettifyingBody,
  removeItemFromArray,
  variableObject,
} from '@/helpers/methods';
import { useTranslations } from 'next-intl';
import { VariableComponent } from '@/components/VariableComponent/Variable';
import { MethodSelector } from '@/components/MethodSelector/MethodSelector';
import { DEFAULT_VARIABLE } from '@/helpers/constants';
import { useDefaultParams } from '@/helpers/hooks/useDefaultParams';
import { useRouter } from '@/helpers/navigation';
import Response from '@/components/Response/Response';
import { makeRequest } from '@/services/request';
import { IVariable, RequestData, VariableKeys } from '@/helpers/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setBody, setHeaders, setMethod, setRequest, setURL, updateHeader } from '@/store/features/requestSlice';
import CodeEditor from '@/components/CodeEditor/CodeEditor';
import { extensions } from './editorExtensions';

const INITIAL_RESPONSE_VALUE = { status: 0, body: '' };

export default function RestfullClientPage() {
  const tPage = useTranslations('RestfulClient');
  const router = useRouter();
  const dispatch = useDispatch();
  const request = useSelector((state) => (state as RootState).request);
  const { method, headers, body, url } = request;

  const { lang, defaultMethod, defaultUrl, defaultBody, defaultHeaders } = useDefaultParams();

  const [bodyVariable, setBodyVariable] = useState<IVariable[]>([{ ...DEFAULT_VARIABLE }]);
  const [currentBody, setCurrentBody] = useState(defaultBody);
  const [variableBodyVisible, setVariableBodyVisible] = useState(false);
  const [responseObject, setResponseObject] = useState(INITIAL_RESPONSE_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCurrentBody(body);
  }, [body]);

  useEffect(() => {
    try {
      const obj = JSON.parse(currentBody);

      const result = Object.keys(obj).map((key, index) => {
        const value = typeof obj[key] === 'string' ? obj[key] : JSON.stringify(obj[key]);
        return { key, value, id: index };
      });

      setBodyVariable(result);
    } catch {
      setBodyVariable([{ ...DEFAULT_VARIABLE }]);
    }
  }, [currentBody]);

  const handleChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setURL(event.target.value.trim()));
  };

  const handleChangeMethod = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMethod(event.target.value));
  };

  const removeHeaderVariable = (index: number) => {
    dispatch(setHeaders(removeItemFromArray(headers, index)));
  };

  useEffect(() => {});

  const bodyOnBlurHandler = (value: string) => {
    dispatch(setBody(value));
  };

  const handleChangeHeaders = (value: string, name: VariableKeys, index: number) => {
    dispatch(updateHeader({ value, name, index }));
  };

  const handleChangeBodyVariables = (value: string, name: string, index: number) => {
    updateBodyVariableState(handleChangeVariables(value, name, index, bodyVariable));
  };

  const removeBodyVariable = (index: number) => {
    updateBodyVariableState(removeItemFromArray(bodyVariable, index));
  };

  const updateBodyVariableState = (variables: IVariable[]) => {
    setBodyVariable(variables);
    const newBody = JSON.stringify(variableObject(variables, {}));
    setCurrentBody(newBody);
    dispatch(setBody(newBody));
  };

  const sendRequestHandler = () => {
    sendRequest(request);
  };

  const sendRequest = ({ url, body, method, headers }: RequestData) => {
    setIsLoading(true);
    makeRequest({ url, body, method, headers })
      .then((res) => setResponseObject(res))

      //TODO: show error result to user
      // use toastify for example
      .catch((error) => setResponseObject(error))

      .finally(() => setIsLoading(false));
  };

  if (!Object.values(RequestMethods).includes(defaultMethod.toUpperCase() as RequestMethods)) {
    router.replace(RequestMethods.GET);
  }

  useEffect(() => {
    window.history.replaceState(
      null,
      '',
      `/${lang}${Routes.client}${formatURL(request.url, request.method, request.body, request.headers)}`,
    );
  }, [request, lang]);

  useEffect(() => {
    const requestObject = {
      method: defaultMethod as RequestMethods,
      url: defaultUrl,
      headers: defaultHeaders,
      body: defaultBody,
    };
    dispatch(setRequest(requestObject));
    sendRequest(requestObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.restfill_container}>
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
            <button className={styles.header_button} onClick={() => dispatch(setHeaders(addVariablesHandler(headers)))}>
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
              onClick={() => setBodyVariable(addVariablesHandler(bodyVariable))}
            >
              {tPage('add-variable')}
            </button>
          </div>
          <CodeEditor
            className={`${styles.input_body} ${variableBodyVisible ? `${styles.hidden}` : ''}`}
            extensions={extensions}
            value={prettifyingBody(body)}
            blurHandler={bodyOnBlurHandler}
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
      </div>
      <Response value={responseObject} isLoading={isLoading} />
    </section>
  );
}
