import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent } from 'react';
import styles from './methodSelector.module.css';

export interface MethodSelector {
  methodValue: string;
  callback: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export function MethodSelector(selector: MethodSelector) {
  const { methodValue, callback } = selector;
  return (
    <select
      value={methodValue ? methodValue : ''}
      className={styles.select_methods}
      onChange={(event) => callback(event)}
    >
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
