import styles from './Inputs.module.scss';
import classNames from 'classnames';
import { sizes } from '../../utils/constants';

interface selectTypes {
  label?: string;
  list?: any[];
  size?: string;
}
export const CustomSelect = ({ label, list, size = 'small' }: selectTypes) => {
  return (
    <div className={styles.customSelect}>
      {label !== '' ? <p className={styles.editLabel}>{label}</p> : ''}
      <select
        className={classNames(styles.select, (sizes as any)[size])}
        name="customSelect"
        id="1"
      >
        {list?.map(item => {
          return (
            <option key={item.id} className={styles.option} value={item.value}>
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
