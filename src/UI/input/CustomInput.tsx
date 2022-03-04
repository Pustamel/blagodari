import styles from './Inputs.module.scss'
import classNames from 'classnames'
import { sizes } from '../../utils/constants'

interface CustomInputTypes {
  label?: string
  placeholder?: string
  size?: string
  withSettings?: boolean
  defaultValue?: string
  onChange?: (event: any) => void
  className?: string
}

export const CustomInput = ({
  label = '',
  placeholder,
  size = 'small',
  withSettings,
  defaultValue,
  onChange,
  className,
}: CustomInputTypes) => {
  return (
    <div className={classNames(styles.customInput, className)}>
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
  )
}
