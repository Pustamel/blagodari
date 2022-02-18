import burger from '../../assets/icons/burger.svg';
import cross from '../../assets/icons/cross.svg';
import { ReactNode, useState } from 'react';
import styles from './Header.module.scss';

interface mobileHeaderType {
  children: ReactNode;
}

export const MobileHeader = ({ children }: mobileHeaderType) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.containerMobileHeader}>
      {!isOpen && (
        <div className={styles.burger}>
          <img onClick={() => setIsOpen(true)} src={burger} alt="" />
        </div>
      )}

      {isOpen ? (
        <>
          <div className={styles.shadow} />
          <div className={styles.mobileNavigation}>
            <div className={styles.cross}>
              <img src={cross} onClick={() => setIsOpen(false)} alt="" />
            </div>
            <div className={styles.mobileList}>{isOpen && children}</div>
          </div>
        </>
      ) : null}
    </div>
  );
};
