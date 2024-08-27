import { changeVariableType, IVariable } from '@/helpers/types';
import { useTranslations } from 'next-intl';
import Trash from '../../assets/svg/trash.svg';
import styles from './variable.module.css';

interface VariableProps {
  variable: IVariable;
  index: number;
  callback: changeVariableType;
  removeCallback: (index: number) => void;
}

export function VariableComponent(value: VariableProps) {
  const tPage = useTranslations('RestfulClient');
  const { variable, index, callback, removeCallback } = value;
  return (
    <div key={index} className={styles.variable_item}>
      <input
        name="key"
        value={variable.key}
        placeholder={tPage('key-placeholder')}
        onChange={(event) => callback(event, index)}
      />
      <input
        name="value"
        value={variable.value}
        placeholder={tPage('value-placeholder')}
        onChange={(event) => callback(event, index)}
      />
      <Trash className={styles.trash} onClick={() => removeCallback(index)} />
    </div>
  );
}
