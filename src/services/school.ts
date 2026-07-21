import { API } from ".";
import { X_Tenant_ID } from "./tenant";

export interface Iprovison {
  schoolName: string;
  location: string;
  countryId: number;
  stateId: number;
  state: string;
  address: string;
  hasBranch: boolean;
  tenantIdentifier: string;
  schoolCode: string;
  logoUrl: string;
  adminFirstName: string;
  adminMiddleName: string;
  adminLastName: string;
  adminEmail: string;
  adminUsername: string;
  adminPassword: string;
}

export type TResponse<T> = {
  responseMessage: string,
  responseCode: string,
  status: string,
  data: T
}

export const endpoints = {
  Provison: "/api/School/provision",
  updateSchoolLogo: "/api/School/logo",
};

export const schoolService = {
  Provision: (data: Iprovison) => {
    return API.post<TResponse<unknown>>(endpoints.Provison, data, {
      headers: {
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },
  
  updateSchoolLogo: (logo: File) => {
    const formData = new FormData();
    formData.append("logo", logo);

    return API.put(endpoints.updateSchoolLogo, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },
};
