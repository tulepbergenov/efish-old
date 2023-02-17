export interface IReferencesResponse {
  current_page: number;
  data: IReference[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url: any;
  path: string;
  per_page: number;
  prev_page_url: any;
  to: number;
  total: number;
}

export interface IReference {
  id: number;
  name: string;
  modules: string[];
  status: string;
  uneditable: number;
  created_at: string;
  updated_at: string;
  columns: IColumn[];
  roles: IRole[];
}

export interface IColumn {
  id: number;
  catalog_id: number;
  name: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  accesses: string[];
  status: string;
  created_at: string;
  updated_at: string;
  pivot: IPivot;
}

export interface IPivot {
  catalog_id: number;
  role_id: number;
}

export interface ILink {
  url?: string;
  label: string;
  active: boolean;
}
