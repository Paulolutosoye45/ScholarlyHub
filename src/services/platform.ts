import { API } from ".";
import type { TResponse } from "./school";
import { X_Tenant_ID } from "./tenant";

const endpoints = {
  createUser: "/api/PlatformAdmin/create",
  login: "/api/PlatformAuth/login",
  users: "/api/PlatformAdmin/users",
};

interface IcreateUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

interface ILogin {
  username: string;
  password: string;
}

export const platformAdmins = {
  createUser: (user: IcreateUser) => {
    return API.post<TResponse<unknown>>(endpoints.createUser, user, {
      headers: {
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },

  Login: (data: ILogin) => {
    return API.post<TResponse<unknown>>(endpoints.login, data, {
      headers: {
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },

  platformAdminUser: () => {
    return API.get<TResponse<unknown>>(endpoints.users, {
      headers: {
        "X-Tenant-ID": X_Tenant_ID,
      },
    });
  },
};
