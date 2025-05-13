import { createContext, useContext } from "react";

export type UserRole = "admin" | "doctor" | "pharmacist" | "patient";
export const userRoleMap = {
  admin: "Администратор",
  doctor: "Врач",
  pharmacist: "Фармацевт",
  patient: "Пациент",
};

export interface UserData {
  uuid: string;
  user_role: UserRole;
}

export type MedicineType = {
  key?: string;
  uuid?: string;
  name?: string;
  producer?: string;
  description?: string;
  form?: string;
  count?: string;
  dosage?: string;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  medicines: MedicineType[];
  setMedicines: (medicines: MedicineType[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext должен использоваться внутри AppProvider");
  }
  return context;
};
