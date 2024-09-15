import { HTMLAttributes } from 'react';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';
import Loader from '../Loader/Loader';
import styles from './loadingButton.module.css';

type Props = Partial<HTMLAttributes<HTMLButtonElement>> & {
  isLoading: boolean;
  disabled?: boolean;
};

function LoadingButton({ className, isLoading, children, disabled, ...props }: Props) {
  return (
    <button
      className={classNames(sharedStyles.button, styles.loadingButton, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader className={styles.loader} /> : children}
    </button>
  );
}

export default LoadingButton;
