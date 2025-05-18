import { createContext, useContext } from "react";

export type UserRole = "admin" | "doctor" | "pharmacist" | "patient";

export const userRoleMap = {
  admin: "Администратор",
  doctor: "Врач",
  pharmacist: "Фармацевт",
  patient: "Пациент",
};

export const statusMap = {
  CREATED: "Создан",
  GIVEN: "Выдан",
  EXPIRED: "Просрочен",
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

export type PatientType = {
  key?: string;
  uuid?: string;
  phone?: string;
  email?: string;
  full_name?: string;
  gender?: string;
  birth_date?: string;
  passport_number?: string;
  passport_date?: string;
  passport_issuer?: string;
}

export type EmployerType = PatientType & {
  position?: string;
  licence_number?: string;
  organization?: string;
  user_role?: string;
};

export type PrescriptionType = {
  key?: string;
  uuid?: string;
  status?: "CREATED" | "GIVEN" | "EXPIRED";
  type?: string;
  description?: string;
  created_at?: number;
  expiration_time?: number;
  medicine?: MedicineType;
  patient?: PatientType;
  doctor?: EmployerType
  pharmacist?: EmployerType;
}

interface AppContextType {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void;
  medicines: MedicineType[];
  setMedicines: (medicines: MedicineType[]) => void;
  patients: PatientType[];
  setPatients: (patients: PatientType[]) => void;
  prescriptions: PrescriptionType[];
  setPrescriptions: (prescriptions: PrescriptionType[]) => void;
  employees: EmployerType[];
  setEmployees: (user: EmployerType[]) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext должен использоваться внутри AppProvider");
  }
  return context;
};
