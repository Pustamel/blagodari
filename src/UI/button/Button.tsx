import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface ButtonProps {
  onClick?: () => void
  title: string
  className?: string
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(styles.button, className)}
    >
      {title}
    </button>
  )
}
