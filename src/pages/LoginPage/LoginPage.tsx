import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../UI/input/Checkbox';
import styles from './LoginPage.module.scss';
import { TLoginButton, TLoginButtonSize } from '../../api/Telegram';
import { authTelegram } from '../../api/api';
import { getCookie } from '../../utils/functions';
import { Navigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [isAccept, setIsAccept] = useState(false);

  const handleAccept = () => {
    setIsAccept(!isAccept);
  };

  const cookie = getCookie('tokenAuth');

  useEffect(() => {
    getCookie('tokenAuth');
  }, [cookie]);

  return (
    <div className={styles.containerLogin}>
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
        isDisable={!isAccept}
      />
      <div className={styles.acceptTerms}>
        <Checkbox onChange={handleAccept} id="terms" />
        <label htmlFor="terms">
          Я принимаю
          <a href="https://blagodarie.org/agreement/index.html">
            Условия Пользования
          </a>
        </label>
      </div>
      {cookie === undefined || cookie === null ? (
        ''
      ) : (
        <Navigate to={'/profile'} />
      )}
    </div>
  );
};
