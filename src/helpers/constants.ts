import { Routes } from '@/helpers/enums';
import { RequestMethods } from './enums';

export const locales = ['en', 'ru'];

export const mainLinks = [
  { href: Routes.restApi, label: 'mainLinks.restApi' },
  { href: Routes.graphiQL, label: 'mainLinks.graphiQL' },
  { href: Routes.history, label: 'mainLinks.history' },
];

export const authLinks = [
  { href: Routes.signUp, label: 'authLinks.signUp' },
  { href: Routes.signIn, label: 'authLinks.signIn' },
];

export const DEFAULT_VARIABLE = { key: '', value: '', id: 0 };

export const emptyURL = 'emptyURL';

export const METHODS = Object.values(RequestMethods);
