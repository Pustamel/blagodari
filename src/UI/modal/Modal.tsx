import { ReactChildren } from 'react';
import styles from './Modal.module.scss';

interface modalProps {
  children: ReactChildren;
}

export const Modal = ({ children }: modalProps) => {
  return <div className={styles.modal}>{children}</div>;
};
