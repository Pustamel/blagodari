import React, { useEffect } from "react"
import styles from './ProfilePage.module.scss';
import { Button } from '../../UI/button/Button';
import { thunkGetProfile } from '../../store/thunks';
import { useAppDispatch } from '../../store/store';
import GoogleMapReact from 'google-map-react';
import { Marker } from "./Marker"

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(thunkGetProfile());
  }, []);

const defaultPropsMap = {
    center: {
      lat: 53.95,
      lng: 30.33
    },
    zoom: 11
  };

  const handleApiLoaded = (map:any) => {
    console.log(map)
  }
  return (
    <div className={styles.containerProfilePage}>
      <div className={styles.containerFirstBlock}>
        <img src="" alt="" />
        <Button title="Редактировать профиль" onClick={() => ''} />
      </div>

      <div className={styles.containerSecondBlock}>
        <p>Ирина Чекунова Алексеевна</p>

        <div className={styles.containerInformationBlocks}>
          <div className={styles.infoBlock}>
            <p>Возможности</p>
            <p>list</p>
          </div>
          <div className={styles.infoBlock}>
            <p>Потребности</p>
            <p>list</p>
          </div>
          <div className={styles.infoBlock}>
            <p>contacts</p>
            <p>list</p>
          </div>
        </div>

        <p>Пол: <span>Женский</span></p>
        <span>
          <p>Дата рождения: <span>12.12.2000</span></p>
          <p>Дата смерти: <span>12.12.2000</span></p>
        </span>
        <span>
          <p>Отец: <span>Алексей</span></p>
          <p>Мать: <span>Ирина</span></p>
        </span>
        <p>Местоположение: <span>Россия, Москва, ул. Рыба 57</span></p>
        <div>
          <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyC3u8u23ct68CEAxVm984B5h2lyFmJgH64&region=RU&language=ru" }}
              defaultCenter={defaultPropsMap.center}
              defaultZoom={defaultPropsMap.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map)}
            >
              <Marker
                lat={53.955413}
                lng={30.337844}
              />
            </GoogleMapReact>
          </div>

        </div>
      </div>

    </div>
  );
};
