import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../services/axiosInstance";
import { toast, ToastPosition } from "react-toastify";
import { getErrorMessage } from "../utils/helpers";
import ComponentLevelLoader from "../components/loaders/ComponentLevelLoader";

const initialFormData = {
  email: "",
  firstName: "",
  lastName: "",
  description: "",
};

const ContactUs = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  let registrationEndpoint: string = formData.description;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Check if the target is an input element to safely access checked
    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;

      if (name === "isFurnished") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: isChecked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

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
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.firstName &&
      formData.firstName.trim() &&
      formData.lastName &&
      formData.lastName.trim() &&
      formData.description &&
      formData.description.trim() &&
      registrationEndpoint &&
      registrationEndpoint.trim()
      ? true
      : false;
  };
  return (
    <div>
      <div className="py-10 sm:py-16 lg:py-20 w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <div className="backdrop-blur-sm flex items-center justify-center rounded-xl w-full h-full px-2 md:px-4">
          <p className="font-bold text-2xl md:text-4xl lg:text-5xl  text-center text-transparent bg-clip-text bg-[url('assets/images/flat-lay-real-estate-concept_53876-14502.avif')] bg-cover bg-no-repeat bg-center uppercase drop-shadow-[-3px_-3px_1.2px_rgba(0,0,0,0.8)]">
            Contact Us Page
          </p>
        </div>
      </div>
      <div className="w-full flex items-start justify-center">
        <div className="w-full max-w-screen-sm mt-10 lg:mt-20 px-5">
          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <p className="mb-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-center">
              Contact Us Form
            </p>

            <input
              type="text"
              placeholder="First name"
              className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Enter email"
              className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows={4}
              className="input"
              value={formData.description}
              onChange={handleChange}
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
                "Submit Form"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
