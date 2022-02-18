import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: () => void;
  title: string;
}

export const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {title}
    </button>
  );
};
