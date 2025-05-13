import { FC, ReactNode, useState } from "react";
import { AppContext, MedicineType, UserData } from "./AppContext";

interface AppProviderProps {
  children?: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [medicines, setMedicines] = useState<MedicineType[]>([]);

  const value = {
    userData,
    setUserData,
    medicines,
    setMedicines
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
