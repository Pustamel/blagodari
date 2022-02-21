import { Action, AnyAction } from 'redux';
import { createAction, ThunkDispatch } from '@reduxjs/toolkit';

export type Reducer<S, A extends AnyAction> = (state: S, action: A) => S;

export interface initialStateType {
  profile: profileData;
  loading: boolean;
}

interface locationType {
  latitude: string | null;
  longitude: string | null;
}

export interface profileData {
  photo: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string | null;
  abilities: Array<abilitiesAndWishesType>;
  mother: parentType | null;
  father: parentType | null;
  dob: string | null;
  dod?: string | null;
  location?: locationType;
  wishes: Array<abilitiesAndWishesType>
}

interface abilitiesAndWishesType {
  text: string
  uuid: string
  last_edit: number
}

interface parentType {
  first_name: string
  last_name: string
  middle_name: string
  uuid: string
  photo: string
  location?: locationType
}

export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState
  E, // any "extra argument" injected into the thunk
  A extends Action, // known types of actions that can be dispatched
> = (
  dispatch: ThunkDispatch<S, E, A>,
  getState: () => S,
  extraArgument: E,
) => R;

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

createAction('GET_PROFILE_DATA', withPayloadType<string>());
