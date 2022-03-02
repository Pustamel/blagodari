import { Modal } from '../../../UI/modal/Modal';
import { CustomInput } from '../../../UI/input/CustomInput';
import { Button } from '../../../UI/button/Button';
import styles from './Parent.module.scss';
import { Loader } from '../../../components/loader/Loader';

export const SearchParent = ({ closeModal }: { closeModal(): void }) => {
  return (
    <Modal closeModal={closeModal}>
      <CustomInput label="Имя" placeholder="Имя, фамилия, отчество" />
      <CustomInput
        label="Дата рождения"
        placeholder="дд.мм.гггг или дд/мм/гггг"
      />
      <div className={styles.containerBtnModal}>
        <Button title="Поиск" />
      </div>
      <Loader />
    </Modal>
  );
};
