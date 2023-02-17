export interface IReferenceResponse {
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
  pivot: Pivot;
}

export interface Pivot {
  catalog_id: number;
  role_id: number;
}
