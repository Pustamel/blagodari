import { CustomInput } from "../../UI/input/CustomInput"
import { CustomSelect } from "../../UI/input/Select"
import styles from "./EditProfile.module.scss"

export const EditProfile = () => {
  const listGender = [
    {value: "―", id: 1},
    {value: "Женский", id: 2},
    {value: "Мужской", id: 3},
  ]
  return (
    <div className={styles.exitProfile}>
      <div className={styles.avatar}>
        <img src="https://i.pinimg.com/564x/ed/a4/92/eda49206dd0713613433ea6e51c6ed1a.jpg" alt="" />
      </div>
      <div className={styles.inputBlocks}>
        <CustomInput placeholder="Введите имя" label="Имя" />
        <CustomSelect list={listGender} />
      </div>
    </div>
  );
};
