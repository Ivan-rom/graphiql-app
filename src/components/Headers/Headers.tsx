import { useTranslations } from 'next-intl';
import { VariableComponent } from '../VariableComponent/Variable';
import styles from './headers.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setHeaders, updateHeader } from '@/store/features/requestSlice';
import { addVariablesHandler, removeItemFromArray } from '@/helpers/methods';
import { VariableKeys } from '@/helpers/types';

function Headers() {
  const t = useTranslations('RestfulClient');

  const dispatch = useDispatch();
  const { headers } = useSelector((state) => (state as RootState).request);

  const removeHeaderVariable = (index: number) => {
    dispatch(setHeaders(removeItemFromArray(headers, index)));
  };

  const handleChangeHeaders = (value: string, name: VariableKeys, index: number) => {
    dispatch(updateHeader({ value, name, index }));
  };

  return (
    <div className={styles.headers_container}>
      <div className={styles.headers_header}>
        <p>{t('headers')}:</p>
        <button className={styles.header_button} onClick={() => dispatch(setHeaders(addVariablesHandler(headers)))}>
          {t('add-header')}
        </button>
      </div>
      <div className={styles.headers_input}>
        {headers.map((value, index) => {
          return (
            <VariableComponent
              key={index}
              variable={value}
              index={index}
              callback={handleChangeHeaders}
              removeCallback={removeHeaderVariable}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Headers;
