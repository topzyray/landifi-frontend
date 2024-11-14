import AxiosInstance from "./axiosInstance";

export const getUserById = async (userId: string) => {
  try {
    const response = await AxiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const getSavedPropertyForTenant = async (userId: string) => {
  try {
    const response = await AxiosInstance.get(`/tenants/${userId}`);
    return response.data;
  } catch (err: any) {
    return err;
  }
};

export const updateUserPassword = async (data: any) => {
  try {
    const response = await AxiosInstance.put(`/auth/change-password`, data);
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};

export const updateUserRecordById = async (userId: string, data: any) => {
  try {
    const response = await AxiosInstance.patch(`/users/${userId}`, data);
    return response.data;
  } catch (err: any) {
    return err?.response?.data;
  }
};
