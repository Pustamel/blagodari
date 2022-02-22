import styles from '../UI/input/Inputs.module.scss';

interface sizesTypes {
  small: string;
  middle: string;
  big: string;
}

export const sizes: sizesTypes = {
  small: `${styles.smallInput}`, //263
  middle: `${styles.middle}`, //349
  big: `${styles.big}`, //779
};

export const testDataList = [
  { text: 'Дизайнер', id: 1 },
  { text: 'Дизайнер интерьера', id: 2 },
  { text: 'зелень свежая кинза укроп по 500гр ежкдневно', id: 3 },
  { text: 'Мёд гречишный 2л', id: 4 },
  { text: 'Арт-консультант', id: 5 },
  { text: 'Арт-консультант Арт-консультант', id: 6 },
];
