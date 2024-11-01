import { useNavigate } from "react-router-dom";
import { Fragment, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllLandlordProperties } from "../../../services/property";
import { GlobalContext } from "../../../contexts/GlobalContext";
import PageLevelLoader from "../../../components/loaders/PageLevelLoader";
import PropertyCard from "../../../components/PropertyCard";
import { LeaseProperty, SaleProperty } from "../../../utils/types";
import { deletePropertyById } from "../../../services/property";
import { toast, ToastPosition } from "react-toastify";
import PropertyDeleteAlert from "../../../components/Modal";
import { CgDanger } from "react-icons/cg";
import ComponentLevelLoader from "../../../components/loaders/ComponentLevelLoader";
import { getErrorMessage } from "../../../utils/helpers";

const Overview = () => {
  const [confirmPropertyDeletion, setConfirmPropertyDeletion] = useState({
    status: false,
    propertyId: "",
  });
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

  const navigate = useNavigate();

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
        setConfirmPropertyDeletion((prev) => ({
          ...prev,
          status: false,
          propertyId: "",
        }));
        fetchAllPropertiesForLandlord();
      })
      .catch((err) => {
        setComponentLevelLoader({ loading: false, id: "" });
        setConfirmPropertyDeletion((prev) => ({
          ...prev,
          status: false,
          propertyId: "",
        }));

        const errorMessage = getErrorMessage(err);
        toast.error(errorMessage, {
          position: "top-right" as ToastPosition,
        });
      });
  };

  return (
    <div className="">
      <div className="space-y-4 md:space-y-6">
        <h1 className="font-medium text-lg uppercase border rounded px-2 py-0.5 w-max">
          Overview
        </h1>
      </div>

      <div className="py-10 lg:py-20">
        <p className="mb-8 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
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
                <Fragment key={property._id}>
                  <PropertyCard
                    key={property._id}
                    data={property as LeaseProperty | SaleProperty}
                    onDelete={() =>
                      setConfirmPropertyDeletion((prev) => ({
                        ...prev,
                        status: true,
                        propertyId: property._id,
                      }))
                    }
                    onUpdate={() =>
                      navigate(
                        `/dashboard/landlord/${property.category.toLowerCase()}property/update/${
                          property._id
                        }`
                      )
                    }
                    isLandlord
                    componentLevelLoader={componentLevelLoader}
                  />
                  <PropertyDeleteAlert
                    open={confirmPropertyDeletion.status}
                    onClose={() =>
                      setConfirmPropertyDeletion((prev) => ({
                        ...prev,
                        status: false,
                        propertyId: "",
                      }))
                    }
                  >
                    <div className="flex flex-col justify-center items-center gap-3 w-full py-2">
                      <span>
                        <CgDanger className="text-4xl text-red-600" />
                      </span>
                      <span className="font-semibold text-center uppercase">
                        You are about the delete property with ID:{" "}
                        <span className="font-bold">
                          {confirmPropertyDeletion.propertyId}
                        </span>
                      </span>
                      <span className="font-semibold text-red-600 text-center uppercase">
                        Note: This action cannot be undone if confirmed
                      </span>
                      <div className="flex items-center gap-8">
                        <button
                          onClick={() =>
                            setConfirmPropertyDeletion((prev) => ({
                              ...prev,
                              status: false,
                              propertyId: "",
                            }))
                          }
                          type="button"
                          className="btn btn-danger"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          type="button"
                          className="btn btn-success"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id == property._id ? (
                            <ComponentLevelLoader
                              text="Deleting"
                              color="#ffffff"
                              loading={
                                componentLevelLoader &&
                                componentLevelLoader.loading
                              }
                            />
                          ) : (
                            "Confirm"
                          )}
                        </button>
                      </div>
                    </div>
                  </PropertyDeleteAlert>
                </Fragment>
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
