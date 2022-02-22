import styles from './BlockList.module.scss';

interface blocksListTypes {
  list: listTypes[];
}

interface listTypes {
  text: string;
  id: string | number;
}

export const BlocksList = ({ list }: blocksListTypes) => {
  return (
    <div className={styles.blockList}>
      {list.map(item => {
        return (
          <div className={styles.itemBlock} key={item.id}>
            {item.text}
          </div>
        );
      })}
    </div>
  );
};
