export type IRoleResponse = IRole[];

export interface IRole {
  id: number;
  name: string;
  description: string;
  accesses: string[];
  status: string;
  created_at: string;
  updated_at: string;
}
