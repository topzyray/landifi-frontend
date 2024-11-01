import { LeaseProperty, SaleProperty } from "../utils/types";
import PropertyDetailLayout from "../pages/property_details/PropertyDetailLayout";
import Navbar from "../pages/property_details/Navbar";
import { usePropertyContext } from "../contexts/PropertyContext";
import ComponentLevelLoader from "./loaders/ComponentLevelLoader";
import { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { useLocation } from "react-router-dom";
import RentPropertyButton from "./action_buttons/RentPropertyButton";
import PurchasePropertyButton from "./action_buttons/PurchasePropertyButton";
import ApprovePurchaseButton from "./action_buttons/ApprovePurchaseButton";
import ApproveLeaseButton from "./action_buttons/ApproveLeaseButton";

export type PropertyDetailsDataType = {
  data: LeaseProperty | SaleProperty;
};

type PropertyDetailComponentProps = {
  dataProp?: PropertyDetailsDataType;
};

const ProductDetailsComponent = ({
  dataProp,
}: PropertyDetailComponentProps) => {
  let data: LeaseProperty | SaleProperty;
  const { propertyDetailsData: contextData } = usePropertyContext();
  data = contextData || dataProp;
  const { componentLevelLoader } = useContext(GlobalContext);
  const [productImage, setProductImage] = useState({
    url: data?.images[0]?.secure_url,
    id: data?.images[0]?.public_id,
  });

  const location = useLocation();
  const isInLandlordDashboard = location.pathname.startsWith(
    "/dashboard/landlord"
  );

  return (
    <section className="w-full">
      <div className="max-w-screen-xl mx-auto bg-white my-0 lg:my-12 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 ">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5 h-[20rem] md:h-[25rem] lg:h-[40rem] w-full">
                <div className="relative w-full h-full overflow-hidden rounded-lg border border-gray-300">
                  <img
                    src={productImage.url}
                    alt={productImage.id}
                    className="h-full w-full max-w-full object-cover"
                  />
                  <div className="absolute top-0 m-2 rounded-full bg-dark-blue">
                    <p
                      className={`rounded-full px-2 p-1 text-xs sm:text-sm lg:text-base font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3 ${
                        data?.category === "Sale"
                          ? "bg-orange-600"
                          : "bg-blue-600"
                      }`}
                    >
                      For {data?.category}
                    </p>
                  </div>

                  <div
                    className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs sm:text-sm lg:text-base font-semibold text-white uppercase ${
                      data?.status === "Available"
                        ? "bg-green-500"
                        : data?.status === "Leased"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {data?.status}
                  </div>
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="overflow-x-auto flex flex-row items-start lg:flex-col gap-2 w-full">
                  {data?.images.map((img) => (
                    <button
                      key={img.public_id}
                      type="button"
                      className="flex-0 h-20 w-20 lg:w-full overflow-hidden rounded-lg border-2 border-gray-300 text-center"
                    >
                      <img
                        onClick={() =>
                          setProductImage((prev) => ({
                            ...prev,
                            url: img.secure_url,
                            id: img.public_id,
                          }))
                        }
                        src={img.secure_url}
                        alt={img.public_id}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <div className="border-t md:border-none pt-5 md:pt-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {data?.title}
              </h1>
            </div>
            <div className="mt-5 flex flex-col justify-between items-start space-y-4 border-t py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center gap-2">
                <h1 className={`text-lg lg:text-2xl font-bold`}>
                  {(data as LeaseProperty)?.annualRent
                    ? `$${(data as LeaseProperty)?.annualRent}/year`
                    : `$${(data as SaleProperty)?.salePrice}`}
                </h1>
              </div>

              {/* Action buttons */}
              <div>
                {!isInLandlordDashboard && data?.category == "Lease" && (
                  <RentPropertyButton />
                )}
                {!isInLandlordDashboard && data?.category == "Sale" && (
                  <PurchasePropertyButton />
                )}
                {isInLandlordDashboard && data?.category == "Sale" && (
                  <ApprovePurchaseButton />
                )}
                {isInLandlordDashboard && data?.category == "Lease" && (
                  <ApproveLeaseButton />
                )}
              </div>
            </div>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {data?.address}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {data?.location}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                Cancel anytime
              </li>
            </ul>
            {!isInLandlordDashboard && (
              <div className="lg:col-span-3 ">
                <div className="border-y border-gray-400">
                  <Navbar />
                </div>
                <PropertyDetailLayout />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsComponent;
