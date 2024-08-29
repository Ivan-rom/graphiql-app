import { Routes } from '@/helpers/enums';

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
