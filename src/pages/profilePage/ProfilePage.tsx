import React, { useEffect, useState } from 'react';
import styles from './ProfilePage.module.scss';
import { Button } from '../../UI/button/Button';
import { thunkGetProfile } from '../../store/thunks';
import { useAppDispatch, useAppSelector } from '../../store/store';
import GoogleMapReact from 'google-map-react';
import { Marker } from './Marker';
import classNames from 'classnames';
import { useWindowDimensions } from '../../utils/functions';
import { Link } from "react-router-dom"

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.MainReducer.profile);
  const [widthMap, setWidthMap] = useState<string>('50%');

  useEffect(() => {
    dispatch(thunkGetProfile());
  }, []);

  const center = {
    lat: 53.95,
    lng: 30.33,
  };

  const getCenter = () => {
    if (state.location) {
      if (
        state.location.latitude !== null &&
        state.location.longitude !== null
      ) {
        center.lat = state.location.latitude;
        center.lng = state.location.longitude;
      }
    }
  };

  useEffect(() => {
    getCenter();
  }, []);

  const defaultPropsMap = {
    center: center,
    zoom: 11,
  };

  const { width } = useWindowDimensions();

  const informationLayout = (
    <>
      <p>
        Пол:{' '}
        <span className={styles.lightText}>
          {state.gender === 'm' ? 'мужчина' : 'женщина'}
        </span>
      </p>
      <span>
        <p>
          Дата рождения:
          <span className={styles.lightText}>
            {state.dob === null ? '―' : state.dob}
          </span>
        </p>
        <p>
          Дата смерти:
          <span className={styles.lightText}>
            {state.dod === null ? '―' : state.dod}
          </span>
        </p>
      </span>
      <span>
        <p>
          Отец:{' '}
          <span className={styles.lightText}>
            {state.father?.first_name} {state.father?.last_name}{' '}
            {state.father?.middle_name}
          </span>
        </p>
        <p>
          Мать:{' '}
          <span className={styles.lightText}>
            {state.mother?.first_name} {state.mother?.last_name}{' '}
            {state.mother?.middle_name}
          </span>
        </p>
      </span>
    </>
  );

  useEffect(() => {
    if (width <= 1100) {
      setWidthMap('100%');
    } else if (width < 1200) {
      setWidthMap('90%');
    }
  }, [width]);

  return (
    <div className={styles.containerProfilePage}>
      <div className={styles.containerFirstBlock}>
        <img
          src={
            state.photo !== ''
              ? state.photo
              : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'
          }
          alt=""
        />
        {width < 640 && <div>{informationLayout}</div>}
        <Link to={'/editProfile'}>
          <Button
            className={styles.btn}
            title="Редактировать профиль"
            onClick={() => ''}
          />
        </Link>
      </div>

      <div className={styles.containerSecondBlock}>
        <p className={styles.name}>
          {state.first_name} {state.last_name} {state.middle_name}
        </p>

        <div className={styles.containerInformationBlocks}>
          <div className={styles.infoBlock}>
            <p>Возможности</p>
            <ul className={classNames(styles.lightText, styles.cardList)}>
              {state.abilities.map(item => {
                return <li key={item.uuid}>{item.text}</li>;
              })}
            </ul>
          </div>
          <div className={styles.infoBlock}>
            <p>Потребности</p>
            <ul className={classNames(styles.lightText, styles.cardList)}>
              {state.wishes.map(item => {
                return <li key={item.uuid}>{item.text}</li>;
              })}
            </ul>
          </div>
          <div className={styles.infoBlock}>
            <p>Контакты</p>
            <p className={styles.lightText}>Отсутствуют</p>
          </div>
        </div>

        {/*DESKTOP INFORMATION*/}
        {width > 640 && <>{informationLayout}</>}

        <p>
          Местоположение:
          <span className={styles.lightText}> need reverse geocode </span>
        </p>
        <div>
          <div style={{ height: '70vh', width: widthMap }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyC3u8u23ct68CEAxVm984B5h2lyFmJgH64&region=RU&language=ru',
              }}
              defaultCenter={defaultPropsMap.center}
              defaultZoom={defaultPropsMap.zoom}
              yesIWantToUseGoogleMapApiInternals
            >
              <Marker src={state.photo} lat={center.lat} lng={center.lng} />
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </div>
  );
};
