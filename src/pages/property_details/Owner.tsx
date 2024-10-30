import { usePropertyContext } from "../../contexts/PropertyContext";

const PropertyOwner = () => {
  const { propertyDetailsData: data } = usePropertyContext();

  return (
    <div className="mt-4 flow-root sm:mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-gray-900">
          {data?.landlord?.firstName} {data?.landlord?.lastName}
        </h2>
        <p className="text-gray-600 text-sm">{data?.landlord?.email}</p>
        <p className="text-gray-600 text-sm">{data?.landlord?.userKind}</p>
      </div>
    </div>
  );
};

export default PropertyOwner;
