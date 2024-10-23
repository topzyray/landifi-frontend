import { useState } from "react";
import AxiosInstance from "../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastPosition } from "react-toastify";

const EmailVerification = () => {
  const [formData, setFormData] = useState({
    verificationOTP: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    AxiosInstance.post("/auth/email-verification", formData)
      .then((res) => {
        toast.success(res.data, {
          position: "top-right" as ToastPosition,
        });
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
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
      formData.verificationOTP &&
      formData.verificationOTP.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="flex justify-center w-full pt-16 px-3 lg:px-[5rem]">
      <div className="bg-white w-full max-w-[18rem] lg:max-w-[22rem] px-4 py-6 rounded">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-medium text-center text-lg">Verify email</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            onChange={(e) =>
              setFormData({
                ...formData,
                verificationOTP: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="border px-3 py-1.5 md:py-2 rounded bg-gray-400 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!validateFormInput()}
          >
            Submit
          </button>
        </form>
        <p className="w-max text-sm font-light pt-4 text-left hover:underline">
          <Link to="/">Back Home</Link>
        </p>
      </div>
    </div>
  );
};

export default EmailVerification;
