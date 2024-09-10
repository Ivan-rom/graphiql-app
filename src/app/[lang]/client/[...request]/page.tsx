'use client';
import { RequestMethods } from '@/helpers/enums';
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { updateUrl } from '@/helpers/methods';
import { useDefaultParams } from '@/hooks/useDefaultParams';
import Response from '@/components/Response/Response';
import { makeRequest } from '@/services/request';
import { RequestData } from '@/helpers/types';
import { useDispatch, useSelector } from 'react-redux';
import { setRequest } from '@/store/features/requestSlice';
import Body from '@/components/Body/Body';
import Endpoint from '@/components/Endpoint/Endpoint';
import Headers from '@/components/Headers/Headers';
import { selectRequest } from '@/store/features/selectors';
import { useParams } from 'next/navigation';

const INITIAL_RESPONSE_VALUE = { status: 0, body: '' };

export default function ClientPage() {
  const dispatch = useDispatch();
  const request = useSelector(selectRequest);

  const { lang } = useParams();
  const { method, url, body, headers } = useDefaultParams();

  const [responseObject, setResponseObject] = useState(INITIAL_RESPONSE_VALUE);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = (request: RequestData) => {
    setIsLoading(true);
    makeRequest(request)
      .then(setResponseObject)

      //TODO: show error result to user
      // use toastify for example
      .catch(setResponseObject)

      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    updateUrl(lang as string, request);
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
