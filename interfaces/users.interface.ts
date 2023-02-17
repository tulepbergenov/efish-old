export interface RegionsInfo {
  id: number;
  value: string;
}

export interface Region2 {
  id: number;
  entry_id: number;
  column_id: number;
  parent_id: number;
  value: string;
  created_at: Date;
  updated_at: Date;
}

export interface Region {
  id: number;
  user_id: number;
  region_id: number;
  created_at: Date;
  updated_at: Date;
  region: Region2;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  accesses: string[];
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface IUserTableData {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: any;
  email: string;
  job?: any;
  iin_bin: string;
  name_company: string;
  avatar?: any;
  role_id: number;
  is_deleted: number;
  count_login_fail: number;
  comment?: any;
  comment_at?: any;
  created_at: Date;
  updated_at: Date;
  user_info?: any;
  regions_info: RegionsInfo[];
  regions: Region[];
  role: Role;
}

export interface Link {
  url: string;
  label: string;
  active: boolean;
}

export interface IUsersResponse {
  current_page: number;
  data: IUserTableData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}
