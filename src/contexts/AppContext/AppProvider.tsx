import { FC, ReactNode, useState } from "react";
import { AppContext, EmployerType, MedicineType, PatientType, PrescriptionType, UserData } from "./AppContext";

interface AppProviderProps {
  children?: ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [medicines, setMedicines] = useState<MedicineType[]>([]);
  const [patients, setPatients] = useState<PatientType[]>([]);
  const [prescriptions, setPrescriptions] = useState<PrescriptionType[]>([]);
  const [employees, setEmployees] = useState<EmployerType[]>([]);

  const value = {
    userData,
    setUserData,
    medicines,
    setMedicines,
    patients,
    setPatients,
    prescriptions,
    setPrescriptions,
    employees,
    setEmployees
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
