// import axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_API,
// });

// // Request Interceptor: Inject Authorization Token
// AxiosInstance.interceptors.request.use(
//   (request) => {
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//       request.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return request;
//   },
//   (error) => Promise.reject(error)
// );

// // Helper function to decode token and get expiration time
// const getTokenExpiration = (token: string): number | null => {
//   try {
//     const { exp } = jwtDecode<{ exp: number }>(token);
//     return exp ? exp * 1000 : null; // Convert to milliseconds
//   } catch {
//     return null;
//   }
// };

// // Background token refresh logic
// const scheduleTokenRefresh = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) return;

//   const tokenExpiration = getTokenExpiration(accessToken);
//   if (!tokenExpiration) return;

//   // Calculate time until expiration and set a refresh threshold (5 minutes)
//   const refreshThreshold = 5 * 60 * 1000; // 5 minutes in milliseconds
//   const timeUntilExpiration = tokenExpiration - Date.now();

//   // If token is within the refresh threshold, trigger a refresh
//   if (timeUntilExpiration < refreshThreshold) {
//     refreshAuthToken();
//   } else {
//     // Schedule a refresh check slightly before the expiration threshold
//     setTimeout(scheduleTokenRefresh, timeUntilExpiration - refreshThreshold);
//   }
// };

// // Function to refresh the access token
// const refreshAuthToken = async () => {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) return;

//     const response = await axios.post(
//       `${import.meta.env.VITE_BACKEND_API}/auth/refresh-token`,
//       { refreshToken }
//     );

//     const { accessToken, refreshToken: newRefreshToken } = response.data;

//     // Store the new tokens in localStorage
//     localStorage.setItem("accessToken", accessToken);
//     localStorage.setItem("refreshToken", newRefreshToken);

//     // Update the Axios instance Authorization header
//     AxiosInstance.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${accessToken}`;

//     // Reschedule the next token check
//     scheduleTokenRefresh();
//   } catch (error) {
//     console.error("Failed to refresh token:", error);
//     // Handle token refresh failure, such as redirecting to login if necessary
//   }
// };

// // Initialize token refresh scheduling on page load
// if (localStorage.getItem("accessToken")) {
//   scheduleTokenRefresh();
// }

// // Response Interceptor: Handle Token Refresh on 401
// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       originalRequest.url.includes("/auth/login") ||
//       error.response?.status !== 401
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await refreshAuthToken();
//         return AxiosInstance(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         setTimeout(() => {
//           window.location.href = "/auth/login";
//         }, 3000);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default AxiosInstance;

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
