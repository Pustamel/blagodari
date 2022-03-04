import React, { useCallback, useEffect, useState } from 'react'
import styles from './ProfilePage.module.scss'
import { Button } from '../../UI/button/Button'
import {
  thunkAddAbility,
  thunkAddWish,
  thunkChangeProfile,
  thunkGetProfile,
} from '../../store/thunks'
import { useAppDispatch, useAppSelector } from '../../store/store'
import classNames from 'classnames'
import { nowDate, useWindowDimensions } from '../../utils/functions'
import { Map } from '../../components/map/Map'
import editIcon from '../../assets/icons/edit.svg'
import { CustomInput } from '../../UI/input/CustomInput'
import { InformationLayout } from './InformationLayout'
import { Modal } from '../../UI/modal/Modal'
import { BlocksList } from '../../components/blocksList/BlocksList'
import { ChangePhoto } from './changePhoto/ChangePhoto'
import { isSelfProfile } from '../../utils/constants'
import { useParams } from 'react-router-dom'

export const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.MainReducer.profile)
  const [editMode, setEditMode] = useState<string>('')
  const [isOpenModal, setOpenModal] = useState<boolean>(false)
  const [valueInput, setValueInput] = useState<string>('')
  const [buttonCopyText, setButtonCopyText] = useState('Ссылка на профиль')
  const params = useParams()
//TODO исправить переход на профиль при вервой загрузке страницы uuid = undefined
  useEffect(() => {
    typeof params.profileId === 'string' &&
      dispatch(thunkGetProfile({ uuid: params.profileId }))
  }, [params.profileId])

  console.log('state:', state)

  let timer: NodeJS.Timeout
  const onChangeInput = useCallback((event: any, field: string | undefined) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      if (field !== '' && field !== undefined) {
        dispatch(thunkChangeProfile({ field: field, data: event.target.value }))
        setEditMode('')
      }
    }, 1000)
  }, [])

  const { width } = useWindowDimensions()

  const changeEditMode = (field: string) => {
    setOpenModal(true)
    setEditMode(field)
  }

  const onClickButtonInModal = (field: string) => {
    setOpenModal(false)
    const data = { text: valueInput, last_edit: nowDate() }
    if (field === 'wishes') {
      dispatch(thunkAddWish({ field: field, data }))
    }
    if (field === 'ability') {
      dispatch(thunkAddAbility({ field: field, data }))
    }
    setValueInput('')
  }

  const editModeLayout = ({
    placeholder,
    defaultValue,
    field,
  }: {
    placeholder?: string
    defaultValue?: string
    field?: string
  }) => {
    return (
      <div className={styles.editModeBlock}>
        <CustomInput
          onChange={(event: any) =>
            field !== 'mother' &&
            field !== 'father' &&
            onChangeInput(event, field)
          }
          defaultValue={defaultValue}
          placeholder={placeholder}
        />
        <Button
          className={styles.buttonOk}
          onClick={() => changeEditMode('')}
          title="OK"
        />
      </div>
    )
  }

  //pencil
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

  const onCopyText = () => {
    typeof params.profileId === 'string' &&
      navigator.clipboard.writeText(params.profileId as string)
    setButtonCopyText('Скопировано!')
    setTimeout(() => {
      setButtonCopyText('Ссылка на профиль')
    }, 3000)
  }

  return (
    <div className={styles.containerProfilePage}>
      <div className={styles.containerFirstBlock}>
        <ChangePhoto photo={state.photo} />
        <Button
          onClick={onCopyText}
          className={classNames(styles.copyButton, styles.desktopCopyBtn)}
          title={buttonCopyText}
        />
        {/*MOBILE INFORMATION*/}
        {width < 640 && (
          <div>
            <Button
              onClick={onCopyText}
              className={styles.copyButton}
              title={buttonCopyText}
            />
            <InformationLayout
              changeEditMode={changeEditMode}
              editMode={editMode}
              editModeLayout={editModeLayout}
              onChangeInput={onChangeInput}
            />
          </div>
        )}
      </div>

      {/*NAME*/}
      <div className={styles.containerSecondBlock}>
        <div className={styles.withEdit}>
          {editMode === 'name' ? (
            editModeLayout({
              placeholder: 'ФИО',
              defaultValue: state.name,
              field: 'first_name',
            })
          ) : (
            <>
              <p className={styles.name}>{state.name}</p>
              {editImage('name')}
            </>
          )}
        </div>

        {/*ABILITIES*/}
        <div className={styles.containerInformationBlocks}>
          <div className={styles.infoBlock}>
            <div className={styles.infoBlockEdit}>
              {isOpenModal && editMode === 'abilities' && (
                <Modal closeModal={() => onClickButtonInModal('ability')}>
                  <>
                    <div className={styles.inModal}>
                      <CustomInput
                        onChange={event => setValueInput(event.target.value)}
                        label="Добавить возможность"
                      />
                      <Button
                        onClick={() => onClickButtonInModal('ability')}
                        title="OK"
                      />
                    </div>
                    <BlocksList list={state.abilities} />
                  </>
                </Modal>
              )}
              <>
                <div className={styles.withEdit}>
                  <p>Возможности</p>
                  {editImage('abilities')}
                </div>
                <ul className={classNames(styles.lightText, styles.cardList)}>
                  {state.abilities.map(item => {
                    return <li key={item.uuid}>{item.text}</li>
                  })}
                </ul>
              </>
            </div>
          </div>

          {/*WISHES*/}
          <div className={styles.infoBlock}>
            <div className={styles.infoBlockEdit}>
              {isOpenModal && editMode === 'wishes' && (
                <Modal closeModal={() => onClickButtonInModal('wishes')}>
                  <>
                    <div className={styles.inModal}>
                      <CustomInput
                        onChange={event => setValueInput(event.target.value)}
                        label="Добавить потребности"
                      />
                      <Button
                        onClick={() => onClickButtonInModal('wishes')}
                        title="OK"
                      />
                    </div>
                    <BlocksList list={state.wishes} />
                  </>
                </Modal>
              )}
              <div className={styles.withEdit}>
                <p>Потребности</p>
                {editImage('wishes')}
              </div>
              <ul className={classNames(styles.lightText, styles.cardList)}>
                {state.wishes.map(item => {
                  return <li key={item.uuid}>{item.text}</li>
                })}
              </ul>
            </div>
          </div>

          {/*CONTACTS*/}
          <div className={classNames(styles.infoBlock, styles.contactsBlock)}>
            <div className={styles.infoBlockEdit}>
              {isOpenModal && editMode === 'contacts' && (
                <Modal closeModal={() => changeEditMode('')}>
                  <>
                    <div className={styles.inModal}>
                      <CustomInput label="Добавить контакты" />
                      <Button onClick={() => changeEditMode('')} title="OK" />
                    </div>
                    {/*<BlocksList list={state.wishes} />*/}
                  </>
                </Modal>
              )}
              <div className={styles.withEdit}>
                <p>Контакты</p>
                {editImage('contacts')}
              </div>
              <p className={styles.lightText}>Отсутствуют</p>
            </div>
          </div>
        </div>

        {/*DESKTOP INFORMATION*/}
        {width > 640 && (
          <InformationLayout
            onChangeInput={onChangeInput}
            changeEditMode={changeEditMode}
            editMode={editMode}
            editModeLayout={editModeLayout}
          />
        )}
        {editMode === 'address' ? (
          <>{editModeLayout({ field: 'address' })}</>
        ) : (
          <>
            <div className={styles.withEdit}>
              <p>
                Местоположение:
                <span className={styles.lightText}> need reverse geocode </span>
              </p>
              {editImage('address')}
            </div>
          </>
        )}

        {/*MAP*/}
        <div>
          <Map />
        </div>
      </div>
    </div>
  )
}
