export interface initialStateType {
  profile: profileData;
  loading: boolean;
  auth: boolean;
}

interface locationType {
  latitude: number | null;
  longitude: number | null;
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
  wishes: Array<abilitiesAndWishesType>;
}

interface abilitiesAndWishesType {
  text: string;
  uuid: string;
  last_edit: number;
}

interface parentType {
  first_name: string;
  last_name: string;
  middle_name: string;
  uuid: string;
  photo: string;
  location?: locationType;
}
