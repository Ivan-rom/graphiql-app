'use client';

import { useTranslations } from 'next-intl';
import FormField from '@/components/FormField/FormField';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Routes, SignInInputsNames } from '@/helpers/enums';
import classNames from 'classnames';
import styles from './page.module.css';
import sharedStyles from '@/styles/shared.module.css';
import { useSignInSchema } from '@/hooks/useSignInSchema';
import { useAuthState, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { Link, useRouter } from '@/helpers/navigation';

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
  const schema = useSignInSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [signIn] = useSignInWithEmailAndPassword(auth);

  if (user) {
    router.replace(Routes.home);
  }

  const submitHandler = async (data: FormData) => {
    try {
      await signIn(data[SignInInputsNames.email], data[SignInInputsNames.password]);
      // TODO: push result to Redux
      router.replace('/');
    } catch {
      // TODO: Show error result to user
      // use toastify for example
    }
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
          <button className={classNames(sharedStyles.button, styles.button)}>{tPage('submit-text')}</button>
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
