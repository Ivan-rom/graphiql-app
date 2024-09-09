import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent } from 'react';
import styles from './methodSelector.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setMethod } from '@/store/features/requestSlice';
import { RootState } from '@/store/store';

export function MethodSelector() {
  const dispatch = useDispatch();
  const { method } = useSelector((state) => (state as RootState).request);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMethod(event.target.value));
  };

  return (
    <select value={method ? method : ''} className={styles.select_methods} onChange={changeHandler}>
      {Object.values(RequestMethods).map((method) => {
        return (
          <option key={method} className={styles.method_option} value={method}>
            {method}
          </option>
        );
      })}
    </select>
  );
}
