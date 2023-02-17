export interface INewUserData {
  first_name: string;
  last_name: string;
  middle_name: string | null;
  email: string;
  iin_bin: string;
  avatar: string | null;
  password: string;
  role_id: number;
}
