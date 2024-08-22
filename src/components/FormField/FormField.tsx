import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './formField.module.css';

type Props = {
  name: string;
  type: string;
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
};

function FormField({ name, type, label, error, register }: Props) {
  return (
    <div className={styles.formField}>
      <label htmlFor={name} className={styles.label}>
        {label}
        <div className={styles.error}>{error}</div>
      </label>
      <input
        {...register}
        type={type}
        name={name}
        id={name}
        className={styles.input}
      />
    </div>
  );
}

export default FormField;
