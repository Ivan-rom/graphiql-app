'use client';

import { auth } from '@/firebase/config';
import { useRouter } from '@/helpers/navigation';
import { signOut } from 'firebase/auth';
import sharedStyles from '@/styles/shared.module.css';
import { Routes } from '@/helpers/enums';

function LogoutButton() {
  const router = useRouter();

  const clickHandler = async () => {
    signOut(auth);
    router.replace(Routes.home);
  };

  return (
    <button onClick={clickHandler} className={sharedStyles.button}>
      Logout
    </button>
  );
}

export default LogoutButton;
