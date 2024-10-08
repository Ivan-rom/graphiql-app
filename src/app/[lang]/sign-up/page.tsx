'use client';

import { Routes, SignUpInputsNames } from '@/helpers/enums';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FormField from '@/components/FormField/FormField';
import sharedStyles from '@/styles/shared.module.css';
import styles from './page.module.css';
import { useSignUpSchema } from '@/hooks/useSignUpSchema';
import { Link, useRouter } from '@/helpers/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { AuthError, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import LoadingButton from '@/components/LoadingButton/LoadingButton';

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
  const tError = useTranslations('FirebaseErrors');

  const schema = useSignUpSchema();
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
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data[SignUpInputsNames.email],
        data[SignUpInputsNames.password],
      );

      await updateProfile(user, {
        displayName: data[SignUpInputsNames.name],
      });

      toast.success(tPage('success'));
      router.replace(Routes.home);
    } catch (e) {
      toast(tError((e as AuthError).code));
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
          <LoadingButton isLoading={isLoading} className={styles.button}>
            {tPage('submit-text')}
          </LoadingButton>
        </form>
        <div className={styles.hint}>
          <span>{tPage('hint')}</span>
          <Link href={Routes.signIn} className={sharedStyles.link}>
            {tPage('link')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
