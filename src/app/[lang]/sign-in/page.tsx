'use client';

import { useTranslations } from 'next-intl';
import FormField from '@/components/FormField/FormField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Routes, SignInInputsNames } from '@/helpers/enums';
import styles from './page.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useSignInSchema } from '@/hooks/useSignInSchema';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { Link, useRouter } from '@/helpers/navigation';
import { toast } from 'react-toastify';
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

type FormData = {
  [SignInInputsNames.email]: string;
  [SignInInputsNames.password]: string;
};

const inputs = [
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
  const tError = useTranslations('FirebaseErrors');

  const schema = useSignInSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) router.replace(Routes.home);
  }, [user, router]);

  const submitHandler = async (data: FormData) => {
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data[SignInInputsNames.email], data[SignInInputsNames.password]);

      toast.success(tPage('success'));
      router.replace(Routes.home);
    } catch (e) {
      const error = e as AuthError;

      toast(tError(error.code) || error.code);
    }

    setIsLoading(false);
  };

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
          <LoadingButton className={styles.button} isLoading={isLoading}>
            {tPage('submit-text')}
          </LoadingButton>
        </form>
        <div className={styles.hint}>
          <span>{tPage('hint')}</span>
          <Link href={Routes.signUp} className={sharedStyles.link}>
            {tPage('link')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
