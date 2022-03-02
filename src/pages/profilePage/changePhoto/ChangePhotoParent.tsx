import { useAppDispatch } from '../../../store/store';
import styles from './ChangePhoto.module.scss';
import React from 'react';
import { changeParentFields } from '../../../store/Profile';
import { toBase64 } from '../../../utils/functions';
import { thunkChangeFieldParent } from '../../../store/thunks';

export const ChangePhotoParent = ({
  photo,
  parent,
  uuid,
}: {
  photo?: string;
  parent: 'mother' | 'father';
  uuid?: string;
}) => {
  const dispatch = useAppDispatch();

  const onChange = (event: any, typeField: 'mother' | 'father') => {
    if (photo !== undefined && uuid !== undefined) {
      toBase64(event).then(data =>
        dispatch(
          thunkChangeFieldParent({
            field: 'photo',
            data,
            uuid: uuid,
            typeField: parent,
          }),
        ),
      );
    } else {
      toBase64(event).then(data =>
        dispatch(
          changeParentFields({ field: 'photo', typeField: typeField, data }),
        ),
      );
    }
  };

  return (
    <>
      <input
        onChange={event => onChange(event, parent)}
        type="file"
        id="photoParent"
        className={styles.inputFile}
      />
      <label className={styles.labelPhotoParent} htmlFor="photoParent">
        <img
          className={styles.parentAvatar}
          src={
            photo !== '' && photo !== undefined
              ? photo
              : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
          }
          alt=""
        />
        <p>Изменить фото</p>
      </label>
    </>
  );
};
