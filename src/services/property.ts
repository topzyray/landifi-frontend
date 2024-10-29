import AxiosInstance from "./axiosInstance";

export const getAllProperties = async () => {
  try {
    const response = await AxiosInstance.get(`/properties`);
    return response.data;
  } catch (err) {
    console.log("Error", err);
  }
};
