import { useContext, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import { GlobalContext } from "../contexts/GlobalContext";
import { getAllProperties } from "../services/property";
import { LeaseProperty, SaleProperty } from "../utils/types";

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
    console.log(response);

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
      {/* Hero */}
      <div className="h-[25vh] w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <p className="font-bold text-2xl md:text-4xl lg:text-5xl text-white">
          Property Page
        </p>
      </div>
      <div className="">
        <div className="px-6 flex justify-center items-center flex-wrap gap-3">
          {allProperties && allProperties.length > 0 ? (
            allProperties.map((property) => (
              <PropertyCard
                key={property._id}
                data={property as LeaseProperty | SaleProperty}
              />
            ))
          ) : (
            <p>No property found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
