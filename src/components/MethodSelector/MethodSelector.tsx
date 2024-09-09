import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMethod } from '@/store/features/requestSlice';
import { RootState } from '@/store/store';
import styles from './methodSelector.module.css';

export function MethodSelector() {
  const dispatch = useDispatch();
  const { method } = useSelector((state) => (state as RootState).request);

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setMethod(event.target.value));
  };

  return (
    <select value={method ? method : ''} className={styles.methods} onChange={changeHandler}>
      {Object.values(RequestMethods).map((method) => {
        return (
          <option key={method} value={method}>
            {method}
          </option>
        );
      })}
    </select>
  );
}
