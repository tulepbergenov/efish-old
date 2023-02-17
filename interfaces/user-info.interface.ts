export interface IUserInfoResponse {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: any;
  email: string;
  job: any;
  iin_bin: string;
  name_company: string;
  avatar: any;
  role_id: number;
  is_deleted: number;
  count_login_fail: number;
  comment: any;
  comment_at: any;
  created_at: string;
  updated_at: string;
  user_info: any;
  role: IRole;
  regions: any[];
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  accesses: string[];
  status: string;
  created_at: string;
  updated_at: string;
}
