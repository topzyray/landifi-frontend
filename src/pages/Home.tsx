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
      <div className="h-screen w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center ">
        <p className="font-bold text-2xl md:text-4xl lg:text-5xl text-white backdrop-blur">
          Welcome to Landifi
        </p>
      </div>
      <div className="">
        <div className="bg-white py-10 md:py-20">
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
                <PropertyCard data={property as LeaseProperty | SaleProperty} />
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
