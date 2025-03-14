import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MedicinesPage } from "./pages/MedicinesPage/MedicinesPage";
import { useAppContext } from "../contexts/AppContext/AppContext";
import { useEffect } from "react";
import { CreatePrescriptionPage } from "./pages/CreatePrescriptionPage/CreatePrescriptionPage";
import { PrescriptionsPage } from "./pages/PrescriptionsPage/PrescriptionsPage";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";

function App() {
  const { userData } = useAppContext();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* {!!userData && ( */}
      <>
        <Route path="/account" element={<AccountPage />} />
        <Route path="/medicines" element={<MedicinesPage />} />
        <Route path="/prescriptions" element={<PrescriptionsPage />} />
        <Route
          path="/prescriptions/create"
          element={<CreatePrescriptionPage />}
        />
      </>
      {/* )} */}
      <Route path="*" element={<>Страница не найдена</>} />
    </Routes>
  );
}

export default App;
