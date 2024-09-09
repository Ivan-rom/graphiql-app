import { useTranslations } from 'next-intl';
import { VariableComponent } from '../VariableComponent/Variable';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setHeaders, updateHeader } from '@/store/features/requestSlice';
import { addVariablesHandler, removeItemFromArray } from '@/helpers/methods';
import { VariableKeys } from '@/helpers/types';
import styles from './headers.module.css';
import sharedStyles from '@/styles/shared.module.css';

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
    <div className={styles.headers}>
      <div className={styles.header}>
        <p>{t('headers')}:</p>
        <button className={sharedStyles.button} onClick={() => dispatch(setHeaders(addVariablesHandler(headers)))}>
          {t('add-header')}
        </button>
      </div>
      <div className={styles.variables}>
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
