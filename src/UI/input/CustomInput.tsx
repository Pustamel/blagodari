import styles from './Inputs.module.scss';
import classNames from 'classnames';
import { sizes } from '../../utils/constants';
import points from '../../assets/icons/points.svg';

interface CustomInputTypes {
  label?: string;
  placeholder?: string;
  size?: string;
  withSettings?: boolean;
}

export const CustomInput = ({
  label = '',
  placeholder,
  size = 'small',
  withSettings,
}: CustomInputTypes) => {
  return (
    <div className={styles.customInput}>
      {label !== '' ? <p className={styles.editLabel}>{label}</p> : ''}
      <input
        readOnly={Boolean(withSettings)}
        className={classNames(
          styles.editInput,
          (sizes as any)[size],
          Boolean(withSettings) && styles.withSettings,
        )}
        placeholder={placeholder}
      />
    </div>
  );
};
