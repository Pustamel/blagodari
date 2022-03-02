import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../UI/input/Checkbox';
import styles from './LoginPage.module.scss';
import { TLoginButton, TLoginButtonSize } from '../../api/Telegram';
import { authTelegram } from '../../api/api';
import { delete_cookie, getCookie } from '../../utils/functions';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAuth } from '../../store/Profile';
import { Button } from '../../UI/button/Button';

export const LoginPage: React.FC = () => {
  const [isAccept, setIsAccept] = useState(false);
  const state = useAppSelector(state => state.MainReducer);
  const dispatch = useAppDispatch();

  const handleAccept = () => {
    setIsAccept(!isAccept);
  };

  useEffect(() => {
    if (
      getCookie('tokenAuth') !== undefined &&
      getCookie('tokenAuth') !== null
    ) {
      dispatch(setAuth(true));
    } else {
      dispatch(setAuth(false));
    }
  }, [state.auth]);

  return (
    <div className={styles.containerLogin}>
      <TLoginButton
        botName="blagorodabot"
        buttonSize={TLoginButtonSize.Large}
        lang="ru"
        usePic={false}
        cornerRadius={20}
        onAuthCallback={user => {
          authTelegram(user).then(() => dispatch(setAuth(true)));
        }}
        requestAccess="write"
        isDisable={!isAccept}
      />
      <Button
        title="Войти в другой аккаунт"
        onClick={() => delete_cookie('stel_token')}
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
      {/* eslint-disable @typescript-eslint/strict-boolean-expressions */}
      {state.auth ? <Navigate to={'/profile'} /> : ''}
    </div>
  );
};
