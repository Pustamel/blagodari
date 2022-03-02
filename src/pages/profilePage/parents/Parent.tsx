import styles from '../ProfilePage.module.scss';
import classes from './Parent.module.scss';
import { Modal } from '../../../UI/modal/Modal';
import { ChangePhotoParent } from '../changePhoto/ChangePhotoParent';
import { CustomInput } from '../../../UI/input/CustomInput';
import { CustomSelect } from '../../../UI/input/Select';
import { Button } from '../../../UI/button/Button';
import { thunkAddParent, thunkChangeFieldParent } from '../../../store/thunks';
import React, { useState } from 'react';
import { changeParentFields } from '../../../store/Profile';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { isSelfProfile } from '../../../utils/constants';
import editIcon from '../../../assets/icons/edit.svg';
import classNames from 'classnames';
import crossIcon from '../../../assets/icons/cross.svg';
import { propsChangeFiledParent } from '../../../store/types/thunkTypes';
import { SearchParent } from './SearchParent';

const listOfGender = [
  { value: '', id: 'noSelect', text: 'не определено' },
  { value: 'm', id: 'male', text: 'мужской' },
  { value: 'f', id: 'female', text: 'женский' },
];

export const Parents = ({
  changeEditMode,
}: {
  changeEditMode: (arg0: string) => void;
}) => {
  const state = useAppSelector(state => state.MainReducer.profile);
  const [isOpenModal, setOpenModal] = useState<string>('');
  const [activeEditList, setActiveEditList] = useState<string>('');
  const [searchModal, setSearchModal] = useState<'father' | 'mother' | ''>('');
  const dispatch = useAppDispatch();

  let timeout: NodeJS.Timeout;
  const onChangeMother = (event: any, field: string) => {
    if (state.mother === null) {
      dispatch(
        changeParentFields({
          field: field,
          typeField: 'mother',
          data: event.target.value,
        }),
      );
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(
          thunkChangeFieldParent({
            field: field,
            uuid: state.mother?.uuid,
            typeField: 'mother',
            data: event.target.value,
          } as propsChangeFiledParent),
        );
      }, 3000);
    }
  };

  const onCloseModal = () => {
    //modal for create and edit parents
    changeEditMode('');
    setOpenModal('');
    setActiveEditList('');
  };

  const onChangeFather = (event: any, field: string) => {
    if (state.father === null) {
      dispatch(
        changeParentFields({
          field: field,
          typeField: 'father',
          data: event.target.value,
        }),
      );
    } else {
      field !== 'gender' && clearTimeout(timeout);
      timeout = setTimeout(() => {
        dispatch(
          thunkChangeFieldParent({
            field: field,
            uuid: state.father?.uuid,
            typeField: 'father',
            data: event.target.value,
          } as propsChangeFiledParent),
        );
      }, 1000);
    }
  };

  const editImage = (field: string) => {
    return (
      isSelfProfile && (
        <img
          onClick={() => {
            setActiveEditList(field);
          }}
          className={classNames(styles.editIcon, classes.edit)}
          src={editIcon}
          alt=""
        />
      )
    );
  };

  const interactionWithParent = ({ field }: { field: 'mother' | 'father' }) => (
    <div className={classes.interactionParent}>
      <img
        onClick={() => setActiveEditList('')}
        className={classes.cross}
        src={crossIcon}
        alt=""
      />
      {state[field] !== null && (
        <>
          <button
            onClick={() =>
              field !== 'mother' && field !== 'father'
                ? changeEditMode(field)
                : setOpenModal(field)
            }
            className={classes.button}
          >
            Изменить
          </button>
        </>
      )}

      {state[field] === null && (
        <>
          <button
            onClick={() => setSearchModal(field)}
            className={classes.button}
          >
            Добавить из существующего
          </button>
          <button className={classes.button}>Добавить по ссылке</button>
          <button
            onClick={() =>
              field !== 'mother' && field !== 'father'
                ? changeEditMode(field)
                : setOpenModal(field)
            }
            className={classes.button}
          >
            Создать
          </button>
        </>
      )}
    </div>
  );

  return (
    <>
      <div className={classNames(styles.withEdit, classes.containerFather)}>
        <>
          <p className={classes.name}>
            Отец:
            <span className={styles.lightText}>{state.father?.first_name}</span>
          </p>
          {editImage('father')}
          {activeEditList === 'father' &&
            interactionWithParent({ field: 'father' })}
        </>
        {searchModal === 'father' && (
          <SearchParent closeModal={() => setSearchModal('')} />
        )}
        {isOpenModal === 'father' && (
          <Modal closeModal={onCloseModal}>
            <ChangePhotoParent
              uuid={state.father?.uuid}
              photo={state.father?.photo}
              parent="father"
            />
            <CustomInput
              defaultValue={state.father?.first_name}
              onChange={event => onChangeFather(event, 'first_name')}
              label="Имя"
              placeholder="Имя, фамилия, Отчество"
            />
            <CustomSelect
              defaultValue={state.father?.gender}
              label="Пол"
              onSelect={onChangeFather}
              list={listOfGender}
              field="gender"
            />
            <CustomInput
              defaultValue={
                state.father?.dob !== null ? state.father?.dob : undefined
              }
              onChange={event => onChangeFather(event, 'dob')} //
              label="Дата рождения"
              placeholder="дд.мм.гггг"
            />
            <CustomInput
              defaultValue={
                state.father?.dod !== null ? state.father?.dod : undefined
              }
              onChange={event => onChangeFather(event, 'dod')} //
              label="Дата смерти"
              placeholder="дд.мм.гггг"
            />
            <div className={classes.containerBtnModal}>
              {state.father === null && (
                <Button
                  title="Добавить"
                  onClick={() =>
                    state.father !== null &&
                    dispatch(
                      thunkAddParent({ field: 'father ', data: state.father }),
                    )
                  }
                />
              )}
            </div>
          </Modal>
        )}
      </div>

      <div className={classNames(styles.withEdit, classes.containerFather)}>
        <>
          <p className={classes.name}>
            Мать:
            <span className={styles.lightText}>{state.mother?.first_name}</span>
          </p>
          {editImage('mother')}
          {activeEditList === 'mother' &&
            interactionWithParent({ field: 'mother' })}
        </>
        {isOpenModal === 'mother' && (
          <Modal closeModal={onCloseModal}>
            <ChangePhotoParent
              uuid={state.mother?.uuid}
              photo={state.mother?.photo}
              parent="mother"
            />
            <CustomInput
              defaultValue={state.mother?.first_name}
              onChange={event => onChangeMother(event, 'first_name')}
              label="Имя"
              placeholder="Имя, фамилия, Отчество"
            />
            <CustomSelect
              defaultValue={state.mother?.gender}
              label="Пол"
              onSelect={onChangeMother}
              list={listOfGender}
              field="gender"
            />
            <CustomInput
              defaultValue={
                state.mother?.dob !== null ? state.mother?.dob : undefined
              }
              onChange={event => onChangeMother(event, 'dob')}
              label="Дата рождения"
              placeholder="дд.мм.гггг"
            />
            <CustomInput
              defaultValue={
                state.mother?.dod !== null ? state.mother?.dod : undefined
              }
              onChange={event => onChangeMother(event, 'dod')}
              label="Дата смерти"
              placeholder="дд.мм.гггг"
            />
            <div className={classes.containerBtnModal}>
              {state.mother === null && (
                <Button
                  title="Добавить"
                  onClick={() =>
                    state.mother !== null &&
                    dispatch(
                      thunkAddParent({ field: 'mother', data: state.mother }),
                    )
                  }
                />
              )}
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
