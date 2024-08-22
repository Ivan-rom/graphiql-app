'use client';

import { SignInInputsNames } from '@/helpers/enums';
import { object, string } from 'yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../FormField/FormField';
import classNames from 'classnames';
import styles from './signInForm.module.css';
import sharedStyles from '@/shared.module.css';

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

function SignInForm() {
  const t = useTranslations('Form');
  const tSignIn = useTranslations('SignIn');

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
    <div className={styles.page}>
      <h2 className={styles.title}>{tSignIn('title')}</h2>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        {inputs.map(({ name, type }) => (
          <FormField
            key={name}
            name={name}
            type={type}
            label={t(`${name}-label`)}
            error={errors[name]?.message}
            register={register(name)}
          />
        ))}
        <button className={classNames(sharedStyles.button, styles.button)}>
          {tSignIn('submit-text')}
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
