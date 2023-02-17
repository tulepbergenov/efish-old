export interface IUserRole {
  id: number;
  name: string;
  description: string;
  accesses: string[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserData {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: any;
  email: string;
  job?: any;
  iin_bin: string;
  name_company?: any;
  avatar?: any;
  role_id: number;
  is_deleted: number;
  count_login_fail: number;
  comment?: any;
  comment_at?: any;
  created_at: Date;
  updated_at: Date;
  user_info?: any;
  role: IUserRole;
}

export interface IUserResponse {
  message: string;
  data: IUserData;
  access_token: string;
}
