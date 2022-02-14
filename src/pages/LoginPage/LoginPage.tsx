import React, { useState, useEffect }  from 'react';
import { Button } from '../../components/button/Button';
import { Checkbox } from '../../components/input/Checkbox';
import styles from './LoginPage.module.scss'
import { TLoginButton, TLoginButtonSize } from "../../api/Telegram"
import {authTelegram} from "../../api/api"

export const LoginPage: React.FC = () => {
    const [isAccept, setIsAccept] = useState(false)

  const handleLogin = () => {

  }

  const handleAccept = () => {
      setIsAccept(!isAccept)
  }

  return (
    <div>
      <h1>Войти</h1>
        <TLoginButton
            botName="blagodarie_dev_bot"
            buttonSize={TLoginButtonSize.Large}
            lang="ru"
            usePic={false}
            cornerRadius={20}
            onAuthCallback={(user) => {
                authTelegram(user)
                document.cookie = `name=${user.first_name}`
                document.cookie = `id=${user.id}`
                document.cookie = `photo=${user.photo_url}`
                document.cookie = `hash=${user.hash}`
            }}
            requestAccess="write"
        />
      <div className={styles.acceptTerms}>
        <Checkbox onChange={handleAccept} id="terms" />
          <label htmlFor="terms">
              Я принимаю <a href="https://blagodarie.org/agreement/index.html">Условия Пользования</a>
          </label>
      </div>

    </div>
  )
}

