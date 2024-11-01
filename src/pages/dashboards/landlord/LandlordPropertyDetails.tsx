import { useContext, useEffect, useState } from "react";
import { LeaseProperty, SaleProperty } from "../../../utils/types";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { getPropertyById } from "../../../services/property";
import PageLevelLoader from "../../../components/loaders/PageLevelLoader";
import { PropertyProvider } from "../../../contexts/PropertyContext";
import ProductDetailsComponent, {
  PropertyDetailsDataType,
} from "../../../components/ProductDetailsComponent";

const LandlordPropertyDetails = () => {
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
    <div className="h-screen">
      {pageLevelLoader ? (
        <div className="h-1/2 flex justify-center items-center">
          <PageLevelLoader loading={pageLevelLoader} />
        </div>
      ) : (
        <PropertyProvider
          data={propertyDetailsData as LeaseProperty | SaleProperty}
        >
          <div className="flex justify-center items-center flex-wrap gap-3">
            <ProductDetailsComponent
              dataProp={propertyDetailsData as PropertyDetailsDataType}
            />
          </div>
        </PropertyProvider>
      )}
    </div>
  );
};

export default LandlordPropertyDetails;
