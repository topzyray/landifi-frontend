import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../../../services/axiosInstance";
import { toast, ToastPosition } from "react-toastify";
import { amenities } from "../../../utils/index";
import { GlobalContext } from "../../../contexts/GlobalContext";
import ComponentLevelLoader from "../../../components/loaders/ComponentLevelLoader";

interface FormData {
  type: string;
  location: string;
  price: string;
  amenities: string[];
  images: File[];
}

const initialFormData = {
  type: "",
  location: "",
  price: "",
  amenities: [],
  images: [],
};

const AddProperty = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    const data = new FormData();
    data.append("type", formData.type);
    data.append("location", formData.location);
    data.append("price", formData.price.toString());
    formData.amenities.forEach((amenity) =>
      data.append("amenities[]", amenity)
    );
    formData.images.forEach((image) => data.append("images", image));

    AxiosInstance.post("/properties", data)
      .then((_) => {
        toast.success("Property added successfully.", {
          position: "top-right" as ToastPosition,
        });
        setTimeout(() => {
          navigate("/dashboard/landlord");
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
      formData.amenities &&
      formData.amenities.length > 0 &&
      formData.images &&
      formData.images.length > 0 &&
      formData.location &&
      formData.location.trim() !== "" &&
      formData.price &&
      formData.price.trim() &&
      formData.type &&
      formData.type.trim()
      ? true
      : false;
  };

  // Unified handleChange function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    // Check if the target is an input element to safely access checked
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked; // Type assertion here

      setFormData((prev) => {
        const amenities = checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((amenity) => amenity !== value);
        return { ...prev, amenities };
      });
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
    <div>
      <h1 className="font-medium text-lg">Add new property</h1>
      <div>
        <form
          className="w-full max-w-[25rem] flex flex-col gap-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <p className="">Add property form</p>

          {/* <input
            type="text"
            name="title"
            id="property-title"
            placeholder="Property Title"
            className="input"
          /> */}

          {/* <textarea
            id="description"
            name="description"
            placeholder="Property Description"
            required
            rows={4}
            className="input"
          /> */}

          <select
            name="type"
            id="type"
            className="select"
            onChange={handleChange}
          >
            <option value="">Listing Type</option>
            <option value="rent">Rent</option>
            <option value="sale">Sale</option>
          </select>

          {/* <select name="status" id="status" className="select">
            <option value="">Select status</option>
            <option value="available">Available</option>
            <option value="rented">Rented</option>
            <option value="sold">Sold</option>
            <option value="booked">Booked</option>
          </select> */}

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

          {/* <input
            type="text"
            name="city"
            id="city"
            placeholder="City"
            required
            autoComplete="city"
            className="input"
          /> */}

          {/* <input
            type="text"
            name="state"
            id="state"
            placeholder="State"
            required
            autoComplete="state"
            className="input"
          /> */}

          <section className="grid sm:grid-cols-2 gap-2 sm:gap-4">
            <section className="col-span-full input">
              <label className="w-full py-3 flex flex-col justify-center ">
                {/* <IoIosImages className="text-[2rem] text:w-[4rem]" />
                <span className="mt-2 text-base leading-normal">
                  Add images
                </span> */}
                <input
                  type="file"
                  multiple
                  className=""
                  name="images"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {formData.images.length && formData.images.length === 0 ? (
                <span>No image</span>
              ) : (
                <ul className="list-decimal list-inside mt-3 flex flex-wrap gap-2">
                  {formData.images.map((image, index) => (
                    <li key={image.name} className="text-sm">
                      {/* {image.name} */}
                      <div className="w-[100px] h-[50px]">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`preview-${index}`}
                          className="w-full h-full"
                        />
                      </div>
                      <button onClick={() => removeImage(index)}>Remove</button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="text-red-600 font-semibold text-sm">
                Max: 5 images
              </p>
            </section>
          </section>

          <input
            type="text"
            name="price"
            id="price"
            placeholder="Price"
            className="input"
            value={formData.price}
            onChange={handleChange}
          />

          <p>Amenities</p>

          <section className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3">
            {/* Amenities Checkboxes */}
            {amenities.map((amenity: string) => (
              <section
                key={amenity}
                className="md:flex md:items-center md:gap-0.5 mt-1"
              >
                <input
                  id={amenity}
                  name="amenities"
                  type="checkbox"
                  className="accent-gray-600 mr-1"
                  value={amenity}
                  checked={formData.amenities.includes(amenity)}
                  onChange={handleChange}
                />
                <label htmlFor={amenity} className="text-justify leading-0">
                  {amenity}
                </label>
              </section>
            ))}
          </section>

          <button
            type="submit"
            className="border px-3 py-1.5 md:py-2 rounded bg-gray-600 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={!validateFormInput()}
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
  );
};

export default AddProperty;
