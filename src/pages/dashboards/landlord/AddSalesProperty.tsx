import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../../services/axiosInstance';
import { toast, ToastPosition } from 'react-toastify';
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
  salePrice: string;
  isNegotiable: boolean;
  ownershipHistory?: string;
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
  salePrice: '',
  isNegotiable: true,
  ownershipHistory: '',
};

const AddSalesProperty = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: '' });

    const data = new FormData();
    data.append('type', formData.type);
    data.append('location', formData.location);
    data.append('price', formData.salePrice.toString());
    formData.images.forEach((image) => data.append('images', image));

    AxiosInstance.post('/properties/sale', data)
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
      formData.images &&
      formData.images.length > 0 &&
      formData.location &&
      formData.location.trim() !== '' &&
      formData.salePrice &&
      formData.salePrice.trim() &&
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

      if (name === 'isFurnished') {
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
          <p className="">Sale Property Form</p>

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
            name="salePrice"
            id="salePrice"
            placeholder="Annual rent"
            className="input"
            value={formData.salePrice}
            onChange={handleChange}
          />

          <section className="md:flex md:items-center md:gap-0.5 mt-1">
            <input
              id="isNegotiable"
              name="isNegotiable"
              type="checkbox"
              className="accent-gray-600 mr-1"
              // value={formData.isFurnished}
              checked={formData.isNegotiable}
              onChange={handleChange}
            />
            <label htmlFor="isNegotiable" className="text-justify leading-0">
              Negotiable
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

export default AddSalesProperty;
