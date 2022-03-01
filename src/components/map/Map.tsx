import GoogleMapReact from 'google-map-react';
import { Marker } from '../../pages/profilePage/Marker';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/store';
import { useWindowDimensions } from '../../utils/functions';

interface mapTypes {
  defaultWidth?: string;
}
export const Map = ({ defaultWidth = '50%' }: mapTypes) => {
  const state = useAppSelector(state => state.MainReducer.profile);
  const [widthMap, setWidthMap] = useState<string>(defaultWidth);

  const { width } = useWindowDimensions();

  const center = {
    lat: 53.95,
    lng: 30.33,
  };

  const getCenter = () => {
    if (
      typeof state.latitude === 'number' &&
      typeof state.longitude === 'number'
    ) {
      center.lat = state.latitude;
      center.lng = state.longitude;
    }
  };

  const defaultPropsMap = {
    center: center,
    zoom: 11,
  };

  useEffect(() => {
    getCenter();
  }, []);

  useEffect(() => {
    if (width <= 1100) {
      setWidthMap('100%');
    } else if (width < 1200) {
      setWidthMap('90%');
    }
  }, [width]);

  return (
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
  );
};
