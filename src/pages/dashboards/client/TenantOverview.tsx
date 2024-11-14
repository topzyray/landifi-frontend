import { Fragment, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { GlobalContext } from "../../../contexts/GlobalContext";
import PageLevelLoader from "../../../components/loaders/PageLevelLoader";
import PropertyCard from "../../../components/PropertyCard";
import { LeaseProperty, SaleProperty } from "../../../utils/types";
import { getSavedPropertyForTenant } from "../../../services/user";

const TenantOverview = () => {
  const [savedProperties, setSavedProperties] = useState<
    LeaseProperty[] | SaleProperty[] | []
  >([]);
  const { user } = useAuth();
  const { pageLevelLoader, setPageLevelLoader, componentLevelLoader } =
    useContext(GlobalContext);

  const fetchAllSavePropertiesForUser = () => {
    setPageLevelLoader(true);
    getSavedPropertyForTenant(user?._id as string)
      .then((res) => {
        console.log(res);

        setPageLevelLoader(false);
        setSavedProperties(res);
      })
      .catch(() => {
        setPageLevelLoader(false);
      });
  };

  useEffect(() => {
    fetchAllSavePropertiesForUser();
  }, []);

  return (
    <div className="">
      <div className="space-y-4 md:space-y-6">
        <h1 className="font-medium text-lg uppercase border rounded px-2 py-0.5 w-max">
          Overview
        </h1>
      </div>

      <div className="py-10 lg:py-20">
        <p className="mb-8 font-bold text-2xl sm:text-3xl lg:text-4xl text-center">
          Saved Properties
        </p>
        <div className="px-6 flex justify-center items-center flex-wrap gap-3">
          {savedProperties &&
            savedProperties.length === 0 &&
            pageLevelLoader && (
              <PageLevelLoader
                loading={
                  pageLevelLoader &&
                  savedProperties &&
                  savedProperties.length === 0
                }
              />
            )}
          {savedProperties && savedProperties.length > 0
            ? savedProperties.map((property) => (
                <Fragment key={property._id}>
                  <PropertyCard
                    key={property._id}
                    data={property as LeaseProperty | SaleProperty}
                    componentLevelLoader={componentLevelLoader}
                  />
                </Fragment>
              ))
            : null}
          {!pageLevelLoader &&
            savedProperties &&
            savedProperties.length === 0 && (
              <p className="text-center">
                You have not saved any property yet.
              </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default TenantOverview;
