import { usePropertyContext } from "../../contexts/PropertyContext";

const PropertyDescription = () => {
  const { propertyDetailsData: data } = usePropertyContext();

  return (
    <div className="mt-4 flow-root sm:mt-12">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-md mx-auto">
        <h2 className="font-normal text-gray-900 text-justify">
          {data?.description}
        </h2>
      </div>
    </div>
  );
};

export default PropertyDescription;
