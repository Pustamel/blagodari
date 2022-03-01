import styles from './ProfilePage.module.scss';
import editIcon from '../../assets/icons/edit.svg';
import React, { ReactNode, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { CustomSelect } from '../../UI/input/Select';
import { isSelfProfile } from '../../utils/constants';
import { Modal } from '../../UI/modal/Modal';
import { CustomInput } from '../../UI/input/CustomInput';
import { thunkAddParent } from '../../store/thunks';
import { ChangePhotoParent } from './ChangePhoto/ChangePhotoParent';
import { Button } from '../../UI/button/Button';
import { changeParentFields } from '../../store/state';

interface propsInfoBlock {
  editMode: string;
  changeEditMode: (arg0: string) => void;
  onChangeInput: (event: any, field: string | undefined) => void;
  editModeLayout: ({
    placeholder,
    defaultValue,
    field,
  }: {
    placeholder?: string;
    defaultValue?: string;
    field?: string;
  }) => ReactNode;
}

const listOfGender = [
  { value: '', id: 'noSelect', text: 'не определено' },
  { value: 'm', id: 'male', text: 'мужской' },
  { value: 'f', id: 'female', text: 'женский' },
];

// gender, dob, dod, mother, father
export const InformationLayout = ({
  editMode,
  changeEditMode,
  editModeLayout,
  onChangeInput,
}: propsInfoBlock) => {
  const state = useAppSelector(state => state.MainReducer.profile);
  const [isOpenModal, setOpenModal] = useState<string>('');
  const dispatch = useAppDispatch();

  const editImage = (field: string) => {
    return (
      isSelfProfile && (
        <img
          onClick={() =>
            field !== 'mother' && field !== 'father'
              ? changeEditMode(field)
              : setOpenModal(field)
          }
          className={styles.editIcon}
          src={editIcon}
          alt=""
        />
      )
    );
  };

  const onCloseModal = () => {
    changeEditMode('');
    setOpenModal('');
  };

  const onChangeMother = (event: any, field: string) => {
    dispatch(
      changeParentFields({
        field: field,
        typeField: 'mother',
        data: event.target.value,
      }),
    );
  };

  return (
    <>
      <div className={styles.withEdit}>
        {editMode !== 'gender' ? (
          <>
            <p>
              Пол:{' '}
              <span className={styles.lightText}>
                {state.gender === null
                  ? 'не определено'
                  : state.gender === 'm'
                  ? 'мужчина'
                  : 'женщина'}
              </span>
            </p>
            {editImage('gender')}
          </>
        ) : (
          <>
            <CustomSelect
              onSelect={onChangeInput}
              list={listOfGender}
              field="gender"
            />
          </>
        )}
      </div>

      <div className={styles.withEdit}>
        {editMode !== 'dob' ? (
          <>
            <p>
              Дата рождения:
              <span className={styles.lightText}>
                {state.dob === null ? '―' : state.dob}
              </span>
            </p>
            {editImage('dob')}
          </>
        ) : (
          <>{editModeLayout({ field: 'dob', placeholder: 'dd.mm.yyyy' })}</>
        )}
      </div>

      <div className={styles.withEdit}>
        {editMode !== 'dod' ? (
          <>
            <p>
              Дата смерти:
              <span className={styles.lightText}>
                {state.dod === null ? '―' : state.dod}
              </span>
            </p>
            {editImage('dod')}
          </>
        ) : (
          <>{editModeLayout({ field: 'dod', placeholder: 'dd.mm.yyyy' })}</>
        )}
      </div>

      <div className={styles.withEdit}>
        <>
          <p>
            Отец:
            <span className={styles.lightText}>{state.father?.name}</span>
          </p>
          {editImage('father')}
        </>
        {isOpenModal === 'father' && (
          <Modal closeModal={onCloseModal}>
            <ChangePhotoParent photo={state.mother?.photo} parent="father" />
            <CustomInput label="Имя" />
            <CustomSelect
              label="Пол"
              onSelect={() => ''}
              list={listOfGender}
              field="gender"
            />
          </Modal>
        )}
      </div>

      <div className={styles.withEdit}>
        <>
          <p>
            Мать:
            <span className={styles.lightText}>{state.mother?.name}</span>
          </p>
          {editImage('mother')}
        </>
        {isOpenModal === 'mother' && (
          <Modal closeModal={onCloseModal}>
            <ChangePhotoParent photo={state.mother?.photo} parent="mother" />
            <CustomInput
              onChange={event => onChangeMother(event, 'name')}
              label="Имя"
              placeholder="Имя, фамилия, Отчество"
            />
            <CustomSelect
              label="Пол"
              onSelect={onChangeMother}
              list={listOfGender}
              field="gender"
            />
            <CustomInput
              onChange={event => onChangeMother(event, 'dob')}
              label="Дата рождения"
              placeholder="дд.мм.гггг"
            />
            <CustomInput
              onChange={event => onChangeMother(event, 'dod')}
              label="Дата смерти"
              placeholder="дд.мм.гггг"
            />
            <Button
              title="Добавить"
              onClick={() =>
                state.mother !== null &&
                dispatch(
                  thunkAddParent({ field: 'mother', data: state.mother }),
                )
              }
            />
          </Modal>
        )}
      </div>
    </>
  );
};
