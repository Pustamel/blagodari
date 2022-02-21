import React from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  onClick?: () => void;
  title: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {title}
    </button>
  );
};
