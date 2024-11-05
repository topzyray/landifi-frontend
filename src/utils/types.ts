export type ImageObjectType = {
  public_id: string;
  secure_url: string;
};

type OwnerObjectType = {
  email: string;
  firstName: string;
  lastName: string;
  userKind: string;
  userType: string;
  _id: string;
};

export interface Property {
  _id: string;
  images: ImageObjectType[];
  title: string;
  description: string;
  type: string;
  category: string;
  status: string;
  address: string;
  location: string;
  landlord: OwnerObjectType;
  createdAt: string;
  updatedAt: string;
}

export interface LeaseProperty extends Property {
  amenities: string[];
  annualRent: number;
  securityDeposit: string;
  isFurnished: boolean;
}

export interface SaleProperty extends Property {
  salePrice: number;
  isNegotiable: boolean;
  ownershipHistory: string;
}

export type GlobalContextType = {
  toggleTheme: boolean;
  setToggleTheme: React.Dispatch<React.SetStateAction<boolean>>;
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  allProperties: Property[] | [];
  setAllProperties: React.Dispatch<React.SetStateAction<Property[] | []>>;
  pageLevelLoader: boolean;
  setPageLevelLoader: React.Dispatch<React.SetStateAction<boolean>>;
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  setComponentLevelLoader: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      id: string;
    }>
  >;
};

export type GlobalContextProviderProps = {
  children: React.ReactNode;
};
