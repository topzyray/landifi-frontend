import { Link, useLocation } from "react-router-dom";
import { LeaseProperty, SaleProperty } from "../utils/types";
import ComponentLevelLoader from "./loaders/ComponentLevelLoader";

interface PropertyCardProps {
  data: LeaseProperty | SaleProperty;
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  isLandlord?: boolean;
  onUpdate?: () => void;
  onDelete?: () => void;
}

const PropertyCard = ({
  data,
  componentLevelLoader,
  isLandlord,
  onUpdate,
  onDelete,
}: PropertyCardProps) => {
  const location = useLocation(); // Get the current location
  const isInLandlordDashboard = location.pathname.startsWith(
    "/dashboard/landlord"
  );

  return (
    <div className="w-full sm:w-max shadow hover:shadow-orange-600 hover:cursor-pointer">
      <div className="w-full">
        <Link to={`/properties/${data._id}`}>
          <div className="h-44 w-full sm:w-60 relative">
            <img
              src={data.images[0].secure_url}
              alt={data.images[0].public_id}
              width={100}
              height={100}
              className="h-full w-full object-cover transition-all ease-in-out duration-300 group-hover:scale-125"
            />

            <div className="absolute z-10 top-0 m-2 rounded-full bg-dark-blue">
              <p
                className={`rounded-full px-2 p-1 text-[9px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 ${
                  data.category === "Sale" ? "bg-orange-600" : "bg-blue-600"
                }`}
              >
                {data.category}
              </p>
            </div>

            <div
              className={`absolute top-2 right-2 px-2 py-1 rounded-full text-[9px] font-semibold text-white uppercase ${
                data.status === "Available"
                  ? "bg-green-500"
                  : data.status === "Leased"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {data.status}
            </div>
          </div>

          {data.category && (
            <div className="space-y-2 px-2 py-4">
              <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
              <div className="flex justify-between items-center text-sm text-gray-700">
                <p className="font-semibold">
                  Price:{" "}
                  <span className="text-blue-600 font-bold">
                    {(data as LeaseProperty).annualRent
                      ? `$${(data as LeaseProperty).annualRent} / year`
                      : `$${(data as SaleProperty).salePrice}`}
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
          <div className="mt-2 flex justify-between border-t pt-2">
            <button
              className="w-full mx-2 text-white bg-blue-500 hover:bg-blue-600 px-2 py-1 "
              onClick={onUpdate}
            >
              Update
            </button>
            <button
              className="w-full mx-2 text-white bg-red-500 hover:bg-red-600 px-2 py-1 "
              onClick={onDelete}
            >
              {componentLevelLoader &&
              componentLevelLoader.loading &&
              componentLevelLoader.id === data._id ? (
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
