import { createContext, useState } from "react";

type GlobalContextType = {
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
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

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext({} as GlobalContextType);

export const GlobalProvider = ({ children }: GlobalContextProviderProps) => {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
