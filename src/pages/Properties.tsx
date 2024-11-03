import { Fragment, useContext, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import { GlobalContext } from "../contexts/GlobalContext";
import { getAllProperties } from "../services/property";
import { LeaseProperty, SaleProperty } from "../utils/types";
import PageLevelLoader from "../components/loaders/PageLevelLoader";
import SearchProperty from "../components/SearchProperty";

const Properties = () => {
  const {
    allProperties,
    setAllProperties,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const fetchAllProperties = async () => {
    setPageLevelLoader(true);
    const response = await getAllProperties();
    if (response) {
      setAllProperties(response);
      setPageLevelLoader(false);
    } else {
      setAllProperties([]);
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  return (
    <div className="">
      <div className="py-10 sm:py-16 lg:py-20 w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <div className="backdrop-blur-sm flex items-center justify-center rounded-xl w-full h-full px-2 md:px-4">
          <p className="font-bold text-2xl md:text-4xl lg:text-5xl  text-center text-transparent bg-clip-text bg-[url('assets/images/flat-lay-real-estate-concept_53876-14502.avif')] bg-cover bg-no-repeat bg-center uppercase drop-shadow-[-3px_-3px_1.2px_rgba(0,0,0,0.8)]">
            All Properties Page
          </p>
        </div>
      </div>
      <div className="px-6 md:px-20 lg:px-20 py-4">
        <SearchProperty />
        <div className="w-full py-6 md:py-8 lg:py-16 input border-none outline-none ">
          <div className="space-y-4">
            <p className="mb-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-center">
              All Available Listings
            </p>
            <div className="w-full px-6 py-6 flex justify-center items-center flex-wrap gap-3 rounded">
              {pageLevelLoader ? (
                <PageLevelLoader
                  loading={pageLevelLoader && allProperties.length === 0}
                />
              ) : allProperties && allProperties.length > 0 ? (
                allProperties.map((property) => (
                  <Fragment key={property._id}>
                    <PropertyCard
                      data={property as LeaseProperty | SaleProperty}
                    />
                  </Fragment>
                ))
              ) : (
                <p className="font-semibold text-lg sm:text-xl input">
                  No property added yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Properties;
