import { decodeUrlBase64 } from '@/helpers/decodeUrlBase64';
import { RequestMethods } from '@/helpers/enums';

type Headers = { [key: string]: string };

const DEFAULT_GRAPHQL_HEADERS = {
  'Content-Type': 'application/json',
};

const RESPONSE_ERRORS = {
  defaultError: { status: 500, body: 'Something went wrong' },
  badUrl: { status: 501, body: 'Wrong encoded url endpoint' },
  badBody: { status: 502, body: 'Wrong encoded body' },
  badMethod: { status: 503, body: 'Incorrect Method selected' },
};

export const makeRequest = async (
  urlBase64: string,
  bodyBase64: string,
  method: string,
  headers: Headers,
) => {
  const decodedOptions = { url: '', body: '' };
  const requestOptions: RequestInit = {};

  if (!(method in RequestMethods)) throw RESPONSE_ERRORS.badMethod;

  try {
    const url = decodeUrlBase64(urlBase64);
    decodedOptions.url = url;
  } catch {
    throw RESPONSE_ERRORS.badUrl;
  }

  try {
    const body = decodeUrlBase64(bodyBase64);
    decodedOptions.body = body;
  } catch {
    throw RESPONSE_ERRORS.badBody;
  }

  try {
    if (method === RequestMethods.GRAPHQL) {
      requestOptions.method = RequestMethods.POST;
      requestOptions.headers = {
        ...DEFAULT_GRAPHQL_HEADERS,
        ...headers,
      };
      requestOptions.body = decodedOptions.body;
    } else {
      requestOptions.method = method;
      requestOptions.headers = headers;

      if (method !== RequestMethods.GET) {
        requestOptions.body = decodedOptions.body;
      }
    }

    const response = await fetch(decodedOptions.url, requestOptions);
    const res = await response.json();

    const resultObject = {
      status: response.status,
      body: JSON.stringify(res, null, 2),
    };

    return resultObject;
  } catch {
    throw RESPONSE_ERRORS.defaultError;
  }
};
