import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../UI/input/Checkbox';
import styles from './LoginPage.module.scss';
import { TLoginButton, TLoginButtonSize } from '../../api/Telegram';
import { authTelegram } from '../../api/api';

export const LoginPage: React.FC = () => {
  const [isAccept, setIsAccept] = useState(false);

  const handleAccept = () => {
    setIsAccept(!isAccept);
  };

  useEffect(() => {
    if (!isAccept) {
      const buttonTelegram = document?.querySelector(
        '.tgme_widget_login_button',
      );
      buttonTelegram?.setAttribute('disabled', 'true');
    }
    {
      const buttonTelegram = document?.querySelector(
        '.tgme_widget_login_button',
      );
      buttonTelegram?.setAttribute('disabled', 'false');
    }
  }, [isAccept]);

  return (
    <div>
      <h1>Войти</h1>
      <TLoginButton
        botName="blagorodabot"
        buttonSize={TLoginButtonSize.Large}
        lang="ru"
        usePic={false}
        cornerRadius={20}
        onAuthCallback={user => {
          authTelegram(user);
        }}
        requestAccess="write"
      />
      <div className={styles.acceptTerms}>
        <Checkbox onChange={handleAccept} id="terms" />
        <label htmlFor="terms">
          Я принимаю{' '}
          <a href="https://blagodarie.org/agreement/index.html">
            Условия Пользования
          </a>
        </label>
      </div>
    </div>
  );
};
