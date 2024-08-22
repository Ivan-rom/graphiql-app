'use client';

import { SignUpInputsNames } from '@/helpers/enums';
import { object, ref, string } from 'yup';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '../FormField/FormField';

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

function SignUpForm() {
  const t = useTranslations('Form');
  const tSignUp = useTranslations('SignUp');

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
    <>
      <h2>{tSignUp('title')}</h2>
      <form onSubmit={handleSubmit(submitHandler)}>
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
        <button>{tSignUp('submit-text')}</button>
      </form>
    </>
  );
}

export default SignUpForm;
