import { useContext, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import { GlobalContext } from "../contexts/GlobalContext";
import { getAllProperties } from "../services/property";

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
      <div className="h-screen w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <p className="font-bold text-2xl md:text-4xl lg:text-5xl text-orange-700">
          Welcome to Landifi
        </p>
      </div>
      <div className="">
        <p>Available Properties</p>
        <div className="px-6 flex justify-center items-center flex-wrap gap-3">
          {allProperties && allProperties.length > 0 ? (
            allProperties.map((property) => (
              <PropertyCard key={property._id} data={property} />
            ))
          ) : (
            <p>No property found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
