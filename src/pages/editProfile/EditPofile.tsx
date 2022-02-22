import { CustomInput } from '../../UI/input/CustomInput';
import { CustomSelect } from '../../UI/input/Select';
import styles from './EditProfile.module.scss';
import { useWindowDimensions } from '../../utils/functions';
import { Button } from '../../UI/button/Button';
import { BlocksList } from '../../components/BlocksList/BlocksList';
import { testDataList } from '../../utils/constants';

export const EditProfile = () => {
  const listGender = [
    { value: '―', id: 1 },
    { value: 'Женский', id: 2 },
    { value: 'Мужской', id: 3 },
  ];

  const nameLastName = (
    <div className={styles.nameLastName}>
      <CustomInput placeholder="Введите имя" label="Имя" />
      <CustomInput
        size="middle"
        placeholder="Введите фамилию"
        label="Фамилия"
      />
    </div>
  );

  const { width } = useWindowDimensions();

  return (
    <div className={styles.exitProfile}>
      <div className={styles.avatar}>
        <img
          src="https://i.pinimg.com/564x/ed/a4/92/eda49206dd0713613433ea6e51c6ed1a.jpg"
          alt=""
        />
        {/*FOR MOBILE VERSION name and last name field*/}
        {width <= 640 && width > 500 && nameLastName}
      </div>
      <div className={styles.inputBlocks}>
        {/*FOR DESKTOP name and last name field */}
        {(width > 640 || width < 500) && nameLastName}
        <CustomInput
          size="middle"
          placeholder="Введите отчество"
          label="Отчество"
        />
        <CustomSelect label="Пол" list={listGender} />
        <CustomInput
          size="middle"
          placeholder="дд.мм.гггг или дд/мм/гггг"
          label="Дата рождения"
        />
        <CustomInput
          size="middle"
          placeholder="дд.мм.гггг или дд/мм/гггг"
          label="Дата смерти"
        />
        <CustomInput withSettings={true} label="Отец" />
        <CustomInput withSettings={true} label="Мать" />
        <div className={styles.abilities}>
          <CustomInput placeholder="добавить еще..." label="Возможности" />
          <Button title="Добавить" />
        </div>

        <BlocksList list={testDataList} />
      </div>
    </div>
  );
};
