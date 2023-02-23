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

export const ReferencesService = {
  getReferences,
  getEntryList,
  getReference,
  getModules,
  getEntry,
};
