import React from 'react';

import styles from './Header.module.scss';

interface MenuItem {
  label: string;
  href: string;
  show: boolean;
}

const menuItems:MenuItem[] = [
  {
    href: '/',
    label: 'Главная',
    show: true,
  },  {
    href: '/graph',
    label: 'Граф',
    show: true,
  },  {
    href: '/map',
    label: 'Карта',
    show: true,
  },  {
    href: '/profile',
    label: 'Профиль',
    show: true,
  },  {
    href: '/login',
    label: 'Войти',
    show: true,
  },
  {
    href: '/logout',
    label: 'Выйти',
    show: false,
  },
]

export const Header:React.FC = ()=>{
  return <div className={styles.container}>
    {menuItems.map((item)=> {
      if (!item.show) return null
      return <a href={item.href}>{item.label}</a>
    })}
  </div>
}