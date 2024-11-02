import { BiSolidDashboard } from "react-icons/bi";
import { FaRegCircleUser, FaSellcast } from "react-icons/fa6";
import { MdAddBox } from "react-icons/md";
import { TbWorldUp } from "react-icons/tb";

export const landlordDashboardNav = [
  {
    id: 1,
    icon: BiSolidDashboard,
    label: "Overview",
    path: "/dashboard/landlord",
    end: true,
  },
  {
    id: 2,
    icon: MdAddBox,
    label: "Lease Property",
    path: "/dashboard/landlord/leaseproperty",
    end: false,
  },
  {
    id: 3,
    icon: FaSellcast,
    label: "Sell Property",
    path: "/dashboard/landlord/saleproperty",
    end: false,
  },
  {
    id: 4,
    icon: FaRegCircleUser,
    label: "Profile",
    path: "/dashboard/landlord/profile",
    end: false,
  },
  {
    id: 5,
    icon: TbWorldUp,
    label: "Main Site",
    path: "/",
    end: false,
  },
];

export const tenantDashboardNav = [
  {
    id: 1,
    icon: BiSolidDashboard,
    label: "Overview",
    path: "/dashboard/tenant",
    end: true,
  },
  {
    id: 2,
    icon: FaRegCircleUser,
    label: "Profile",
    path: "/dashboard/tenant/profile",
    end: false,
  },
  {
    id: 3,
    icon: TbWorldUp,
    label: "Main Site",
    path: "/",
    end: false,
  },
];

export const amenities = [
  // Indoor Amenities
  "Dishwasher",
  "Refrigerator",
  "Oven",
  "Microwave",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "Ceiling fans",
  "Hardwood floors",
  "Carpeted rooms",
  "Smoke detectors",
  "High-speed internet",
  "Cable-ready",
  "Walk-in closets",
  "Wheelchair accessible",

  // Outdoor Amenities
  "On-site parking",
  "Garage",
  "Garden",
  "Yard",
  "Patio or balcony",
  "City view",

  // Building Amenities
  "Swimming pool",
  "Gym",
  "BBQ area",
  "Community room",
  "Laundry facilities",

  // Security & Safety
  "24-hour security",
  "CCTV",
  "Gated community",
  "Fire extinguishers",

  // Pet Amenities
  "Pet-friendly",
  "Dog park",

  // Energy Efficiency
  "Energy-efficient appliances",
  "Double-pane windows",
  "Recycling bins",

  // Utilities & Services
  "Water included",
  "Gas included",
  "Trash collection included",
  "Internet included",

  // Others
  "Others",
];
