import { Modal } from '../../../UI/modal/Modal'
import { CustomInput } from '../../../UI/input/CustomInput'
import { Button } from '../../../UI/button/Button'
import styles from './Parent.module.scss'
import { Loader } from '../../../components/loader/Loader'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { thunkConnectParent, thunkSearchByName } from '../../../store/thunks'
import defaultPhoto from '../../../assets/images/default_photo.png'
import { uuid } from '../../../utils/constants'

export const SearchParent = ({
  closeModal,
  parent,
  onSelectParent,
}: {
  closeModal(): void
  parent: 'father' | 'mother' | 'not_parent'
  onSelectParent(arg0: string): void
}) => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.Search)

  let timer: NodeJS.Timeout
  const onChangeNameInput = (event: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      dispatch(thunkSearchByName({ name: event.target.value }))
    }, 1000)
  }

  const connectParent = (uuid: string) => {
    dispatch(thunkConnectParent({ uuid, parent }))
    closeModal()
    onSelectParent('')
  }
//TODO при выборе из поиска приходится обновлять страницу, чтобы увидеть родителя
  return (
    <Modal closeModal={closeModal}>
      <CustomInput
        className={styles.inputSearch}
        onChange={onChangeNameInput}
        placeholder="Имя, фамилия, отчество"
      />

      {state.isLoading && (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      <div className={styles.containerProfiles}>
        {state.searchedProfiles.map(item => {
          if (item.uuid !== uuid) {
            return (
              <div key={item.uuid} className={styles.searchedProfile}>
                <img
                  className={styles.profilePhoto}
                  src={item.photo === '' ? defaultPhoto : item.photo}
                  alt=""
                />
                <p>{item.first_name}</p>
                <p>{item?.last_name}</p>
                <Button
                  title="Выбрать"
                  onClick={() => connectParent(item.uuid)}
                />
              </div>
            )
          } else if (state.searchedProfiles.length <= 1) {
            return (
              <p key={item.uuid} className={styles.noResult}>
                Нет результатов
              </p>
            )
          }
        })}
      </div>
    </Modal>
  )
}
