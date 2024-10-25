import { useAuth } from "../contexts/AuthContext";
import AxiosInstance from "../services/axiosInstance";
import { toast, ToastPosition } from "react-toastify";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

interface User {
  userId: string;
  userType: "landlord" | "tenant" | "admin";
}

export const useLogin = () => {
  const { setUser } = useAuth(); // Move `useAuth()` outside `login`

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      const authResponse = await AxiosInstance.post<AuthResponse>(
        "/auth/login",
        credentials
      );
      console.log(authResponse.data);

      const { userId, accessToken, refreshToken } = authResponse.data;

      // Store tokens in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Fetch user data using AxiosInstance
      const userResponse = await AxiosInstance.get<User>(`/users/${userId}`);
      const userData = userResponse.data;

      // Save user to localStorage and update context
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      toast.success("Login successful. Redirecting to dashboard.", {
        position: "top-right" as ToastPosition,
      });

      return userData;
    } catch (err: any) {
      console.log(err);
      toast.error("Login failed. Please check credentials.", {
        position: "top-right" as ToastPosition,
      });
      throw new Error("Failed to log in.");
    }
  };

  return { login };
};