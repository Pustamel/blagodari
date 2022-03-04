import axios from 'axios'
import { Connection, User } from '../types/types'
import { getCookie } from '../utils/functions'
import { parent } from '../store/types/thunkTypes'

const instance = axios.create({
  baseURL: 'https://api.blagoroda.org/api/',
})

const token = process.env.REACT_APP_TG_TOKEN

// const tokenAuth =
// getCookie('tokenAuth') !== null && getCookie('tokenAuth') !== undefined
//   ? getCookie('tokenAuth')
//   : '';

const user_uuid =
  getCookie('uuid') !== null && getCookie('uuid') !== undefined
    ? getCookie('uuid')
    : ''

export interface FetchUserConnectionsGraph {
  users: User[]
  connections: Connection[]
}

export const fetchUserConnectionsGraph = async (from = 0, number = 25) => {
  const { data } = await instance.get<FetchUserConnectionsGraph>(
    'getstats/user_connections_graph',
    {
      params: {
        from,
        number,
      },
    },
  )
  return data
}

export const authTelegram = async (user: object) => {
  const body = JSON.stringify(user)
  const headers = { 'Content-Type': 'application/json' }
  const { data } = await instance.post('auth/telegram', body, { headers })
  document.cookie = `tokenAuth=${data.auth_token}; path=/`
  document.cookie = `uuid=${data.user_uuid}; path=/`
  return data
}

export const getProfileInfo = async (uuid: string) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  const { data } = await instance.get(`profile?uuid=${uuid}`, { headers })

  return data
}

// NEED BILLING
// export const getAddresses = async ({latLng}:any) => {
//   const lat = `53.95,30.33`
//   const latlngs = encodeURIComponent(latLng)
//   const key = 'AIzaSyC3u8u23ct68CEAxVm984B5h2lyFmJgH64'
//   const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&region=RU&language=ru&latlng=${lat}&location_type=ROOFTOP&result_type=street_address`
//
//   const response = await fetch(url).catch(() =>
//     Promise.reject(new Error("Error fetching data"))
//   );
//
//   const json = await response.json().catch(() => {
//     return Promise.reject(new Error("Error parsing server response"));
//   });
//
//   console.log(json)
// }
// {tg_token: '???', uuid: 'uuid user', first_name: 'name + last_Name + middle_Name', photo: 'base64 encoded', gender: 'm/f',
// latitude: '', longitude: '', is_notified: '1 / ""', dob: '', dod: 'дд.мм.ггг, мм.гггг, гггг', photo

export const changeDataProfile = async (
  field?: string,
  data?: string | Blob,
) => {
  const formData = new FormData()
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }

  formData.append('uuid', `${user_uuid}`)
  field === 'photo' && formData.append('tg_token', `${token}`)
  formData.append(`${field}`, `${data}`)

  const response = await instance.put('profile', formData, { headers })
  return response.data
}

export const addWishes = async (text: string, last_edit: number) => {
  const headers = {
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }
  const data = {
    text: text,
    last_edit: last_edit,
  }
  const response = await instance.post('addorupdatewish', data, { headers })
  return response.data
}

export const addAbility = async (text: string, last_edit: number) => {
  const headers = {
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }
  const data = {
    text: text,
    last_edit: last_edit,
  }
  const response = await instance.post('addorupdateability', data, { headers })
  return response.data
}

export const addProfileParent = async (field?: string, data?: parent) => {
  const formData = new FormData()
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }

  formData.append('uuid', `${user_uuid}`)
  formData.append('first_name', `${data?.data.first_name}`)
  formData.append('dod', `${data?.data.dod}`)
  formData.append('dob', `${data?.data.dob}`)
  formData.append('gender', `${data?.data.gender}`)
  formData.append('latitude', `${data?.data.latitude}`)
  formData.append('longitude', `${data?.data.longitude}`)
  formData.append('photo', `${data?.data.photo}`)
  formData.append('link_uuid', `${user_uuid}`)
  if (field === 'mother') {
    formData.append('link_relation', 'new_is_mother')
  } else {
    formData.append('link_relation', 'new_is_father')
  }

  const response = await instance.post('profile', formData, { headers })

  return response.data
}

export const getRelative = async () => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }
  const { data } = await instance.get(`profile`, { headers })

  return data
}

export const fetchChangeParent = async (
  field: string,
  data: any,
  uuid: string,
) => {
  const formData = new FormData()
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }
  formData.append('uuid', `${uuid}`)
  formData.append(field, `${data}`)

  const response = await instance.put('profile', formData, { headers })
  return response.data
}

export const FetchSearchProfileByName = async (name: string) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }

  const response = await instance.get('getstats/user_connections_graph', {
    headers,
    params: {
      query: name,
      uuid: user_uuid,
    },
  })
  return response.data
}

export const fetchConnectWithParent = async (
  uuid: string,
  parent: 'father' | 'mother' | 'not_parent',
) => {
  const idTable = {
    father: 6,
    not_parent: 7,
    mother: 8,
  }
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Token ${getCookie('tokenAuth')}`,
  }
  const formData = new FormData()
  formData.append('user_id_from', `${user_uuid}`)
  formData.append('user_id_to', `${uuid}`)
  formData.append('operation_type_id', `${idTable[parent]}`)

  const response = await instance.post('addoperation', formData, { headers })
  return response.data
}

// export const deleteFather = async () => {
//   const formData = new FormData();
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Token ${getCookie('tokenAuth')}`,
//   };
//
//   formData.append('uuid', '90258672-a7bf-48f1-a67b-f0db3f34b1b2')
//
//   const response = await instance.delete('profile', {
//     headers,
//     data: formData
//   });
//  return response.data
// }
