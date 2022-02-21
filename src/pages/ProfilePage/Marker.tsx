import styles from './ProfilePage.module.scss';
import React from 'react';

interface propsMarker {
  lat?: number;
  lng?: number;
  src?: string;
}

export const Marker = ({ lat, lng, src }: propsMarker) => {
  return (
    <div className={styles.marker}>
      <img
        src={
          src !== ''
            ? src
            : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
        }
        alt={`${lat}` + `${lng}`}
      />
    </div>
  );
};
