import { useTranslations } from 'next-intl';
import { object, string } from 'yup';

export function useSignInSchema() {
  const t = useTranslations('Form');

  return object({
    email: string().required(t('field-required')).email(t('email-valid')),
    password: string()
      .required(t('field-required'))
      .min(8, t('password-length'))
      .matches(/[A-Za-z]/, t('password-letter'))
      .matches(/[0-9]/, t('password-digit'))
      .matches(/[!@#$%^&*]/, t('password-spec-char')),
  }).required();
}
