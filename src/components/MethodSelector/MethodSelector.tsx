import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent } from 'react';
import styles from './methodSelector.module.css';

type Props = {
  method: string;
  callback: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export function MethodSelector({ method, callback }: Props) {
  return (
    <select value={method ? method : ''} className={styles.select_methods} onChange={callback}>
      {Object.values(RequestMethods).map((method) => {
        return (
          <option key={method} className={styles.method_option} value={method}>
            {method}
          </option>
        );
      })}
      ;
    </select>
  );
}
