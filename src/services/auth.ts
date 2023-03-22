import endpoints from "@/constants/endpoints";
import { LoginParams, UserDataType } from "@/context/types";
import request from "@/lib/api/request";

export const AuthAPI = {
  login: async (params: LoginParams): Promise<UserDataType> => {
    const response = await request
      .request({
        url: endpoints.loginEndpoint,
        method: "POST",
        data: params,
      },)
      .catch((error) => {
        return Promise.reject(error);
      });

    return response.data;
  },
  me: async () => {
    const response = await request
      .request({
        url: endpoints.meEndpoint,
        method: "GET",
      })
      .catch((error) => {
        return Promise.reject(error);
      });

  return response.data;

  },
  logout: async () => {
    const response = await request
      .request({
        url: endpoints.logoutEndpoint,
        method: "POST",
      })
      .catch((error) => {
        return Promise.reject(error);
      });

    return response.data;
  },
};
