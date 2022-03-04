import React from 'react'
import styles from './Modal.module.scss'
import cross from '../../assets/icons/cross.svg'

interface modalProps {
  children: React.ReactNode
  closeModal(): void
}

export const Modal = ({ children, closeModal }: modalProps) => {
  return (
    <div className={styles.containerModal}>
      <div className={styles.modal}>
        <div className={styles.cross}>
          <img onClick={closeModal} src={cross} alt="" />
        </div>
        {children}
      </div>
    </div>
  )
}
