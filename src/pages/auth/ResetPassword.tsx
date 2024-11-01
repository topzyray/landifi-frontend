import { useContext, useState } from 'react';
import AxiosInstance from '../../services/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastPosition } from 'react-toastify';
import ComponentLevelLoader from '../../components/loaders/ComponentLevelLoader';
import { GlobalContext } from '../../contexts/GlobalContext';

const initialFormData = {
  resetOTP: '',
  newPassword: '',
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: '' });

    AxiosInstance.put('/auth/reset-password', formData)
      .then((res) => {
        toast.success(res.data, {
          position: 'top-right' as ToastPosition,
        });
        setTimeout(() => {
          navigate('/auth/login');
        }, 5000);
      })
      .catch((err) => {
        toast.error(
          err.response.data.errorDetails.message ||
            err.response.data.errorDetails.message[0] ||
            'Something went wrong!',
          {
            position: 'top-right' as ToastPosition,
          }
        );
      })
      .finally(() => {
        setComponentLevelLoader({ loading: false, id: '' });
      });
  };

  const validateFormInput = () => {
    return formData &&
      formData.resetOTP &&
      formData.resetOTP.trim() !== '' &&
      formData.newPassword &&
      formData.newPassword.trim() !== ''
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
          <p className="font-medium text-center text-lg">Reset password</p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            value={formData.resetOTP}
            onChange={(e) =>
              setFormData({
                ...formData,
                resetOTP: e.target.value,
              })
            }
          />
          <input
            type="password"
            placeholder="Enter new password"
            className="border border-gray-400 px-3 py-1.5 md:py-2 rounded outline-none"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                newPassword: e.target.value,
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
              'Submit'
            )}
          </button>
        </form>
        {/* <p className="w-max text-sm font-light pt-4 text-left hover:underline">
          <Link to="/">Back Home</Link>
        </p> */}
      </div>
    </div>
  );
};

export default ResetPassword;
