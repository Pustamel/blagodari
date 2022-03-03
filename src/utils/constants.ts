import styles from '../UI/input/Inputs.module.scss'
import { getCookie } from './functions'

interface sizesTypes {
  small: string
  middle: string
  big: string
}

export const sizes: sizesTypes = {
  small: `${styles.smallInput}`, //263
  middle: `${styles.middle}`, //349
  big: `${styles.big}`, //779
}

export const testDataList = [
  { text: 'Дизайнер', id: 1 },
  { text: 'Дизайнер интерьера', id: 2 },
  { text: 'зелень свежая кинза укроп по 500гр ежкдневно', id: 3 },
  { text: 'Мёд гречишный 2л', id: 4 },
  { text: 'Арт-консультант', id: 5 },
  { text: 'Арт-консультант Арт-консультант', id: 6 },
]

export const currentUuid = window.location.pathname.substring(9) // return string with uuid
export const uuid =
  currentUuid !== undefined
    ? currentUuid
    : getCookie('uuid') !== undefined
    ? getCookie('uuid')
    : ' '
export const isSelfProfile = getCookie('uuid') === currentUuid
