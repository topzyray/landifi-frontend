import { Property } from "../utils/types";

const PropertyCard = ({ data }: { data: Property }) => {
  return (
    <div className="w-full sm:w-max shadow hover:shadow-orange-600 hover:cursor-pointer">
      <div className="w-full">
        <div className="h-44 w-full sm:w-60">
          <img
            src={data.images[0].secure_url}
            alt={data.images[0].public_id}
            width={100}
            height={100}
            className="h-full w-full object-cover transition-all ease-in-out duration-300 group-hover:scale-125"
          />
        </div>
        {/* {data.onSale === "yes" ? (
          <div className="absolute z-10 top-0 m-2 rounded-full bg-dark-blue">
            <p className="rounded-full bg-red-600 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
              Sale
            </p>
          </div>
        ) : null} */}
        <div className="flex flex-col gap-2">
          <h2>Price: ${data.price}</h2>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
