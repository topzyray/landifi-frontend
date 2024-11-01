import { useAuth, User } from "../../../contexts/AuthContext";
import ChangePasswordModal from "../../../components/Modal";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import ComponentLevelLoader from "../../../components/loaders/ComponentLevelLoader";
import { toast, ToastPosition } from "react-toastify";
import {
  getUserById,
  updateUserPassword,
  updateUserRecordById,
} from "../../../services/user";
import PageLevelLoader from "../../../components/loaders/PageLevelLoader";
import { CiSquareRemove } from "react-icons/ci";
import PlaceholderProfile from "../../../assets/images/placeholder-profile.jpeg";

interface FormData {
  image: File | null;
  firstName: string;
  lastName: string;
  gender: string;
  about: string;
  phone: string;
  age: string;
  occupation: string;
  address: string;
  location: string;
}

const initialChangePasswordFormData = {
  oldPassword: "",
  newPassword: "",
};

const initialFormData: FormData = {
  image: null,
  firstName: "",
  lastName: "",
  gender: "",
  about: "",
  phone: "",
  age: "",
  occupation: "",
  address: "",
  location: "",
};

const LandlordProfile = () => {
  const { user, setUser } = useAuth();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [updateUserFormData, setUpdateUserFormData] =
    useState<FormData>(initialFormData);
  const [openPasswordChangeModal, setOpenPasswordChangeModal] = useState(false);
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);
  const [changePasswordFormData, setChangePasswordFormData] = useState(
    initialChangePasswordFormData
  );

  const fetchUserById = async () => {
    setPageLevelLoader(true);
    const response = await getUserById(user?._id as string);

    if (response) {
      setCurrentUser(response);
      setUpdateUserFormData({
        image: null,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        about: response.about,
        phone: response.phone,
        age: response.age,
        occupation: response.occupation,
        address: response.address,
        location: response.location,
      });
      localStorage.setItem("user", JSON.stringify(response));
      setUser(response);
      setPageLevelLoader(false);
    } else {
      toast.error("Error fetching user data", {
        position: "top-right" as ToastPosition,
      });
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    if (user?._id) fetchUserById();
  }, []);

  // Handle form data changes
  const handleUpdateDataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdateUserFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image changes
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setUpdateUserFormData((prev) => ({ ...prev, image: file }));
    }
  };

  // Handles form submission
  const handleSubmitUserRecord = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    const data = new FormData();
    Object.keys(updateUserFormData).forEach((key) => {
      const value = (updateUserFormData as any)[key];
      // Only append "image" if it has a valid file object
      if (key === "image" && value instanceof File) data.append("image", value);
      else data.append(key, value);
    });

    const response = await updateUserRecordById(
      currentUser?._id as string,
      data
    );

    setComponentLevelLoader({ loading: false, id: "" });

    if (response.error) {
      toast.error(response.errorDetails.message, {
        position: "top-right" as ToastPosition,
      });
    } else {
      toast.success("Profile updated successfully!", {
        position: "top-right" as ToastPosition,
      });
      fetchUserById(); // Refresh data after update
    }
  };

  const removeImage = () =>
    setUpdateUserFormData((prev) => ({ ...prev, image: null }));

  const validateUpdateFormInput = () => {
    return (
      updateUserFormData.firstName &&
      updateUserFormData.firstName.trim() &&
      updateUserFormData.lastName &&
      updateUserFormData.lastName.trim() &&
      updateUserFormData.gender &&
      updateUserFormData.gender.trim() &&
      updateUserFormData.about &&
      updateUserFormData.about.trim() &&
      updateUserFormData.phone &&
      updateUserFormData.phone.trim() &&
      updateUserFormData.occupation &&
      updateUserFormData.occupation.trim() &&
      updateUserFormData.address &&
      updateUserFormData.address.trim() &&
      updateUserFormData.location &&
      updateUserFormData.location.trim()
    );
  };

  const handleUpdateDataChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });

    const response = await updateUserPassword(changePasswordFormData);
    if (response.error) {
      toast.error(response.errorDetails.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      toast.success(response, {
        position: "top-right" as ToastPosition,
      });
      setChangePasswordFormData(initialChangePasswordFormData);
      setComponentLevelLoader({ loading: false, id: "" });
      setTimeout(() => {
        setOpenPasswordChangeModal(false);
      }, 5000);
    }
  };

  const validateChangPasswordFormInput = () => {
    return changePasswordFormData &&
      changePasswordFormData.oldPassword &&
      changePasswordFormData.oldPassword.trim() &&
      changePasswordFormData.newPassword &&
      changePasswordFormData.newPassword.trim()
      ? true
      : false;
  };

  if (pageLevelLoader) {
    return <PageLevelLoader loading={pageLevelLoader} />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-md mx-auto">
      <div className="mt-0 lg:mt-4 flex justify-center items-center">
        <div className="w-full max-w-[25rem] flex items-center justify-start gap-3">
          {/* Profile Picture */}
          <div className="">
            <div className="h-16 w-16 overflow-hidden rounded-full border border-gray-300">
              <img
                src={currentUser?.image?.secure_url || PlaceholderProfile}
                alt="profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Name and Email */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-600 text-sm">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center">
        <form
          className="w-full max-w-[25rem] flex flex-col gap-4"
          onSubmit={handleSubmitUserRecord}
          encType="multipart/form-data"
        >
          <p className="font-semibold text-left md:text-center uppercase">
            User Data
          </p>

          <section className="grid sm:grid-cols-2 gap-2 sm:gap-4">
            <section className="col-span-full input">
              {updateUserFormData.image === null ? (
                <span>No image</span>
              ) : (
                <ul className="mt-3 flex justify-center ">
                  {updateUserFormData.image && (
                    <div className="flex flex-col">
                      <div className="w-20 h-20">
                        <img
                          src={URL.createObjectURL(updateUserFormData?.image)}
                          alt={`preview`}
                          className="w-full h-full rounded-full
                          "
                        />
                      </div>
                      <p
                        onClick={removeImage}
                        className="text-center flex justify-center"
                      >
                        <CiSquareRemove className="text-xl text-red-600 border border-white" />
                      </p>
                    </div>
                  )}
                </ul>
              )}
              <label
                className={`w-full py-3 flex flex-col justify-center items-center text-gray-400 cursor-pointer ${
                  updateUserFormData.image !== null && "hidden"
                }`}
              >
                <span className="text-4xl">📸</span>
                <span className="mt-2 text-base leading-normal">
                  Upload Profile image
                </span>
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </section>
          </section>

          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="📛 First name"
            className="input"
            value={updateUserFormData.firstName ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="📛 Last name"
            className="input"
            value={updateUserFormData.lastName ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            className="input disabled: cursor-not-allowed"
            value={currentUser?.email ?? ""}
            disabled
          />

          <select
            value={updateUserFormData.gender ?? ""}
            onChange={handleUpdateDataChange}
            name="gender"
            id="gender"
            className="select"
          >
            <option value="">🧑‍🦱 Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          <textarea
            id="about"
            name="about"
            placeholder="ℹ About me"
            rows={4}
            className="input"
            value={updateUserFormData.about ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="📞 Phone number"
            className="input"
            value={updateUserFormData.phone ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="text"
            name="age"
            id="age"
            placeholder="🔢 Age"
            className="input"
            value={updateUserFormData.age ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="text"
            name="occupation"
            id="occupation"
            placeholder="🏢 Occupation"
            className="input"
            value={updateUserFormData.occupation ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="text"
            name="address"
            id="address"
            placeholder="📌 Address"
            className="input"
            value={updateUserFormData.address ?? ""}
            onChange={handleUpdateDataChange}
          />

          <input
            type="text"
            name="location"
            id="location"
            placeholder="🗺️ Location"
            className="input"
            value={updateUserFormData.location ?? ""}
            onChange={handleUpdateDataChange}
          />

          <button
            type="submit"
            className="border px-3 py-1.5 md:py-2 rounded bg-gray-600 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={
              !validateUpdateFormInput() || componentLevelLoader.loading
            }
          >
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text="Updating Property"
                color="#ffffff"
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </div>

      <div className="mt-2 flex justify-center items-center">
        <div className="w-full max-w-[25rem]">
          <button
            onClick={() => setOpenPasswordChangeModal(true)}
            type="button"
            className="mt-6 w-full
         btn btn-blue"
          >
            Change Password
          </button>
        </div>
      </div>

      <ChangePasswordModal
        open={openPasswordChangeModal}
        onClose={() => setOpenPasswordChangeModal(false)}
        className="bg-black/70"
      >
        <div>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={handleUpdateDataChangePassword}
          >
            <p className="font-medium text-center text-lg md:text-xl">
              Update Password Form
            </p>
            <input
              type="password"
              placeholder="Old password"
              className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
              value={changePasswordFormData.oldPassword}
              onChange={(e) =>
                setChangePasswordFormData({
                  ...changePasswordFormData,
                  oldPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="New password"
              className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
              value={changePasswordFormData.newPassword}
              onChange={(e) =>
                setChangePasswordFormData({
                  ...changePasswordFormData,
                  newPassword: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="border px-3 py-1.5 md:py-2 rounded bg-gray-600 text-white font-medium hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={!validateChangPasswordFormInput()}
            >
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text="Updating"
                  color="#ffffff"
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                "Update Password"
              )}
            </button>
            <button
              onClick={() => setOpenPasswordChangeModal(false)}
              type="button"
              className="btn btn-danger w-max mx-auto"
            >
              Cancel
            </button>
          </form>
        </div>
      </ChangePasswordModal>
    </div>
  );
};

export default LandlordProfile;
