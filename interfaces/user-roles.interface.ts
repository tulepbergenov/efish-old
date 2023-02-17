export type IUserRolesResponse = IUserRole[];

export interface IUserRole {
  id: number | string;
  name: string;
  description: string;
  accesses: string[];
  status: string;
  created_at: string;
  updated_at: string;
}
