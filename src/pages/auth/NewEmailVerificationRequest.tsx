import { useContext, useState } from "react";
import AxiosInstance from "../../services/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastPosition } from "react-toastify";
import { GlobalContext } from "../../contexts/GlobalContext";
import ComponentLevelLoader from "../../components/loaders/ComponentLevelLoader";
import { getErrorMessage } from "../../utils/helpers";

const initialFormData = {
  email: "",
};
const NewEmailVerificationRequest = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    AxiosInstance.post("/auth/new-verification-request", formData)
      .then((res) => {
        toast.success(res.data, {
          position: "top-right" as ToastPosition,
        });
        if (
          res.data ==
          "User with email: topzyray@yahoo.com already verified. Please login."
        ) {
          setTimeout(() => {
            navigate("/auth/login");
          }, 5000);
        } else {
          setTimeout(() => {
            navigate("/auth/emailverification");
          }, 5000);
        }
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        toast.error(errorMessage, {
          position: "top-right" as ToastPosition,
        });
      })
      .finally(() => {
        setComponentLevelLoader({ loading: false, id: "" });
      });
  };

  const validateFormInput = () => {
    return formData && formData.email && formData.email.trim() !== ""
      ? true
      : false;
  };

  return (
    <div className="flex justify-center w-full pt-16 px-2 lg:px-[5rem]">
      <div className="bg-white w-full max-w-[18rem] lg:max-w-[22rem] py-6 px-4 rounded">
        <Link to="/" className="">
          <p className="mb-2 text-orange-700 text-center font-bold md:text-lg hover:underline uppercase">
            Landifi
          </p>
        </Link>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-medium text-center text-lg">
            Get new verification OTP
          </p>
          <input
            type="email"
            placeholder="Enter email"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="border px-3 py-1.5 md:py-2 rounded bg-gray-600 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!validateFormInput()}
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text="Loading"
                color="#ffffff"
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : (
              "Resend OTP"
            )}
          </button>
        </form>
        <p className="text-center font-light text-sm cursor-pointer mt-3 hover:underline">
          <Link to="/auth/login">Back Login</Link>
        </p>
      </div>
    </div>
  );
};

export default NewEmailVerificationRequest;
