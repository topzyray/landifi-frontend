import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllLandlordProperties } from "../../../services/landlord";
import { GlobalContext } from "../../../contexts/GlobalContext";
import PageLevelLoader from "../../../components/loaders/PageLevelLoader";
import PropertyCard from "../../../components/PropertyCard";
import { LeaseProperty, SaleProperty } from "../../../utils/types";
import { deletePropertyById } from "../../../services/property";
import { toast, ToastPosition } from "react-toastify";

const Overview = () => {
  const [landlordProperties, setLandlordProperties] = useState<
    LeaseProperty[] | SaleProperty[] | []
  >([]);
  const { user } = useAuth();
  const {
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const fetchAllPropertiesForLandlord = () => {
    setPageLevelLoader(true);
    getAllLandlordProperties()
      .then((res) => {
        setPageLevelLoader(false);
        setLandlordProperties(res);
      })
      .catch((err) => {
        setPageLevelLoader(false);
      });
  };

  useEffect(() => {
    fetchAllPropertiesForLandlord();
  }, []);

  const handleDeleteProperty = async (productId: string) => {
    setComponentLevelLoader({ loading: true, id: productId });
    deletePropertyById(productId)
      .then((res) => {
        toast.success(res, {
          position: "top-right" as ToastPosition,
        });
        setComponentLevelLoader({ loading: false, id: "" });
        fetchAllPropertiesForLandlord();
      })
      .catch((err) => {
        setComponentLevelLoader({ loading: false, id: "" });
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
      });
  };

  return (
    <div className="">
      <div className="space-y-4 md:space-y-6">
        <h1 className="font-medium text-lg uppercase border rounded px-2 py-0.5 w-max">
          Overview
        </h1>
      </div>

      <div className="py-10 md:py-20">
        <p className="mb-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-center">
          All My Listings ({landlordProperties.length})
        </p>
        <div className="px-6 flex justify-center items-center flex-wrap gap-3">
          {landlordProperties.length === 0 && pageLevelLoader && (
            <PageLevelLoader
              loading={pageLevelLoader && landlordProperties.length === 0}
            />
          )}
          {landlordProperties && landlordProperties.length > 0
            ? landlordProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  data={property as LeaseProperty | SaleProperty}
                  onDelete={() => handleDeleteProperty(property._id)}
                  isLandlord
                  componentLevelLoader={componentLevelLoader}
                />
              ))
            : null}
          {!pageLevelLoader && landlordProperties.length === 0 && (
            <p className="text-center">
              No property for the user. Please create property.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
