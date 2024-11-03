import { Fragment, useContext, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import { GlobalContext } from "../contexts/GlobalContext";
import { getAllProperties } from "../services/property";
import { LeaseProperty, SaleProperty } from "../utils/types";
import PageLevelLoader from "../components/loaders/PageLevelLoader";

const Home = () => {
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
      setPageLevelLoader(false);
      setAllProperties(response);
    } else {
      setPageLevelLoader(false);
      setAllProperties([]);
    }
  };

  useEffect(() => {
    fetchAllProperties();
  }, []);

  return (
    <div className="">
      {/* Hero */}
      <div className="h-[80vh] md:h-screen w-full bg-[url('assets/gifs/interior-7.webp')] bg-cover bg-no-repeat bg-center flex justify-center items-center ">
        <div className="backdrop-blur-sm flex items-center justify-center rounded-xl w-full h-full px-2 md:px-4">
          <p className="font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-center text-transparent bg-clip-text bg-[url('assets/images/flat-lay-real-estate-concept_53876-14502.avif')] bg-cover bg-no-repeat bg-center uppercase drop-shadow-[-3px_-3px_1.2px_rgba(0,0,0,0.8)]">
            Welcome to Landifi
          </p>
        </div>
      </div>
      <div className="">
        <div className="bg-white py-10 md:py-20 px-4 lg:px-32">
          <p className="mb-8 font-bold text-3xl sm:text-4xl lg:text-5xl text-center">
            Available Properties
          </p>
          <div className="px-6 flex justify-center items-center flex-wrap gap-3">
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
  );
};

export default Home;
