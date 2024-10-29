import AxiosInstance from "./axiosInstance";

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
