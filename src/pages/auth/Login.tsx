import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../utils/hooks";
import { GlobalContext } from "../../contexts/GlobalContext";
import ComponentLevelLoader from "../../components/loaders/ComponentLevelLoader";

const initialFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const { login } = useLogin();
  // const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });
    // setError(null);

    try {
      const response = await login({ ...formData });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);

      setTimeout(() => {
        // Navigate to Dashboard depending on the role
        if (response.userType === "landlord") {
          setTimeout(() => {
            navigate("/dashboard/landlord");
          }, 3000);
        } else if (response.userType === "tenant") {
          setTimeout(() => {
            navigate("/dashboard/tenant");
          }, 3000);
        } else if (response.userType === "admin") {
          setTimeout(() => {
            navigate("/dashboard/admin");
          }, 3000);
        } else {
          return;
        }
      }, 2000);

      // Redirect or perform other post-login actions
    } catch (err: any) {
      // setError(err.message);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  const validateFormInput = () => {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
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
          <p className="font-medium text-center text-lg">Welcome back</p>
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
          <p className="font-light text-sm cursor-pointer">
            <Link to="/auth/forgotpassword" className="underline">
              Forgot password
            </Link>
          </p>
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
              "Login"
            )}
          </button>

          <p className="text-center font-light text-sm cursor-pointer">
            Don't have an account{" "}
            <Link to="/auth/register" className="underline">
              Register
            </Link>
          </p>
          <p className="text-center font-light text-sm cursor-pointer">
            Request new verification OTP{" "}
            <Link to="/auth/newemailverificationrequest" className="underline">
              Here
            </Link>
          </p>
        </form>
        {/* <p className="w-max text-sm font-light pt-4 text-left hover:underline">
          <Link to="/">Back Home</Link>
        </p> */}
      </div>
    </div>
  );
};

export default Login;

// login({ ...formData })
//   .then((res) => setError(null))
//   .catch((err) => {
//     console.log(err);

//     setError("Something went wrong!");
//     toast.error(error, {
//       position: "top-right" as ToastPosition,
//     });
//   });

// AxiosInstance.post("/auth/login", formData)
//   .then((res) => {
//     console.log(res.data);
//     localStorage.setItem("accessToken", res.data.accessToken);
//     localStorage.setItem("refreshToken", res.data.refreshToken);
//     localStorage.setItem("userId", res.data.userId);
//     toast.success(res.data, {
//       position: "top-right" as ToastPosition,
//     });
//     setTimeout(() => {
//       // TODO: Navigate to Dashboard depending on the role
//       navigate("/dashboard/landlord/addproperty");
//     }, 5000);
//   })
//   .catch((err) => {
//     console.log(err.response.data.errorDetails.message);
//     if (typeof err.response.data.errorDetails.message == "string") {
//       toast.error(err.response.data.errorDetails.message, {
//         position: "top-right" as ToastPosition,
//       });
//     } else if (typeof err.response.data.errorDetails.message == "object") {
//       toast.error(err.response.data.errorDetails.message[0], {
//         position: "top-right" as ToastPosition,
//       });
//     }
//   });
