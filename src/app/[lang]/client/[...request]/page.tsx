'use client';
import { RequestMethods, Routes } from '@/helpers/enums';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { formatURL } from '@/helpers/methods';
import { useDefaultParams } from '@/hooks/useDefaultParams';
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

export default function ClientPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const request = useSelector((state) => (state as RootState).request);

  const { lang, method, url, body, headers } = useDefaultParams();

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

  if (!Object.values(RequestMethods).includes(method as RequestMethods)) {
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
    const requestObject = { method: method as RequestMethods, url, headers, body };
    dispatch(setRequest(requestObject));
    sendRequest(requestObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.client}>
        <Endpoint sendHandler={sendRequest} />
        <Body />
        <Headers />
      </div>
      <Response value={responseObject} isLoading={isLoading} />
    </section>
  );
}
