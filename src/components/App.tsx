import { Route, Routes, useNavigate } from "react-router";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MedicinesPage } from "./pages/MedicinesPage/MedicinesPage";
import { useAppContext } from "../contexts/AppContext/AppContext";
import { useEffect } from "react";
import { CreatePrescriptionPage } from "./pages/CreatePrescriptionPage/CreatePrescriptionPage";
import { PrescriptionsPage } from "./pages/PrescriptionsPage/PrescriptionsPage";
import { AccountPage } from "./pages/AccountPage/AccountPage";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { CreateMedicinePage } from "./pages/CreateMedicinePage/CreateMedicinePage";
import { CreateUserPage } from "./pages/CreateUserPage/CreateUserPage";
import { UsersPage } from "./pages/UsersPage/UsersPage";
import { getToken } from "../api/auth/token";
import getMedicines from "../api/medicines/getMedicines";
import getPatients from "../api/users/getPatients";
import getPrescriptions from "../api/prescriptions/getPrescriptions";
import getEmployees from "../api/users/getEmployees";

function App() {
  const navigate = useNavigate();
  const { userData, setUserData, setMedicines, setPatients, setPrescriptions, setEmployees } = useAppContext();

  useEffect(() => {
    const storedUser = getToken();
    if (storedUser && Object.keys(storedUser).length > 0) {
      setUserData(storedUser);

      // if (storedUser.user_role !== "patient") {
      //   navigate("/medicines");
      // } else {
      //   navigate("/prescriptions");
      // }
    }
  }, [navigate, setUserData]);


  useEffect(() => {
    getMedicines().then((response) => {
      if (!response.ok) {
        throw "";
      }
      return response;
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setMedicines(data);
        }
      })
      .catch((e) => {
        console.error(e)
      });
  }, [setMedicines]);

  useEffect(() => {
    getPatients().then((response) => {
      if (!response.ok) {
        throw "";
      }
      return response;
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPatients(data);
        }
      })
      .catch((e) => {
        console.error(e)
      });
  }, [setPatients]);

  useEffect(() => {
    if (userData && userData.user_role && userData.uuid && Object.keys(userData).length > 0) {
      getPrescriptions(userData).then((response) => {
        if (!response.ok) {
          throw "";
        }

        return response;
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            setPrescriptions(data);
          }
        })
        .catch((e) => {
          console.error(e)
        });
    }
  }, [setPrescriptions, userData]);

  useEffect(() => {
    getEmployees().then((response) => {
      if (!response.ok) {
        throw "";
      }

      return response;
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setEmployees(data);
        }
      })
      .catch((e) => {
        console.error(e)
      });
  }, [setEmployees]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {!!userData && Object.keys(userData).length > 0 && (
        <>
          <Route path="/account" element={<AccountPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route
            path="/prescriptions/create"
            element={<CreatePrescriptionPage />}
          />
          <Route path="/medicines/create" element={<CreateMedicinePage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
        </>
      )}
      <Route path="*" element={<>Страница не найдена</>} />
    </Routes>
  );
}

export default App;
