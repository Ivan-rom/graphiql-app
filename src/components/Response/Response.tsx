'use client';

import { decodeUrlBase64 } from '@/helpers/decodeUrlBase64';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import styles from './response.module.css';
import { basicSetup } from 'codemirror';
import { EditorState, Extension } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import CodeEditor from '../CodeEditor/CodeEditor';
import { tags } from '@lezer/highlight';

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
  const [isLoading, setIsLoading] = useState(true);

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

    makeRequest().then((res) => {
      setResponseObject(res);
      setIsLoading(false);
    });
  }, [body, method, url, headers]);

  const theme = HighlightStyle.define([
    { tag: tags.string, color: 'var(--editor-string-color)' },
    { tag: tags.number, color: 'var(--editor-number-color)' },
    { tag: tags.null, color: 'var(--editor-null-color)' },
    { tag: tags.bool, color: 'var(--editor-boolean-color)' },
    { tag: tags.propertyName, color: 'var(--accent-color)' },
  ]);

  const extensions: Extension = [
    basicSetup,
    json(),
    syntaxHighlighting(theme),
    EditorView.lineWrapping,
    EditorState.readOnly.of(true),
  ];

  return (
    <div className={styles.response}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Status: {responseObject.status}</div>
          <CodeEditor extensions={extensions} value={responseObject.body} />
        </>
      )}
    </div>
  );
}

export default Response;
