import { createContext, useContext } from "react";

export type UserRole = "admin" | "doctor" | "pharmacist" | "patient";

export interface UserData {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext должен использоваться внутри AppProvider");
  }
  return context;
};
