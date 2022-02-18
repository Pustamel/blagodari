import React, { useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import { Button } from '../../UI/button/Button';
import { thunkGetProfile } from '../../store/thunks';
import { useAppDispatch } from '../../store/store';

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkGetProfile());
  }, []);

  return (
    <>
      ProfilePage
      <div className={styles.containerFirstBlock}>
        <img src="" alt="" />
        <Button title="Редактировать профиль" onClick={() => ''} />
      </div>
      <div className={styles.containerSecondBlock}>
        <p>name</p>
        <div>
          <div>profecional</div>
          <div>dream</div>
          <div>contacts</div>
        </div>
        <p>gender</p>
        <span>
          <p>date 1</p> <p>date 2</p>
        </span>
        <span>
          <p>father</p>
          <p>mother</p>
        </span>
        <p>location</p>
        <div>map</div>
      </div>
    </>
  );
};
