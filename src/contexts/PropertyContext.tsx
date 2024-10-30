import { createContext, useContext, ReactNode } from "react";
import { LeaseProperty, SaleProperty } from "../utils/types";

interface PropertyContextProps {
  propertyDetailsData: LeaseProperty | SaleProperty;
}

const PropertyContext = createContext<PropertyContextProps | undefined>(
  undefined
);

export const usePropertyContext = () => {
  const context = useContext(PropertyContext);
  if (!context)
    throw new Error("usePropertyContext must be used within PropertyProvider");
  return context;
};

export const PropertyProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: LeaseProperty | SaleProperty;
}) => {
  return (
    <PropertyContext.Provider value={{ propertyDetailsData: data }}>
      {children}
    </PropertyContext.Provider>
  );
};
