import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick(): void;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  );
};
