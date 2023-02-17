export interface IReferenceCreate {
  name: string;
  columns: IColumn[];
  mudules: string[];
  roles: number[];
}

interface IColumn {
  id: string;
  name: string;
}
