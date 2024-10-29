import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { getPropertyById } from "../services/property";
import { LeaseProperty, SaleProperty } from "../utils/types";
import { useParams } from "react-router-dom";
import PageLevelLoader from "../components/loaders/PageLevelLoader";
import ProductDetailsComponent from "../components/ProductDetailsComponent";

const PropertyDetails = () => {
  const [propertyDetailsData, setPropertyDetailsData] = useState<
    LeaseProperty | SaleProperty | {}
  >();
  const { pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);

  const { propertyId } = useParams();

  const fetchPropertyById = async () => {
    setPageLevelLoader(true);
    const response = await getPropertyById(propertyId as string);
    if (response) {
      setPropertyDetailsData(response);
      setPageLevelLoader(false);
    } else {
      setPropertyDetailsData({});
      setPageLevelLoader(false);
    }
  };

  useEffect(() => {
    fetchPropertyById();
  }, []);

  return (
    <div className="">
      <div className="h-[25vh] w-full bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <p className="backdrop-blur font-bold text-2xl md:text-4xl lg:text-5xl text-white">
          Property Details Page
        </p>
      </div>
      {pageLevelLoader ? (
        <PageLevelLoader loading={pageLevelLoader} />
      ) : (
        <div className="">
          <div className="px-6 flex justify-center items-center flex-wrap gap-3">
            I
            <ProductDetailsComponent
              data={propertyDetailsData as LeaseProperty | SaleProperty}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
