import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Header.module.scss'
import {
  delete_cookie,
  getCookie,
  useWindowDimensions,
} from '../../utils/functions'
import { Button } from '../../UI/button/Button'
import { MobileHeader } from './MobileHeader'

export const Header: React.FC = () => {
  const cookie = getCookie('tokenAuth')
  const [isAuth, setIsAuth] = useState(Boolean(cookie))
  const [isOpenMobileHeader, setIsOpenMobileHeader] = useState(false)

  const logout = () => {
    delete_cookie('tokenAuth')
    delete_cookie('uuid')
    delete_cookie('stel_token')
    setIsAuth(Boolean(getCookie('tokenAuth')))
  }

  const authButton = () => {
    if (isAuth) {
      return <Button onClick={logout} title="Выход" />
    } else {
      return (
        <Link to="/login">
          <Button title="Вход" onClick={() => setIsOpenMobileHeader(false)} />
        </Link>
      )
    }
  }

  const { width } = useWindowDimensions()

  const closeNavMobile = () => {
    setIsOpenMobileHeader(false)
  }
  /*eslint @typescript-eslint/no-empty-function: 0*/
  useEffect(() => {}, [getCookie('tokenAuth'), isAuth])

  return (
    <div className={styles.container}>
      {width > 780 ? (
        <>
          <Link className={styles.link} to="/">
            Главная
          </Link>
          <Link className={styles.link} to="/map">
            Карта
          </Link>
          <h1>БлагоДари.РФ</h1>
          <Link className={styles.link} to="/graph">
            Граф
          </Link>
          <Link className={styles.link} to={`/profile/${getCookie('uuid')}`}>
            Профиль
          </Link>
          {authButton()}
        </>
      ) : (
        <MobileHeader
          setIsOpen={setIsOpenMobileHeader}
          isOpen={isOpenMobileHeader}
        >
          <Link onClick={closeNavMobile} className={styles.link} to="/">
            Главная
          </Link>
          <Link onClick={closeNavMobile} className={styles.link} to="/map">
            Карта
          </Link>
          <Link onClick={closeNavMobile} className={styles.link} to="/graph">
            Граф
          </Link>
          <Link
            onClick={closeNavMobile}
            className={styles.link}
            to={`/profile/${getCookie('uuid')}`}
          >
            Профиль
          </Link>
          {authButton()}
        </MobileHeader>
      )}
    </div>
  )
}
