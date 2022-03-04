export interface initialStateType {
  profile: profileData
  loading: boolean
  auth: boolean
}

export interface profileData {
  photo: string
  name: string
  gender: string | null
  abilities: Array<abilitiesAndWishesType>
  mother: parentType | null
  father: parentType | null
  dob: string | null
  dod?: string | null
  latitude: number | string
  longitude: number | string
  wishes: Array<abilitiesAndWishesType>
}

export interface abilitiesAndWishesType {
  text: string
  uuid: string
  last_edit: number
}

interface parentType {
  first_name: string
  photo: string
  uuid: string
  dod: string | null
  dob: string | null
  gender: string
  latitude: number | string
  longitude: number | string
}

export interface propsProfileField {
  field: string
  data: any
}

export interface propsChangeParent {
  field: string
  data: any
  typeField: 'father' | 'mother'
}
