export interface IEntryResponse {
  id: number;
  catalog_id: number;
  is_deleted: number;
  created_at: string;
  updated_at: string;
  values: IEntryValue[];
}

export interface IEntryValue {
  id: number;
  entry_id: number;
  column_id: number;
  parent_id: number;
  value: string;
  created_at: string;
  updated_at: string;
  column: IEntryColumn;
}

export interface IEntryColumn {
  id: number;
  catalog_id: number;
  name: string;
  is_deleted: number;
  created_at: string;
  updated_at: string;
}
