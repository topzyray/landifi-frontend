import { useContext, useState } from "react";
import ComponentLevelLoader from "./loaders/ComponentLevelLoader";
import { GlobalContext } from "../contexts/GlobalContext";

type FormDataType = {
  email: string;
};

const Newsletter = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: "",
  });

  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const validateFormInput = () => {
    return formData && formData.email && formData.email.trim() ? true : false;
  };

  return (
    <>
      <h4 className="pb-2 text-base lg:text-lg font-bold sm:mb-4">
        Get Our Latest Offerings at Landifi
      </h4>
      {/* <p className="pb-2 text-sm font-normal sm:mb-3">
            Receive Landifi latest updates in your inbox
          </p> */}
      <div className="flex flex-wrap gap-1">
        <div className="w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            autoComplete="email"
            className="input text-gray-600 font-normal w-full max-w-[20rem]"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          type="button"
          className="btn btn-primary-outline"
          disabled={!validateFormInput() || componentLevelLoader.loading}
        >
          {componentLevelLoader && componentLevelLoader.loading ? (
            <ComponentLevelLoader
              text="Loading"
              color="#ffffff"
              loading={componentLevelLoader && componentLevelLoader.loading}
            />
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
    </>
  );
};

export default Newsletter;
