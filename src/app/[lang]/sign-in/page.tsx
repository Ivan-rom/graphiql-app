'use client';

import { useTranslations } from 'next-intl';
import FormField from '@/components/FormField/FormField';
import { object, string } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignInInputsNames } from '@/helpers/enums';
import classNames from 'classnames';
import styles from './page.module.css';
import sharedStyles from '@/shared.module.css';
import Link from 'next/link';

type FormData = {
  [SignInInputsNames.email]: string;
  [SignInInputsNames.password]: string;
};

const inputs: { name: SignInInputsNames; type: string }[] = [
  {
    name: SignInInputsNames.email,
    type: 'email',
  },
  {
    name: SignInInputsNames.password,
    type: 'password',
  },
];

function SignInPage() {
  const t = useTranslations('Form');
  const tPage = useTranslations('SignIn');

  const schema = object({
    email: string().required(t('field-required')).email(t('email-valid')),
    password: string()
      .required(t('field-required'))
      .min(8, t('password-length'))
      .matches(/[A-Za-z]/, t('password-letter'))
      .matches(/[0-9]/, t('password-digit'))
      .matches(/[!@#$%^&*]/, t('password-spec-char')),
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
          <Link href="sign-up" className={sharedStyles.link}>
            {tPage('link')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
