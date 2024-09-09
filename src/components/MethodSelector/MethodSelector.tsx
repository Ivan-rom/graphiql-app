import { RequestMethods } from '@/helpers/enums';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMethod } from '@/store/features/requestSlice';
import styles from './methodSelector.module.css';
import { selectMethod } from '@/store/features/selectors';

export function MethodSelector() {
  const dispatch = useDispatch();
  const method = useSelector(selectMethod);

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
