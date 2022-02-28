import React from 'react';
import styles from './Modal.module.scss';

interface modalProps {
  children: React.ReactNode;
}

export const Modal = ({ children }: modalProps) => {
  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>{children}</div>;
    </div>
  );
};
