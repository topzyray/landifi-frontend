import React from "react";

type LandlordDetailsProps = {
  landlord: Landlord;
};

const LandlordDetails: React.FC<LandlordDetailsProps> = ({ landlord }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-md mx-auto">
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="h-16 w-16 overflow-hidden rounded-full border border-gray-300">
          <img
            src={landlord.profilePicture || "/placeholder-profile.png"} // Fallback image if no profile picture
            alt={`${landlord.name} profile`}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name and Email */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {landlord.name}
          </h2>
          <p className="text-gray-600 text-sm">{landlord.email}</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-4 space-y-3">
        {landlord.phone && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">📞</span>
            <p className="text-gray-700">{landlord.phone}</p>
          </div>
        )}
        {landlord.address && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">📍</span>
            <p className="text-gray-700">{landlord.address}</p>
          </div>
        )}
        {landlord.company && (
          <div className="flex items-center space-x-2">
            <span className="text-gray-500">🏢</span>
            <p className="text-gray-700">{landlord.company}</p>
          </div>
        )}
      </div>

      {/* Contact Button */}
      <button
        type="button"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md font-medium hover:bg-blue-700 transition duration-200"
      >
        Contact Landlord
      </button>
    </div>
  );
};

export default LandlordDetails;
