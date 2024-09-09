import { useTranslations } from 'next-intl';
import { VariableComponent } from '../VariableComponent/Variable';
import { useDispatch, useSelector } from 'react-redux';
import { setHeaders, updateHeader } from '@/store/features/requestSlice';
import { addVariablesHandler, removeItemFromArray } from '@/helpers/methods';
import { VariableKeys } from '@/helpers/types';
import styles from './headers.module.css';
import sharedStyles from '@/styles/shared.module.css';
import classNames from 'classnames';
import { selectHeaders } from '@/store/features/selectors';

function Headers() {
  const t = useTranslations('Client');

  const dispatch = useDispatch();
  const headers = useSelector(selectHeaders);

  const removeHeaderVariable = (index: number) => {
    dispatch(setHeaders(removeItemFromArray(headers, index)));
  };

  const handleChangeHeaders = (value: string, name: VariableKeys, index: number) => {
    dispatch(updateHeader({ value, name, index }));
  };

  return (
    <div className={styles.headers}>
      <p className={styles.title}>{t('headers')}</p>
      <div className={styles.variablesWrapper}>
        <div className={styles.variables}>
          {headers.map((value, index) => (
            <VariableComponent
              key={value.id}
              variable={value}
              index={index}
              callback={handleChangeHeaders}
              removeCallback={removeHeaderVariable}
            />
          ))}
        </div>
        <button
          className={classNames(sharedStyles.button, styles.button)}
          onClick={() => dispatch(setHeaders(addVariablesHandler(headers)))}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Headers;
