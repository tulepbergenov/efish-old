export interface ICreateUserForm {
  role: string | number;
  first_name: string;
  middle_name: string;
  last_name: string;
  iin_bin: number;
  email: string;
  password: string;
  passwordRepeat: string;
}
