import styles from './BlockList.module.scss';
import { abilitiesAndWishesType } from '../../store/typesProfile';

interface blocksListTypes {
  list: abilitiesAndWishesType[];
}

export const BlocksList = ({ list }: blocksListTypes) => {
  return (
    <div className={styles.blockList}>
      {list.map(item => {
        return (
          <div className={styles.itemBlock} key={item.uuid}>
            {item.text}
          </div>
        );
      })}
    </div>
  );
};
