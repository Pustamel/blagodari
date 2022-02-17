import React from 'react';
import { Link } from "react-router-dom";

import styles from './Header.module.scss';

interface MenuItem {
  label: string;
  href: string;
  show: boolean;
}

const menuItems: MenuItem[] = [
  {
    href: '/',
    label: 'Главная',
    show: true,
  }, {
    href: '/map',
    label: 'Карта',
    show: true,
  }, {
    href: '/',
    label: 'Багодари.РФ',
    show: true,
  }, {
    href: '/graph',
    label: 'Граф',
    show: true,
  }, {
    href: '/profile',
    label: 'Профиль',
    show: true,
  }, {
    href: '/login',
    label: 'Войти',
    show: true,
  }, {
    href: '/logout',
    label: 'Выйти',
    show: false,
  },
]

export const Header: React.FC = () => {
  return (
    <div className={styles.container}>
      {menuItems.map((item) => {
        if (!item.show) return null
        return <Link className={styles.link} key={item.label} to={item.href}>{item.label}</Link>
      })}
    </div>
  )
}