import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store'
import { useWindowDimensions } from '../../utils/functions'
import { Placemark, YMaps, YMapsApi } from 'react-yandex-maps'
import { Map as MapYandex } from 'react-yandex-maps'
import styles from './Map.module.scss'
import { CustomInput } from '../../UI/input/CustomInput'
import { thunkChangeProfile } from '../../store/thunks'
import { Button } from '../../UI/button/Button'

interface mapTypes {
  defaultWidth?: number
}

export const Map = ({ defaultWidth = 500 }: mapTypes) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.MainReducer.profile)
  const [widthMap, setWidthMap] = useState<number>(defaultWidth)
  const [coords, setCoords] = useState<Array<number | null>>([null, null]) //[lng, lat]
  const [currentStreet, setCurrentStreet] =
    useState<string>('отсутствует адресс')

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (state.longitude && state.latitude) {
      setCoords([state.longitude, state.latitude])
    }
  }, [state])

  //width map
  useEffect(() => {
    if (width <= 1100 && width > 1000) {
      setWidthMap(700)
    } else if (width < 1200 && width > 1100) {
      setWidthMap(900)
    } else if (width < 1000 && width > 780) {
      setWidthMap(500)
    } else if (width < 780 && width > 400) {
      setWidthMap(400)
    } else if (width < 400) {
      setWidthMap(300)
    }
  }, [width])

  //avatar mark in map
  const defaultAvatar =
    state.photo ||
    'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'

  const changeMyLocation = () => {
    dispatch(
      thunkChangeProfile({
        field: 'longitude',
        data: coords[0],
      }),
    )
    dispatch(
      thunkChangeProfile({
        field: 'latitude',
        data: coords[1],
      }),
    )
    if (state.longitude && state.latitude) {
      setCoords([state.longitude, state.latitude])
    }
  }

  // function running when map render
  const loadSuggest = (ymaps: YMapsApi) => {
    setTimeout(() => {
      ymaps.ready().then(() => readyMap())
      function readyMap() {
        if (ymaps.control && ymaps.SuggestView) {
          // just provider
          const searchControl = new ymaps.control.SearchControl({
            options: {
              provider: 'yandex#map',
            },
          })

          //here we get address(street, house, city and etc.) from [40, 40]
          const reverseGeocoder = ymaps.geocode([
            state.longitude,
            state.latitude,
          ])
          reverseGeocoder.then(
            (data: {
              geoObjects: {
                get: (arg0: number) => {
                  (): any
                  new (): any
                  properties: {
                    (): any
                    new (): any
                    get: { (arg0: string): any; new (): any }
                  }
                }
              }
            }) =>
              setCurrentStreet(data.geoObjects.get(0).properties.get('name')),
          )

          // this for popup menu of searching request
          const suggestView = new ymaps.SuggestView('suggest')

          //event for choose address in searching
          suggestView.events.add(
            'select',
            (e: {
              get: (arg0: string) => { (): any; new (): any; value: any }
            }) => {
              searchControl
                //this searching value from input
                .search(e.get('item').value)
                .then(
                  (data: {
                    metaData: { geocoder: { request: any } }
                    geoObjects: any
                  }) => {
                    // here we get coordinates as an [40, 40] from request
                    setCoords(data.geoObjects.get(0).geometry.getCoordinates())
                  },
                )
                .catch((e: any) => console.log('error', e))
            },
          )
        }
      }
    }, 1000)
  }
  const apikey = process.env.REACT_APP_KEY_YANDEX_MAP
  console.log(apikey);
  return (
    <>
      <div className={styles.withEdit}>
        <p>
          Местоположение:
          <span className={styles.lightText}> {currentStreet} </span>
        </p>
        <CustomInput placeholder="Введите адресс" id="suggest" size="small" />
        <Button onClick={changeMyLocation} title="Изменить мое местопложение" />
      </div>

      <div className={styles.containerMap}>
        {/*container map*/}
        <YMaps
          enterprise
          query={{
            apikey: apikey,
            ns: 'use-load-option',
            load: 'SuggestView',
          }}
        >
          {/*map*/}
          <MapYandex
            onLoad={ymaps => loadSuggest(ymaps)} //onload map
            modules={['SuggestView', 'control.SearchControl', 'geocode']} // modules for request
            width={widthMap}
            height={widthMap}
            defaultState={{
              // @ts-ignore
              // need set coordinates
              center:
                coords[0] !== null && coords[1] !== null
                  ? [...coords]
                  : [30, 30],
              zoom: 9,
            }}
          >
            <Placemark
              properties={{
                iconShape: {
                  type: 'Circle',
                  coordinates: [0, 0],
                  radius: 20,
                },
              }}
              options={{
                preset: 'islands#yellowStretchyIcon',
                balloonCloseButton: false,
                hideIconOnBalloonOpen: false,
                iconLayout: 'default#image',
                iconImageHref: defaultAvatar,
                iconImageSize: [25, 25],
                iconImageOffset: [-5, -38],
                iconShape: {
                  type: 'Circle',
                  coordinates: [0, 0],
                  radius: 20,
                  geodesic: true,
                },
              }}
              //@ts-ignore
              geometry={
                // coordinates mark
                coords[0] !== null && coords[1] !== null
                  ? [...coords]
                  : [30, 30]
              }
              onClick={() => console.log('click!')}
            />
          </MapYandex>
        </YMaps>
      </div>
    </>
  )
}
