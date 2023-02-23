import { IEntryResponse } from "@/interfaces/entry-interface";
import { IEntryListResponse } from "@/interfaces/entry-list.interface";
import { IModulesResponse } from "@/interfaces/modules.interface";
import { IReferenceResponse } from "@/interfaces/reference.interface";
import { IReferencesResponse } from "@/interfaces/references.interface";
import { AxiosResponse } from "axios";
import api from "..";

const getReferences = (
  page: number,
  perPage: number
): Promise<AxiosResponse<IReferencesResponse, any>> => {
  const res = api.get(`/catalog/list?${page}&=${perPage}`);

  return res;
};

const getReference = (
  id: number
): Promise<AxiosResponse<IReferenceResponse, any>> => {
  const res = api.get(`/catalog/${id}`);

  return res;
};

const getModules = (): Promise<AxiosResponse<IModulesResponse, any>> => {
  const res = api.get("/catalog/module/list");

  return res;
};

const getEntryList = (
  id: any
): Promise<AxiosResponse<IEntryListResponse, any>> => {
  const res = api.get(`/catalog/${id}/entry/list`);

  return res;
};

const getEntry = (
  catalogId: any,
  entryId: any
): Promise<AxiosResponse<IEntryResponse, any>> => {
  const res = api.get(`/catalog/${catalogId}/entry/${entryId}`);

  return res;
};

const deleteEntry = (
  catalogId: any,
  entryId: any
): Promise<AxiosResponse<any, any>> => {
  const res = api.post(`/catalog/${catalogId}/entry/${entryId}/delete`);

  return res;
};

const deactivateReference = (id: any): Promise<AxiosResponse<any, any>> => {
  const res = api.post(`/catalog/${id}/deactivate`);

  return res;
};

const activateReference = (id: any): Promise<AxiosResponse<any, any>> => {
  const res = api.post(`/catalog/${id}/activate`);

  return res;
};

const createReference = (
  data: ICatalogData
): Promise<AxiosResponse<any, any>> => {
  const res = api.post("/catalog/create", data);

  return res;
};

const editReference = (
  data: ICatalogData,
  id: any
): Promise<AxiosResponse<any, any>> => {
  const res = api.post(`/catalog/${id}`, data);

  return res;
};

const createEntry = (
  data: any,
  catalogId: any
): Promise<AxiosResponse<any, any>> => {
  const res = api.post(`/catalog/${catalogId}/entry/create`, data);

  return res;
};

const editEntry = (
  data: any,
  catalogId: any,
  entryId: any
): Promise<AxiosResponse<any, any>> => {
  const res = api.post(`/catalog/${catalogId}/entry/${entryId}`, data);

  return res;
};

export const ReferencesService = {
  getReferences,
  createEntry,
  editEntry,
  getEntryList,
  editReference,
  getReference,
  getModules,
  getEntry,
  deactivateReference,
  activateReference,
  deleteEntry,
  createReference,
};

interface ICatalogData {
  name: string;
  modules: string[];
  columns: string[];
  roles: number[];
}

interface IEntryData {
  name: string;
  modules: string[];
  columns: string[];
  roles: number[];
}
