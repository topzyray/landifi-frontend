import { createContext, useEffect, useState } from 'react';
import {
  GlobalContextProviderProps,
  GlobalContextType,
  Property,
} from '../utils/types';

export const GlobalContext = createContext({} as GlobalContextType);

export const GlobalProvider = ({ children }: GlobalContextProviderProps) => {
  const [toggleTheme, setToggleTheme] = useState<boolean>(false);
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [allProperties, setAllProperties] = useState<Property[] | []>([]);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: '',
  });

  useEffect(() => {
    // if (toggleTheme !== null) {
    //   return toggleTheme
    // };
  }, [toggleTheme]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        allProperties,
        setAllProperties,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
        toggleTheme,
        setToggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
