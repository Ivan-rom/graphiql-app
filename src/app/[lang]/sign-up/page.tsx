'use client';

import { SignUpInputsNames } from '@/helpers/enums';
import { object, ref, string } from 'yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/FormField/FormField';
import classNames from 'classnames';
import sharedStyles from '@/shared.module.css';
import styles from './page.module.css';
import Link from 'next/link';

type FormData = {
  [SignUpInputsNames.name]: string;
  [SignUpInputsNames.email]: string;
  [SignUpInputsNames.password]: string;
  [SignUpInputsNames.confirmPassword]: string;
};

const inputs: { name: SignUpInputsNames; type: string }[] = [
  {
    name: SignUpInputsNames.name,
    type: 'text',
  },
  {
    name: SignUpInputsNames.email,
    type: 'email',
  },
  {
    name: SignUpInputsNames.password,
    type: 'password',
  },
  {
    name: SignUpInputsNames.confirmPassword,
    type: 'password',
  },
];

function SignUpPage() {
  const t = useTranslations('Form');
  const tPage = useTranslations('SignUp');

  const schema = object({
    name: string().required(t('field-required')),
    email: string().required(t('field-required')).email(t('email-valid')),
    password: string()
      .required(t('field-required'))
      .min(8, t('password-length'))
      .matches(/[A-Za-z]/, t('password-letter'))
      .matches(/[0-9]/, t('password-digit'))
      .matches(/[!@#$%^&*]/, t('password-spec-char')),
    confirmPassword: string()
      .required(t('field-required'))
      .oneOf([ref('password')], t('passwords-match')),
  }).required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const submitHandler = () => {};

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>{tPage('title')}</h2>
        <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
          {inputs.map(({ name, type }) => (
            <FormField
              key={name}
              name={name}
              type={type}
              label={t(`${name}-label`)}
              placeholder={t(`${name}-placeholder`)}
              error={errors[name]?.message}
              register={register(name)}
            />
          ))}
          <button className={classNames(sharedStyles.button, styles.button)}>
            {tPage('submit-text')}
          </button>
        </form>
        <div className={styles.hint}>
          <span>{tPage('hint')}</span>
          <Link href="sign-in" className={sharedStyles.link}>
            {tPage('link')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
