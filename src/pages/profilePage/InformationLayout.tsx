import styles from './ProfilePage.module.scss';
import editIcon from '../../assets/icons/edit.svg';
import React, { ReactNode } from 'react';
import { useAppSelector } from '../../store/store';
import { CustomSelect } from '../../UI/input/Select';

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

export const InformationLayout = ({
  editMode,
  changeEditMode,
  editModeLayout,
  onChangeInput,
}: propsInfoBlock) => {
  const state = useAppSelector(state => state.MainReducer.profile);

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
            <img
              onClick={() => changeEditMode('gender')}
              className={styles.editIcon}
              src={editIcon}
              alt=""
            />
          </>
        ) : (
          <>
            <CustomSelect
              onSelect={onChangeInput}
              list={[
                { value: '', id: 'noSelect', text: 'не определено' },
                { value: 'm', id: 'male', text: 'мужской' },
                { value: 'f', id: 'female', text: 'женский' },
              ]}
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
            <img
              onClick={() => changeEditMode('dob')}
              className={styles.editIcon}
              src={editIcon}
              alt=""
            />
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
            <img
              onClick={() => changeEditMode('dod')}
              className={styles.editIcon}
              src={editIcon}
              alt=""
            />
          </>
        ) : (
          <>{editModeLayout({ field: 'dod', placeholder: 'dd.mm.yyyy' })}</>
        )}
      </div>

      <div className={styles.withEdit}>
        {editMode !== 'father' ? (
          <>
            <p>
              Отец:{' '}
              <span className={styles.lightText}>{state.father?.name}</span>
            </p>
            <img
              onClick={() => changeEditMode('father')}
              className={styles.editIcon}
              src={editIcon}
              alt=""
            />
          </>
        ) : (
          <>{editModeLayout({ placeholder: 'Отец' })}</>
        )}
      </div>

      <div className={styles.withEdit}>
        {editMode !== 'mother' ? (
          <>
            <p>
              Мать:
              <span className={styles.lightText}>{state.mother?.name}</span>
            </p>
            <img
              onClick={() => changeEditMode('mother')}
              className={styles.editIcon}
              src={editIcon}
              alt=""
            />
          </>
        ) : (
          <>{editModeLayout({ placeholder: 'Мать' })}</>
        )}
      </div>
    </>
  );
};
