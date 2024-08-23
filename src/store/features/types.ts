export type HeadersRequest = {
  [key: string]: string;
};

export interface RequestData {
  url: string;
  method: RequestMethods;
  body: string;
  header: HeadersRequest;
}

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}
