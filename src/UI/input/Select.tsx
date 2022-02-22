import styles from './Inputs.module.scss';

interface selectTypes {
  label?: string;
  list?: any[]
}
export const CustomSelect = ({ label, list }: selectTypes) => {
  return (
    <>
      {label !== '' ? <p className={styles.editLabel}>{label}</p> : ''}
      <select className={styles.select} name="customSelect" id="1">
        {list?.map((item) => {
         return <option key={item.id} className={styles.option} value={item.value}>{item.value}</option>
        })}
      </select>
    </>
  );
};
