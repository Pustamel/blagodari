export interface parent {
  field?: string;
  data: dataParent;
}

interface dataParent {
  name: string;
  photo?: string;
  dod?: string | null;
  dob?: string | null;
  gender?: string;
  latitude?: number | string;
  longitude?: number | string;
}
