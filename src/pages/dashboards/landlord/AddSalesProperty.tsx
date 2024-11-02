import { useContext, useState } from "react";
import { toast, ToastPosition } from "react-toastify";
import { GlobalContext } from "../../../contexts/GlobalContext";
import ComponentLevelLoader from "../../../components/loaders/ComponentLevelLoader";
import { SlCloudUpload } from "react-icons/sl";
import { CiSquareRemove } from "react-icons/ci";
import { createProperty } from "../../../services/property";
import { getErrorMessage } from "../../../utils/helpers";

interface FormData {
  images: File[];
  title: string;
  description: string;
  type: string;
  category: string;
  status: string;
  address: string;
  location: string;
  salePrice: string;
  isNegotiable: boolean;
  ownershipHistory: string;
}

const initialFormData = {
  images: [],
  title: "",
  description: "",
  type: "",
  category: "",
  status: "",
  address: "",
  location: "",
  salePrice: "",
  isNegotiable: true,
  ownershipHistory: "",
};

const AddSalesProperty = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("type", formData.type);
    data.append("category", formData.category);
    data.append("status", formData.status);
    data.append("address", formData.address);
    data.append("location", formData.location);
    data.append("salePrice", formData.salePrice);
    data.append("isNegotiable", formData.isNegotiable.toString());
    data.append("ownershipHistory", formData.ownershipHistory);
    formData.images.forEach((image) => data.append("images", image));

    createProperty("sales", data)
      .then(() => {
        toast.success("Property added successfully.", {
          position: "top-right" as ToastPosition,
        });
      })
      .catch((err) => {
        const errorMessage = getErrorMessage(err);
        toast.error(errorMessage, {
          position: "top-right" as ToastPosition,
        });
      })
      .finally(() => {
        setFormData(initialFormData);
        setComponentLevelLoader({ loading: false, id: "" });
      });
  };

  // TODO: Update this function to accommodate new feilds
  const validateFormInput = () => {
    return formData &&
      formData.images &&
      formData.images.length > 0 &&
      formData.title &&
      formData.title.trim() !== "" &&
      formData.description &&
      formData.description.trim() !== "" &&
      formData.type &&
      formData.type.trim() !== "" &&
      formData.category &&
      formData.category.trim() !== "" &&
      formData.status &&
      formData.status.trim() !== "" &&
      formData.address &&
      formData.address.trim() !== "" &&
      formData.location &&
      formData.location.trim() !== "" &&
      formData.salePrice &&
      formData.salePrice.trim()
      ? true
      : false;
  };

  // Unified handleChange function
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Check if the target is an input element to safely access checked
    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;

      if (name === "isNegotiable") {
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

  // Handle image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles], // Concatenate the existing images
      }));
    }
  };

  // Remove selected image
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="">
      <div className="space-y-4 md:space-y-6">
        <h1 className="font-medium text-lg uppercase rounded border px-2 py-0.5 w-max">
          Add new selling property page
        </h1>

        <div className="flex justify-center">
          <form
            className="w-full max-w-[33rem] flex flex-col gap-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <p className="font-semibold text-left md:text-center uppercase">
              New Property Sale Form
            </p>

            <input
              type="text"
              name="title"
              id="property-title"
              placeholder="Property Title"
              className="input"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              id="description"
              name="description"
              placeholder="Property Description"
              required
              rows={4}
              className="input"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="type"
              id="type"
              className="select"
              onChange={handleChange}
              value={formData.type}
            >
              <option value="">Listing Type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>

            <select
              name="category"
              id="category"
              className="select"
              onChange={handleChange}
              value={formData.category}
            >
              <option value="">Listing Category</option>
              <option value="Sale">Sale</option>
            </select>

            <select
              name="status"
              id="status"
              className="select"
              onChange={handleChange}
              value={formData.status}
            >
              <option value="">Listing Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
            </select>

            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              className="input"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              id="location"
              placeholder="Location"
              className="input"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <section className="grid sm:grid-cols-2 gap-2 sm:gap-4">
              <section className="col-span-full input">
                <label
                  className={`w-full py-3 flex flex-col justify-center items-center text-gray-400 ${
                    formData.images.length > 4
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <SlCloudUpload className="text-[2rem] text:w-[4rem" />
                  <span className="mt-2 text-base leading-normal">
                    Upload images
                  </span>
                  <input
                    type="file"
                    multiple
                    className="hidden disabled:cursor-context-menu"
                    name="images"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={formData.images.length > 4}
                  />
                </label>
                {formData.images.length && formData.images.length === 0 ? (
                  <span>No image</span>
                ) : (
                  <ul className="list-inside mt-3 flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                      <li key={index} className="text-sm">
                        {/* {image.name} */}
                        <div className="w-[80px] h-[50px]">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`preview-${index}`}
                            className="w-full h-full"
                          />
                        </div>
                        <p
                          onClick={() => removeImage(index)}
                          className="flex justify-end"
                        >
                          <CiSquareRemove className="text-xl text-red-600 border border-white" />
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-between items-center">
                  <p className="font-normal text-sm mt-2 flex gap-1.5">
                    <span> Upload count:</span>
                    <span>{formData.images.length}</span>
                  </p>
                  <p className="text-red-600 font-thin text-sm mt-2">
                    {formData.images.length > 4 && "Maximum upload reached"}
                  </p>
                </div>
              </section>
            </section>

            <input
              type="text"
              name="salePrice"
              id="salePrice"
              placeholder="Sale price"
              className="input"
              value={formData.salePrice}
              onChange={handleChange}
            />

            <section className="md:flex md:items-center md:gap-0.5 mt-1">
              <input
                id="isNegotiable"
                name="isNegotiable"
                type="checkbox"
                className="checkbox mr-1"
                checked={formData.isNegotiable}
                onChange={handleChange}
              />
              <label
                htmlFor="isNegotiable"
                className="text-justify leading-0 font-semibold"
              >
                Sale price negotiable
              </label>
            </section>

            <textarea
              id="ownershipHistory"
              name="ownershipHistory"
              placeholder="Owners history (if any)"
              rows={4}
              className="input"
              value={formData.ownershipHistory}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="border px-3 py-1.5 md:py-2 rounded bg-gray-600 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!validateFormInput() || componentLevelLoader.loading}
            >
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text="Adding Property"
                  color="#ffffff"
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                "Add Property"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSalesProperty;
