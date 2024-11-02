import { useContext, useEffect, useState } from "react";
import { toast, ToastPosition } from "react-toastify";
import { amenities } from "../../../utils/data";
import { GlobalContext } from "../../../contexts/GlobalContext";
import ComponentLevelLoader from "../../../components/loaders/ComponentLevelLoader";
import { SlCloudUpload } from "react-icons/sl";
import { CiSquareRemove } from "react-icons/ci";
import {
  getPropertyById,
  updatePropertyById,
} from "../../../services/property";
import { LeaseProperty } from "../../../utils/types";
import { useParams } from "react-router-dom";
import PageLevelLoader from "../../../components/loaders/PageLevelLoader";
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
  amenities: string[];
  annualRent: string;
  securityDeposit: string;
  isFurnished: boolean;
  leaseStartDate?: string;
  leaseEndDate?: string;
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
  amenities: [],
  annualRent: "",
  securityDeposit: "",
  isFurnished: false,
  leaseStartDate: "",
  leaseEndDate: "",
};

const UpdateLeaseProperty = () => {
  const [propertyDetailsData, setPropertyDetailsData] =
    useState<LeaseProperty | null>(null);

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const { propertyId } = useParams();

  const fetchPropertyById = async () => {
    setPageLevelLoader(true);
    const response = await getPropertyById(propertyId as string);
    if (response) {
      setPropertyDetailsData(response);
      setFormData({
        images: [],
        title: response.title,
        description: response.description,
        type: response.type,
        category: response.category,
        status: response.status,
        address: response.address,
        location: response.location,
        amenities: response.amenities || [],

        // Check for null/undefined before calling toString()
        annualRent:
          response.annualRent != null ? response.annualRent.toString() : "",
        securityDeposit:
          response.securityDeposit != null
            ? response.securityDeposit.toString()
            : "",

        isFurnished: response.isFurnished,
        leaseStartDate: response.leaseStartDate?.split("T")[0] || "",
        leaseEndDate: response.leaseEndDate?.split("T")[0] || "",
      });
      setPageLevelLoader(false);
    } else {
      // setPropertyDetailsData(null);
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    fetchPropertyById();
  }, [propertyId]);

  // Handle form data changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Check if the target is an input element to safely access checked
    if (type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;

      if (name === "amenities") {
        setFormData((prev) => {
          const amenities = isChecked
            ? [...prev.amenities, value]
            : prev.amenities.filter((amenity) => amenity !== value);
          return { ...prev, amenities };
        });
      } else if (name === "isFurnished") {
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

  // Handle image changes
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

  // Handles form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((image) => data.append("images", image));
      } else if (key === "amenities") {
        formData.amenities.forEach((amenity) =>
          data.append("amenities[]", amenity)
        );
      } else {
        data.append(key, (formData as any)[key]);
      }
    });

    updatePropertyById("leases", propertyId as string, data)
      .then(() => {
        toast.success("Property updated successfully.", {
          position: "top-right" as ToastPosition,
        });
        fetchPropertyById();
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

  // Remove selected image
  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // TODO: Update this function to accommodate new feilds
  const validateFormInput = () => {
    return formData &&
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
      formData.annualRent &&
      formData.annualRent.trim()
      ? true
      : false;
  };

  if (pageLevelLoader) {
    return <PageLevelLoader loading={pageLevelLoader} />;
  }
  return (
    <>
      {propertyDetailsData !== null && !pageLevelLoader && (
        <div className="">
          <div className="space-y-4 md:space-y-6">
            <h1 className="font-medium text-lg uppercase rounded border px-2 py-0.5 w-max">
              Update lease property page
            </h1>

            <div className="flex justify-center">
              <form
                className="w-full max-w-[33rem] flex flex-col gap-4"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
              >
                <p className="font-semibold text-left md:text-center uppercase">
                  Update Property Lease Form
                </p>

                <p className="text-sm font-semibold text-left md:text-center uppercase">
                  Property ID: {propertyDetailsData._id}
                </p>

                {/* <input
                  type="text"
                  name="occupant"
                  id="occupant"
                  placeholder="Occupant"
                  className="input"
                  value={formData.occupant}
                  onChange={handleChange}
                /> */}

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
                  disabled
                >
                  <option value="">Listing Category</option>
                  <option value="Lease">Lease</option>
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
                  <option value="Leased">Leased</option>
                </select>

                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  className="input"
                  value={formData.address}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Location"
                  className="input"
                  value={formData.location}
                  onChange={handleChange}
                />

                {formData.images.length === 0 && (
                  <section>
                    {/* Populate existing images */}
                    <h2 className="font-semibold uppercase">Existing Images</h2>
                    <ul className="list-inside flex flex-wrap gap-2">
                      {propertyDetailsData.images.map((image) => (
                        <li key={image.public_id} className="text-sm">
                          <div className="w-[80px] h-[50px]">
                            <img
                              src={image.secure_url}
                              alt={`preview-${image.public_id}`}
                              className="w-full h-full"
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

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
                  name="annualRent"
                  id="annualRent"
                  placeholder="Annual rent"
                  className="input"
                  value={formData.annualRent}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  name="securityDeposit"
                  id="securityDeposit"
                  placeholder="Security deposit"
                  className="input"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                />

                <section className="input">
                  <p className="font-semibold mb-1 text-lg underline">
                    Amenities/Facilities
                  </p>
                  <section className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 ">
                    {amenities.map((amenity: string) => (
                      <section
                        key={amenity}
                        className="md:flex md:items-center md:gap-0.5 mt-1"
                      >
                        <input
                          id={amenity}
                          name="amenities"
                          type="checkbox"
                          className="checkbox mr-1"
                          value={amenity}
                          checked={formData.amenities.includes(amenity)}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor={amenity}
                          className="text-justify leading-0"
                        >
                          {amenity}
                        </label>
                      </section>
                    ))}
                  </section>
                </section>

                <section className="input">
                  <p className="font-semibold mb-1 text-lg underline">
                    Furnish status
                  </p>
                  <section className="md:flex md:items-center md:gap-0.5 mt-1">
                    <input
                      id="isFurnished"
                      name="isFurnished"
                      type="checkbox"
                      className="checkbox mr-1"
                      checked={formData.isFurnished}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="isFurnished"
                      className="text-justify leading-0"
                    >
                      Property is furnished
                    </label>
                  </section>
                </section>

                <section className="flex flex-col gap-1">
                  <label htmlFor="leaseStartDate" className="font-medium">
                    Lease Start Date
                  </label>
                  <input
                    id="leaseStartDate"
                    type="date"
                    name="leaseStartDate"
                    className="input"
                    value={formData.leaseStartDate}
                    onChange={handleChange}
                  />
                </section>

                <section className="flex flex-col gap-1">
                  <label htmlFor="leaseEndDate" className="font-medium">
                    Lease End Date
                  </label>
                  <input
                    id="leaseEndDate"
                    type="date"
                    name="leaseEndDate"
                    className="input"
                    value={formData.leaseEndDate}
                    onChange={handleChange}
                  />
                </section>

                <button
                  type="submit"
                  className="border px-3 py-1.5 md:py-2 rounded bg-gray-600 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={
                    !validateFormInput() || componentLevelLoader.loading
                  }
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text="Updating Property"
                      color="#ffffff"
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Update Property"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateLeaseProperty;
