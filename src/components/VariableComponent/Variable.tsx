import { changeVariableType, IVariable, VariableKeys } from '@/helpers/types';
import { useTranslations } from 'next-intl';
import Trash from '../../assets/svg/trash.svg';
import styles from './variable.module.css';
import { FocusEvent, useState } from 'react';

type Props = {
  variable: IVariable;
  index: number;
  callback: changeVariableType;
  removeCallback: (index: number) => void;
};

export function VariableComponent({ variable: { key, value }, index, callback, removeCallback }: Props) {
  const t = useTranslations('Client');

  const [currentKey, setKey] = useState(key);
  const [currentValue, setValue] = useState(value);

  const blurHandler = (e: FocusEvent<HTMLInputElement>) => {
    const targetValue = e.target.value.trim();
    const name = e.target.name as VariableKeys;
    callback(targetValue, name, index);
  };

  return (
    <div className={styles.variable}>
      <input
        name={VariableKeys.key}
        value={currentKey}
        className={styles.key}
        placeholder={t('key-placeholder')}
        onChange={({ target }) => setKey(target.value)}
        onBlur={blurHandler}
      />
      <input
        name={VariableKeys.value}
        value={currentValue}
        className={styles.value}
        placeholder={t('value-placeholder')}
        onChange={({ target }) => setValue(target.value)}
        onBlur={blurHandler}
      />
      <Trash className={styles.trash} onClick={() => removeCallback(index)} />
    </div>
  );
}
