export interface IEntryListResponse {
  current_page: number;
  data: IEntryList[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: ILink[];
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

export interface IColumn {
  id: number;
  catalog_id: number;
  name: string;
  is_deleted: number;
  created_at: Date;
  updated_at: Date;
}

export interface IValue {
  id: number;
  entry_id: number;
  column_id: number;
  parent_id: number;
  value: string;
  created_at: Date;
  updated_at: Date;
  column: IColumn;
}

export interface IEntryList {
  id: number;
  catalog_id: number;
  is_deleted: number;
  created_at: Date;
  updated_at: Date;
  values: IValue[];
}

export interface ILink {
  url: string;
  label: string;
  active: boolean;
}
