import { RequestMethods } from '@/helpers/enums';
import { RequestData } from '@/helpers/types';

const DEFAULT_GRAPHQL_HEADERS = {
  'Content-Type': 'application/json',
};

const RESPONSE_ERRORS = {
  defaultError: { status: 512, body: 'Something went wrong' },
  badUrl: { status: 513, body: 'Endpoint url is not filled' },
  fetchError: { status: 514, body: 'Failed to fetch' },
  badMethod: { status: 515, body: 'Incorrect Method selected' },
};

export const makeRequest = async ({ url, body, method, headers }: RequestData) => {
  const decodedOptions = { url: '', body: '' };
  const requestOptions: RequestInit = {};

  const headersObject: { [key: string]: string } = {};
  headers.forEach(({ value, key }) => {
    if (key && value) headersObject[key] = value;
  });

  if (!(method in RequestMethods)) throw RESPONSE_ERRORS.badMethod;

  if (!url) throw RESPONSE_ERRORS.badUrl;

  decodedOptions.url = url;
  decodedOptions.body = body;

  if (method === RequestMethods.GRAPHQL) {
    requestOptions.method = RequestMethods.POST;
    requestOptions.headers = {
      ...DEFAULT_GRAPHQL_HEADERS,
      ...headersObject,
    };
    requestOptions.body = decodedOptions.body;
  } else {
    requestOptions.method = method;
    requestOptions.headers = headersObject;

    if (method !== RequestMethods.GET) {
      requestOptions.body = decodedOptions.body;
    }
  }

  let response;

  try {
    response = await fetch(decodedOptions.url, requestOptions);
  } catch {
    throw RESPONSE_ERRORS.fetchError;
  }

  const resultObject = {
    status: response.status,
    body: '',
  };
  try {
    if (response.ok) resultObject.body = JSON.stringify(await response.json(), null, 2);

    return resultObject;
  } catch {
    throw resultObject;
  }
};
