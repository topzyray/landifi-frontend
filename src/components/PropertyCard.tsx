import { Link, useLocation, useNavigate } from "react-router-dom";
import { LeaseProperty, SaleProperty } from "../utils/types";
import ComponentLevelLoader from "./loaders/ComponentLevelLoader";
import { useAuth } from "../contexts/AuthContext";
import { savePropertyForTenant } from "../services/property";
import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { toast, ToastPosition } from "react-toastify";
import { getErrorMessage } from "../utils/helpers";

interface PropertyCardProps {
  data: LeaseProperty | SaleProperty;
  componentLevelLoader?: {
    loading: boolean;
    id: string;
  };
  isLandlord?: boolean;
  isTenant?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const PropertyCard = ({
  data,
  componentLevelLoader,
  isLandlord,
  isTenant,
  onUpdate,
  onDelete,
}: PropertyCardProps) => {
  const { user } = useAuth();
  const { setComponentLevelLoader } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const isInLandlordDashboard = location.pathname.startsWith(
    "/dashboard/landlord"
  );
  const isInTenantDashboard = location.pathname.startsWith("/dashboard/tenant");
  const propertyDetailsLink =
    isLandlord && isInLandlordDashboard
      ? `/dashboard/landlord/properties/${data?._id}`
      : isTenant && isInTenantDashboard
      ? `/dashboard/tenant/properties/${data?._id}`
      : `/properties/${data?._id}`;

  const handleSaveProperty = async (id: string) => {
    const response = await savePropertyForTenant(id);
    setComponentLevelLoader({ loading: true, id });
    if (response._id) {
      toast.success("Property safed successfully!", {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    } else {
      const errorMessage = getErrorMessage(response);
      toast.error(errorMessage, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  return (
    <div className="w-full sm:w-max shadow hover:shadow-orange-600/50 hover:cursor-pointer hover:scale-105 transition-all ease-in-out duration-300">
      <div className="w-full">
        <div className="h-44 w-full sm:w-60 relative">
          <img
            src={data?.images[0].secure_url}
            alt={data?.images[0].public_id}
            width={100}
            height={100}
            className="h-full w-full object-cover transition-all ease-in-out duration-300 group-hover:scale-125"
          />

          <div className="absolute top-0 m-2 rounded-full bg-dark-blue">
            <p
              className={`rounded-full px-2 p-1 text-[9px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 ${
                data?.category === "Sale" ? "bg-orange-600" : "bg-blue-600"
              }`}
            >
              {data?.category}
            </p>
          </div>

          <div
            className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[9px] font-semibold text-white uppercase ${
              data?.status === "Available"
                ? "bg-green-500"
                : data?.status === "Leased"
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
          >
            {data?.status}
          </div>

          <div
            className={`${
              user && user.userType == "landlord" && "hidden"
            } absolute bottom-2 right-2 px-2 py-1 rounded-full text-[9px] font-semibold text-white uppercase bg-red-600`}
          >
            {user && user.userType == "tenant" ? (
              <p onClick={() => handleSaveProperty(data._id)}>
                {componentLevelLoader &&
                componentLevelLoader.loading &&
                componentLevelLoader.id == data._id ? (
                  <ComponentLevelLoader
                    text="Saving"
                    color="red"
                    loading={
                      componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id == data._id
                    }
                  />
                ) : (
                  <span>Save</span>
                )}
              </p>
            ) : user?.userType == "landlord" ? (
              ""
            ) : (
              <p onClick={() => navigate("/auth/login")}>Login to save</p>
            )}
          </div>
        </div>
        <Link to={propertyDetailsLink}>
          {data && (
            <div className="space-y-2 px-2 py-4">
              <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <p className="font-semibold">
                  Price:{" "}
                  <span className="text-blue-600 font-bold">
                    {(data as LeaseProperty).annualRent
                      ? `₦${(data as LeaseProperty).annualRent} / year`
                      : `₦${(data as SaleProperty).salePrice}`}
                  </span>
                </p>
                <p className="capitalize">{data.type}</p>
              </div>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Location:</span> {data.location}
              </p>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Landlord:</span>{" "}
                {data.landlord.firstName} {data.landlord.lastName}
              </p>
            </div>
          )}
        </Link>

        {/* Update and Delete Buttons */}
        {isLandlord && isInLandlordDashboard && (
          <div className="mt-2 flex gap-3 border-t pt-2">
            <button className="btn btn-blue w-full" onClick={onUpdate}>
              Update
            </button>
            <button className="btn btn-danger w-full" onClick={onDelete}>
              {componentLevelLoader &&
              componentLevelLoader.loading &&
              componentLevelLoader.id === data?._id ? (
                <ComponentLevelLoader
                  text=""
                  color="#ffffff"
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                "Delete"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
