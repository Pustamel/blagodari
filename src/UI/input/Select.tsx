import styles from './Inputs.module.scss';
import classNames from 'classnames';
import { sizes } from '../../utils/constants';

interface selectTypes {
  label?: string;
  list?: listType[];
  size?: string;
  onSelect: (event: any, field: string) => void;
  field?: string;
}

interface listType {
  value: string;
  id: string | number;
  text: string;
}
export const CustomSelect = ({
  label,
  list,
  size = 'small',
  onSelect,
  field = '',
}: selectTypes) => {

  return (
    <div className={styles.customSelect}>
      {label !== '' ? <p className={styles.editLabel}>{label}</p> : ''}
      <select
        className={classNames(styles.select, (sizes as any)[size])}
        name="customSelect"
        id="1"
        onSelect={event => onSelect(event, field)}
        onChange={event => onSelect(event, field)}
      >
        {list?.map(item => {
          return (
            <option key={item.id} className={styles.option} value={item.value}>
              {item.text}
            </option>
          );
        })}
      </select>
    </div>
  );
};
