import { LeaseProperty, SaleProperty } from "../utils/types";
import PropertyDetailLayout from "../pages/property_details/PropertyDetailLayout";
import Navbar from "../pages/property_details/Navbar";
import { usePropertyContext } from "../contexts/PropertyContext";

const ProductDetailsComponent = () => {
  const { propertyDetailsData: data } = usePropertyContext();

  return (
    <section className="bg-gray-100 w-full">
      <div className="max-w-screen-xl mx-auto lg:bg-white my-8 lg:my-12 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 ">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5 h-[20rem] md:h-[25rem] lg:h-[40rem] w-full">
                <div className="w-full h-full overflow-hidden rounded-lg border border-gray-300">
                  <img
                    src={data?.images[0]?.secure_url}
                    alt={data?.images[0]?.public_id}
                    className="h-full w-full max-w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="overflow-x-auto flex flex-row items-start lg:flex-col gap-2 w-full">
                  {data?.images.map((img) => (
                    <button
                      key={img.public_id}
                      type="button"
                      className="flex-0 h-20 w-20 lg:w-full overflow-hidden rounded-lg border-2 border-gray-300 text-center"
                    >
                      <img
                        src={img.secure_url}
                        alt={img.public_id}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <div className="border-t md:border-none pt-5 md:pt-0">
              <h1 className="text-2xl font-bold text-gray-900">
                {data?.title}
              </h1>
            </div>
            <div className="mt-5 flex flex-col justify-between items-start space-y-4 border-t py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center gap-2">
                <h1 className={`text-lg lg:text-2xl font-bold`}>
                  {(data as LeaseProperty)?.annualRent
                    ? `$${(data as LeaseProperty)?.annualRent} / year`
                    : `$${(data as SaleProperty)?.salePrice}`}
                </h1>
              </div>
              {/* <button
                onClick={() => handleAddToCart(data as any)}
                type="button"
                className="btn-small"
              >
                {componentLevelLoader &&
                componentLevelLoader.loading &&
                data._id === componentLevelLoader.id ? (
                  <ComponentLevelLoader
                    text="Adding to Cart"
                    color="#ffffff"
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Add to Cart"
                )}
              </button> */}
            </div>
            {/* <ul className="mt-3 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {data.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                Cancel anytime
              </li>
            </ul> */}
            <div className="lg:col-span-3 ">
              <div className="border-y border-gray-400">
                <Navbar />
              </div>
              <PropertyDetailLayout />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsComponent;
