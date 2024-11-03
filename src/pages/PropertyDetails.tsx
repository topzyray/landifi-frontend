import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { getPropertyById } from "../services/property";
import { LeaseProperty, SaleProperty } from "../utils/types";
import { useParams } from "react-router-dom";
import PageLevelLoader from "../components/loaders/PageLevelLoader";
import ProductDetailsComponent from "../components/ProductDetailsComponent";
import { PropertyProvider } from "../contexts/PropertyContext";

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
    <div className="h-full w-full flex flex-col justify-between items-stretch">
      <div className="w-full h-full py-10 sm:py-16 lg:py-20 bg-[url('assets/images/side-view-woman-working-as-real-estate-agent_23-2151064988.avif')] bg-cover bg-no-repeat bg-center flex justify-center items-center">
        <div className="w-full h-full backdrop-blur-sm flex items-center justify-center rounded-xl px-2 md:px-4">
          <p className="font-bold text-2xl md:text-4xl lg:text-5xl  text-center text-transparent bg-clip-text bg-[url('assets/images/flat-lay-real-estate-concept_53876-14502.avif')] bg-cover bg-no-repeat bg-center uppercase drop-shadow-[-3px_-3px_1.2px_rgba(0,0,0,0.8)]">
            Property Details Page
          </p>
        </div>
      </div>
      {pageLevelLoader ? (
        <div className="mt-32">
          <PageLevelLoader loading={pageLevelLoader} />
        </div>
      ) : (
        <PropertyProvider
          data={propertyDetailsData as LeaseProperty | SaleProperty}
        >
          <div className="py-6 my-8 lg:py-10 flex justify-center items-center flex-wrap gap-3">
            <ProductDetailsComponent />
          </div>
        </PropertyProvider>
      )}
    </div>
  );
};

export default PropertyDetails;
