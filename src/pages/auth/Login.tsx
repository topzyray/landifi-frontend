import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosInstance from "../../api/axiosInstance";
import { toast, ToastPosition } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    AxiosInstance.post("/auth/login", formData)
      .then((res) => {
        console.log(res);
        toast.success(res.data, {
          position: "top-right" as ToastPosition,
        });
        setTimeout(() => {
          // TODO: Navigate to Dashboard depending on the role
          // navigate("/auth/login");
        }, 2000);
      })
      .catch((err) => {
        if (typeof err.response.data.errorDetails.message == "string") {
          toast.error(err.response.data.errorDetails.message, {
            position: "top-right" as ToastPosition,
          });
        } else if (typeof err.response.data.errorDetails.message == "object") {
          toast.error(err.response.data.errorDetails.message[0], {
            position: "top-right" as ToastPosition,
          });
        }
      });
  };

  const validateFormInput = () => {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="flex justify-center w-full pt-16 px-3 lg:px-[5rem]">
      <div className="bg-white w-full max-w-[18rem] lg:max-w-[22rem] px-4 py-6 rounded">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-medium text-center text-lg">Welcome back</p>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Enter password"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />
          <p className="font-light text-sm cursor-pointer">
            <Link to="../auth/forgotpassword" className="underline">
              Forgot password
            </Link>
          </p>
          <button
            type="submit"
            className="border px-3 py-1.5 md:py-2 rounded bg-gray-400 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!validateFormInput()}
          >
            Login
          </button>

          <p className="text-center font-light text-sm cursor-pointer">
            Don't have an account{" "}
            <Link to="../auth/register" className="underline">
              Register
            </Link>
          </p>
        </form>
        <p className="w-max text-sm font-light pt-4 text-left hover:underline">
          <Link to="/">Back Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
