import styles from './ProfilePage.module.scss'
import editIcon from '../../assets/icons/edit.svg'
import React, { ReactNode } from 'react'
import { useAppSelector } from '../../store/store'
import { CustomSelect } from '../../UI/input/Select'
import { isSelfProfile } from '../../utils/constants'
import { Parents } from './parents/Parent'

interface propsInfoBlock {
  editMode: string
  changeEditMode: (arg0: string) => void
  onChangeInput: (event: any, field: string | undefined) => void
  editModeLayout: ({
    placeholder,
    defaultValue,
    field,
  }: {
    placeholder?: string
    defaultValue?: string
    field?: string
  }) => ReactNode
}

const listOfGender = [
  { value: '', id: 'noSelect', text: 'не определено' },
  { value: 'm', id: 'male', text: 'мужской' },
  { value: 'f', id: 'female', text: 'женский' },
]

// this for gender, dob, dod and parents
export const InformationLayout = ({
  editMode,
  changeEditMode,
  editModeLayout,
  onChangeInput,
}: propsInfoBlock) => {
  const state = useAppSelector(state => state.MainReducer.profile)

  const editImage = (field: string) => {
    return (
      isSelfProfile && (
        <img
          onClick={() => changeEditMode(field)}
          className={styles.editIcon}
          src={editIcon}
          alt=""
        />
      )
    )
  }

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
          <>
            {editModeLayout({
              field: 'dob',
              placeholder: 'dd.mm.yyyy',
              defaultValue: state.dob !== null ? state.dob : '',
            })}
          </>
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
          <>
            {editModeLayout({
              field: 'dod',
              placeholder: 'dd.mm.yyyy',
              defaultValue: state.dod !== null ? state.dod : '',
            })}
          </>
        )}
      </div>
      <Parents changeEditMode={changeEditMode} />
    </>
  )
}
