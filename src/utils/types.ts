type ImageObjectType = {
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

export type Property = {
  //   title: string;
  //   description: string;
  _id: string;
  location: string;
  price: number;
  type: string;
  amenities: string[];
  owner: OwnerObjectType;
  images: ImageObjectType[];
  createdAt: string;
  updateAt: string;
};

export type GlobalContextType = {
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
