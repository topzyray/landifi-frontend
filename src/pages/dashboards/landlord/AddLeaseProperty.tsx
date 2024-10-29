import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../services/axiosInstance';
import { toast, ToastPosition } from 'react-toastify';
import { amenities } from '../../../utils/index';
import { GlobalContext } from '../../../contexts/GlobalContext';
import ComponentLevelLoader from '../../../components/loaders/ComponentLevelLoader';
import { IoIosRemoveCircle } from 'react-icons/io';

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
}

const initialFormData = {
  images: [],
  title: '',
  description: '',
  type: '',
  category: '',
  status: '',
  address: '',
  location: '',
  amenities: [],
  annualRent: '',
  securityDeposit: '',
  isFurnished: false,
};

// TODO: Add leaseStartDate and leaseEndDate when updating

const AddLeaseProperty = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: '' });

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('type', formData.type);
    data.append('category', formData.category);
    data.append('status', formData.status);
    data.append('address', formData.address);
    data.append('location', formData.location);
    formData?.amenities?.forEach((amenity) =>
      data.append('amenities[]', amenity)
    );
    data.append('annualRent', formData.annualRent.toString());
    data.append('securityDeposit', formData.securityDeposit.toString());
    data.append('isFurnished', formData.isFurnished.toString());
    formData.images.forEach((image) => data.append('images', image));

    AxiosInstance.post('/properties/lease', data)
      .then(() => {
        toast.success('Property added successfully.', {
          position: 'top-right' as ToastPosition,
        });
        setTimeout(() => {
          navigate('/dashboard/landlord');
        }, 5000);
      })
      .catch((err) => {
        if (typeof err.response.data.errorDetails.message == 'string') {
          toast.error(err.response.data.errorDetails.message, {
            position: 'top-right' as ToastPosition,
          });
        } else if (typeof err.response.data.errorDetails.message == 'object') {
          toast.error(err.response.data.errorDetails.message[0], {
            position: 'top-right' as ToastPosition,
          });
        } else {
          toast.error('Something went wrong!', {
            position: 'top-right' as ToastPosition,
          });
        }
      })
      .finally(() => {
        setFormData(initialFormData);
        setComponentLevelLoader({ loading: false, id: '' });
      });
  };

  // TODO: Update this function to accommodate new feilds
  const validateFormInput = () => {
    return formData &&
      formData.amenities &&
      formData.amenities.length > 0 &&
      formData.images &&
      formData.images.length > 0 &&
      formData.location &&
      formData.location.trim() !== '' &&
      formData.annualRent &&
      formData.annualRent.trim() &&
      formData.type &&
      formData.type.trim()
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
    if (type === 'checkbox') {
      const isChecked = (e.target as HTMLInputElement).checked;

      if (name === 'amenities') {
        setFormData((prev) => {
          const amenities = isChecked
            ? [...prev.amenities, value]
            : prev.amenities.filter((amenity) => amenity !== value);
          return { ...prev, amenities };
        });
      } else if (name === 'isFurnished') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: isChecked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
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
          <p className="">Lease Property Form</p>

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
            <option value="Land">Commercial</option>
          </select>

          <select
            name="category"
            id="category"
            className="select"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="">Listing Category</option>
            <option value="Lease">Lease</option>
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
            <option value="Leased">Leased</option>
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
                        <button onClick={() => removeImage(index)}>
                          <IoIosRemoveCircle className="text-xl text-red-600 border border-white" />
                        </button>
                      </div>
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

          <p>Amenities/Facilities</p>

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

          <section className="md:flex md:items-center md:gap-0.5 mt-1">
            <input
              id="isFurnished"
              name="isFurnished"
              type="checkbox"
              className="accent-gray-600 mr-1"
              // value={formData.isFurnished}
              checked={formData.isFurnished}
              onChange={handleChange}
            />
            <label htmlFor="isFurnished" className="text-justify leading-0">
              Furnished
            </label>
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
              'Add Property'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeaseProperty;
