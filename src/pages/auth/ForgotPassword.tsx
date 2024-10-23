import { useState } from "react";
import AxiosInstance from "../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastPosition } from "react-toastify";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    AxiosInstance.post("/auth/forgot-password", formData)
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-right" as ToastPosition,
        });
        setTimeout(() => {
          navigate("/auth/resetpassword");
        }, 3000);
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
    return formData && formData.email && formData.email.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="flex justify-center w-full pt-16 px-3 lg:px-[5rem]">
      <div className="bg-white w-full max-w-[18rem] lg:max-w-[22rem] px-4 py-6 rounded">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-medium text-center text-lg">Forgot password</p>
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
          <button
            type="submit"
            className="border px-3 py-1.5 md:py-2 rounded bg-gray-400 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!validateFormInput()}
          >
            Send password reset
          </button>
        </form>
        <p className="w-max text-sm font-light pt-4 text-left hover:underline">
          <Link to="/">Back Home</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
