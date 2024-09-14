'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { usePathname, useRouter } from '@/helpers/navigation';
import Loader from '@/components/Loader/Loader';
import { useEffect, useState } from 'react';
import { Routes } from '@/helpers/enums';
import styles from './authWrapper.module.css';

type Props = {
  children: React.ReactNode;
};

const protectedUserRoutes = [Routes.history, Routes.client, Routes.graphiQL, Routes.restApi];
const protectedAnonymousRoutes = [Routes.signIn, Routes.signUp];

function AuthWrapper({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, isLoading] = useAuthState(auth);
  // to avoid page render while redirecting
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    setIsRedirecting(false);
  }, [pathname]);

  useEffect(() => {
    if (isLoading) return;

    if (
      (!user && protectedUserRoutes.find((route) => pathname.includes(route))) ||
      (user && protectedAnonymousRoutes.find((route) => pathname.includes(route)))
    ) {
      setIsRedirecting(true);
      router.replace(Routes.home);
    }
  }, [user, router, isLoading, pathname]);

  if (isLoading || isRedirecting) return <Loader className={styles.loader} />;

  return children;
}

export default AuthWrapper;
