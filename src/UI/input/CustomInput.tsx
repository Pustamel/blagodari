import styles from './Inputs.module.scss';
import classNames from 'classnames';
import { sizes } from '../../utils/constants';

interface CustomInputTypes {
  label?: string;
  placeholder?: string;
  size?: string;
  withSettings?: boolean;
  defaultValue?: string;
  onChange?: (event: any) => void;
}

export const CustomInput = ({
  label = '',
  placeholder,
  size = 'small',
  withSettings,
  defaultValue,
  onChange,
}: CustomInputTypes) => {
  return (
    <div className={styles.customInput}>
      {label !== '' ? <p className={styles.editLabel}>{label}</p> : ''}
      <input
        onChange={onChange}
        defaultValue={defaultValue}
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
