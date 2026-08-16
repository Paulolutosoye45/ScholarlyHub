import { API } from ".";
import { X_Tenant_ID } from "./tenant";

export interface IRegister {
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
  logoPublicId: string;
  adminFirstName: string;
  adminMiddleName: string;
  adminLastName: string;
  adminEmail: string;
  adminUsername: string;
}

export type TResponse<T> = {
  responseMessage: string;
  responseCode: string;
  status: string;
  data: T;
};

export const endpoints = {
  register: "/api/School/register",
  updateSchoolLogo: "/api/School/logo",
  registrationStatus: "/api/School/registration-requests",
  registrationRequests: "/api/School/registration-requests",
  approve: (requestId: string) => `/api/School/approve/${requestId}`,
  reject: (requestId: string) => `/api/School/reject/${requestId}`,
};

export const schoolService = {
  Regsiter: (data: IRegister) => {
    return API.post<TResponse<unknown>>(endpoints.register, data, {
      headers: {
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },

  RegistrationStatus: () => {
    return API.get<TResponse<unknown>>(endpoints.registrationRequests, {
      headers: {
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },

  schoolRegistrationRequests: () => {
    return API.get<TResponse<unknown>>(endpoints.registrationStatus);
  },

  approveSchool: (requestId: string) => {
    return API.post<TResponse<unknown>>(endpoints.approve(requestId));
  },

  rejectSchool: (requestId: string, message: string) => {
  return API.post<TResponse<unknown>>(endpoints.reject(requestId), 
    JSON.stringify(message),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
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
