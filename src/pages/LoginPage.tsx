import React from 'react';
import { Button } from '../components/button/Button';
import { Checkbox } from '../components/input/Checkbox';
import styles from './LoginPage.module.scss'

export const LoginPage: React.FC = () => {
  const handleLogin = () => {

  }
  const handleAccept = () => {

  }
  return (
    <div>
      <h1 >Войти</h1>
      <Button onClick={handleLogin}>Войти через Telegram</Button>
      <div className={styles.acceptTerms}>
        <Checkbox onChange={handleAccept} >
          Я принимаю <a href="https://blagodarie.org/agreement/index.html">Условия Пользования</a>
        </Checkbox>
      </div>
    </div>
  )
}

