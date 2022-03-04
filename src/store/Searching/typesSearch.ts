export interface initialStateType {
  searchedProfiles: profile[]
  isLoading: boolean
}

interface profile {
  last_name?: string
  ability: string | null
  comment: string
  dob: string | null
  dod: string | null
  first_name: string
  gender: string | null
  latitude: number | string
  longitude: number | string
  photo: string
  uuid: string
}
