import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  name: string;
  type: string;
  label: string;
  error?: string;
  register: UseFormRegisterReturn;
};

function FormField({ name, type, label, error, register }: Props) {
  return (
    <div key={name}>
      <div>{error}</div>
      <label htmlFor={name}>{label}:</label>
      <input {...register} type={type} name={name} id={name} />
    </div>
  );
}

export default FormField;
