export interface parent {
  field?: string
  data: dataParent
}

interface dataParent {
  first_name: string
  photo?: string
  dod?: string | null
  dob?: string | null
  gender?: string
  latitude?: number | null
  longitude?: number | null
}

export interface getProfileProps {
  uuid: string
}

export interface propsChangeProfile {
  field: string
  data: any
}

export interface propsAddWishAndAbility {
  field: string
  data: {
    text: string
    last_edit: number
  }
}

export interface propsChangeFiledParent {
  field: string
  data: string | number | Blob | unknown
  uuid: string
  typeField: 'mother' | 'father'
}
