import { emptyURL } from '@/helpers/constants';
import { RequestMethods } from '@/helpers/enums';

type Headers = { key: string; value: string }[];

const DEFAULT_GRAPHQL_HEADERS = {
  'Content-Type': 'application/json',
};

const RESPONSE_ERRORS = {
  defaultError: { status: 500, body: 'Something went wrong' },
  badUrl: { status: 501, body: 'Endpoint url is not filled' },
  badMethod: { status: 503, body: 'Incorrect Method selected' },
};

export const makeRequest = async (url: string, body: string, method: string, headers: Headers) => {
  const decodedOptions = { url: '', body: '' };
  const requestOptions: RequestInit = {};

  const headersObject: { [key: string]: string } = {};
  headers.forEach(({ value, key }) => {
    if (key && value) headersObject[key] = value;
  });

  if (!(method in RequestMethods)) throw RESPONSE_ERRORS.badMethod;

  if (!url || url === emptyURL) throw RESPONSE_ERRORS.badUrl;

  decodedOptions.url = url;
  decodedOptions.body = body;

  try {
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
