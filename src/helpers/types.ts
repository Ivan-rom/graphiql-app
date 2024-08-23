import { RequestMethods } from "@/helpers/enums";

export type HeadersRequest = {
  [key: string]: string;
};

export interface RequestData {
  url: string;
  method: RequestMethods;
  body: string;
  header: HeadersRequest;
}
