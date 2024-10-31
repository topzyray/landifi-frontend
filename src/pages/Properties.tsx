import { Fragment, useContext, useEffect } from 'react';
import PropertyCard from '../components/PropertyCard';
import { GlobalContext } from '../contexts/GlobalContext';
import { getAllProperties } from '../services/property';
import { LeaseProperty, SaleProperty } from '../utils/types';
import PageLevelLoader from '../components/loaders/PageLevelLoader';

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
    <div className="bg-white">
      {/* Hero */}
      <div className="h-[25vh] w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <p className="font-bold text-2xl md:text-4xl lg:text-5xl text-white backdrop-blur">
          All Properties Page
        </p>
      </div>
      <div className="px-6 md:px-20 lg:px-60 py-4">
        <div className="flex justify-end py-4 px-5">
          <input
            type="search"
            name="searchProperty"
            placeholder="Search properties"
            id=""
            className="input w-full max-w-[17rem] rounded-l-3xl rounded-r-none"
          />
          <button className="btn btn-primary rounded-l-none rounded-r-3xl">
            Search
          </button>
        </div>
        <div className="py-6 md:py-8 lg:py-16 input border-none outline-none ">
          <div className="space-y-4">
            <p className="font-semibold text-center text-2xl md:text-3xl lg:text-4xl">
              All Listings
            </p>
            <div className="px-6 py-6 flex justify-center items-center flex-wrap gap-3 border rounded">
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
