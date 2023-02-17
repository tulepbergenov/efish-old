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

export const ReferencesService = { getReferences, getReference, getModules };
