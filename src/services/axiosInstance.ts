import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

// Request Interceptor: Inject Authorization Token
AxiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Refresh and Error Responses
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh if this is a login attempt or if another status code triggers an error
    if (
      originalRequest.url.includes("/auth/login") ||
      error.response?.status !== 401
    ) {
      return Promise.reject(error);
    }

    // Handle token refresh only if 401 and token expiration-related error
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite loops

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          localStorage.clear();
          // window.location.href = "/auth/login";
          throw new Error("No refresh token available");
        }

        // Attempt to refresh the token
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API}/auth/refresh-token`,
          { refreshToken }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Update tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // Update the Axios instance Authorization header for subsequent requests
        AxiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        // Retry the original request with the new access token
        return AxiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        // setTimeout(() => {
        //   window.location.href = "/auth/login";
        // }, 3000);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Return the error as is for other status codes
  }
);

export default AxiosInstance;
