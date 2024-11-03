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

export const footerNavs = [
  {
    id: 1,
    header: "Explore",
    menu: [
      {
        id: 1,
        label: "Archives",
        path: "/archives",
      },
      {
        id: 2,
        label: "Properties",
        path: "/properties",
      },
      {
        id: 3,
        label: "Mortgage Calculator",
        path: "/calc",
      },
    ],
  },
  {
    id: 2,
    header: "Quick Links",
    menu: [
      {
        id: 1,
        label: "About Us",
        path: "/about",
      },
      {
        id: 2,
        label: "Contact Us",
        path: "/contact",
      },
      {
        id: 3,
        label: "FAQ",
        path: "/faq",
      },
    ],
  },
  {
    id: 3,
    header: "Resources",
    menu: [
      {
        id: 1,
        label: "News",
        path: "/news",
      },
      {
        id: 2,
        label: "Glossary",
        path: "/glossary",
      },
      {
        id: 3,
        label: "Guides",
        path: "/guide",
      },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    firstName: "Ajide",
    initials: "H.",
    title: "This is just a placeholder",
    text: "Properties at Landifi are quite amazing. It was awakening experience for me in the art of real estates.",
  },
  {
    id: 2,
    firstName: "Evan",
    initials: "N.",
    title: "It was a wonderful experience",
    text: "Properties at Landifi are quite amazing. It was awakening experience for me in the art of real estates.",
  },
  {
    id: 3,
    firstName: "Tope",
    initials: "T.",
    title: "It was the best",
    text: "Landifi should be called The Life Safer. “I want your commitment not your money”. While some people charge much for what they don’t know. Landifi is the best real estate platform I have ever known.",
  },
  {
    id: 4,
    firstName: "Paul",
    initials: "A.",
    title: "Best platform ever",
    text: "Landifi has been wonderful and will always be because they are genius in the services they offer. There strategy is the best. Landifi is the best platform ever.",
  },
  {
    id: 5,
    firstName: "Precilla",
    initials: "A.",
    title: "It was insightful",
    text: "Landifi has been wonderful and will always be because they are genius in the services they offer. There strategy is the best. Landifi is the best platform ever.",
  },
];
