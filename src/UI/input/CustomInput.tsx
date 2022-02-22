import styles from './Inputs.module.scss';

interface CustomInputTypes {
  label?: string;
  placeholder?: string;
}

export const CustomInput = ({ label, placeholder }: CustomInputTypes) => {
  return (
    <>
      {label !== '' ? <p className={styles.editLabel}>{label}</p> : ''}
      <input className={styles.editInput} placeholder={placeholder} />
    </>
  );
};
