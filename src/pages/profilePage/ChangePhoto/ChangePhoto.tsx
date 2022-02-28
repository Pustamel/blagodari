import styles from './ChangePhoto.module.scss';
import camera from '../../../assets/icons/camera.svg';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { thunkChangeProfile, thunkGetProfile } from '../../../store/thunks';
import { toBase64 } from '../../../utils/functions';

export const ChangePhoto = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.MainReducer.profile);

  const onChange = (event: any) => {
    toBase64(event)
      .then(data => dispatch(thunkChangeProfile({ field: 'photo', data })))
      .then(() => dispatch(thunkGetProfile()));
  };

  return (
    <>
      <input
        onChange={onChange}
        type="file"
        id="photo"
        className={styles.inputFile}
      />
      <label className={styles.labelPhoto} htmlFor="photo">
        <span>
          Сменить фото
          <img className={styles.camera} src={camera} alt="" />
        </span>
        <div className={styles.containerAvatar}>
          <img
            className={styles.avatar}
            src={
              state.photo !== ''
                ? state.photo
                : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
            }
            alt=""
          />
        </div>
      </label>
    </>
  );
};
