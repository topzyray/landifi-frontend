import { useContext, useState } from "react";
import AxiosInstance from "../../services/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastPosition } from "react-toastify";
import { GlobalContext } from "../../contexts/GlobalContext";
import ComponentLevelLoader from "../../components/loaders/ComponentLevelLoader";

const initialFormData = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  userType: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  let registrationEndpoint: string = formData.userType;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    AxiosInstance.post(`/${registrationEndpoint}s`, formData)
      .then((res) => {
        toast.success(res.data, {
          position: "top-right" as ToastPosition,
        });
        setTimeout(() => {
          navigate("/auth/emailverification");
        }, 5000);

        setFormData(initialFormData);
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
        } else {
          toast.error("Something went wrong!", {
            position: "top-right" as ToastPosition,
          });
        }
      })
      .finally(() => {
        setFormData(initialFormData);
        setComponentLevelLoader({ loading: false, id: "" });
      });
  };

  const validateFormInput = () => {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== "" &&
      formData.firstName &&
      formData.firstName.trim() &&
      formData.lastName &&
      formData.lastName.trim() &&
      formData.userType &&
      formData.userType.trim() &&
      registrationEndpoint &&
      registrationEndpoint.trim()
      ? true
      : false;
  };

  return (
    <div className="flex justify-center w-full pt-16 px-3 lg:px-[5rem]">
      <div className="bg-white w-full max-w-[18rem] lg:max-w-[22rem] px-4 py-6 rounded">
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <p className="font-medium text-center text-lg">Create an account</p>
          <select
            name="userType"
            id=""
            value={formData.userType}
            onChange={(e) =>
              setFormData({
                ...formData,
                userType: e.target.value,
              })
            }
            className="select"
          >
            <option>Select Role</option>
            <option value="landlord">Landlord</option>
            <option value="tenant">Tenant</option>
          </select>
          <input
            type="text"
            placeholder="First name"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({
                ...formData,
                firstName: e.target.value,
              })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({
                ...formData,
                lastName: e.target.value,
              })
            }
          />
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
          <input
            type="password"
            placeholder="Enter password"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
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
              "Register"
            )}
          </button>

          <p className="text-center font-light text-sm cursor-pointer">
            Already have an account{" "}
            <Link to="../auth/login" className="underline">
              Login
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

export default Register;
