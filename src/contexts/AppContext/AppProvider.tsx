import { FC, ReactNode, useState } from "react";
import { AppContext, UserData } from "./AppContext";

interface AppProviderProps {
  children?: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const value = {
    userData,
    setUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
