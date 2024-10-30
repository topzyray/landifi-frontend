import AxiosInstance from "./axiosInstance";

export const createProperty = async (endpoint: string, data: any) => {
  try {
    const response = await AxiosInstance.post(`/properties/${endpoint}`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllProperties = async () => {
  try {
    const response = await AxiosInstance.get(`/properties`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getPropertyById = async (id: string) => {
  try {
    const response = await AxiosInstance.get(`/properties/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const updatePropertyById = async (
  endpoint: string,
  id: string,
  data: any
) => {
  try {
    const response = await AxiosInstance.patch(
      `/properties/${endpoint}/${id}`,
      data
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const deletePropertyById = async (id: string) => {
  try {
    const response = await AxiosInstance.delete(`/properties/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getAllLandlordProperties = async () => {
  try {
    const response = await AxiosInstance.get(`/landlords/allproperties`);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getLandlordPropertyById = async (id: string) => {
  try {
    const response = await AxiosInstance.get(`/landlords/allproperties/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
