'use client';
import { RequestMethods, Routes } from '@/helpers/enums';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { formatURL } from '@/helpers/methods';
import { useDefaultParams } from '@/helpers/hooks/useDefaultParams';
import { useRouter } from '@/helpers/navigation';
import Response from '@/components/Response/Response';
import { makeRequest } from '@/services/request';
import { RequestData } from '@/helpers/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setRequest } from '@/store/features/requestSlice';
import Body from '@/components/Body/Body';
import Endpoint from '@/components/Endpoint/Endpoint';
import Headers from '@/components/Headers/Headers';

const INITIAL_RESPONSE_VALUE = { status: 0, body: '' };

export default function RestfullClientPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const request = useSelector((state) => (state as RootState).request);

  const { lang, defaultMethod, defaultUrl, defaultBody, defaultHeaders } = useDefaultParams();

  const [responseObject, setResponseObject] = useState(INITIAL_RESPONSE_VALUE);
  const [isLoading, setIsLoading] = useState(false);

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
        <Endpoint sendHandler={sendRequest} />
        <Headers />
        <Body />
      </div>
      <Response value={responseObject} isLoading={isLoading} />
    </section>
  );
}
