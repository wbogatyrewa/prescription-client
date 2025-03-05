import { Route, Routes } from "react-router";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { MedicinesPage } from "./pages/MedicinesPage/MedicinesPage";
import { useAppContext } from "../contexts/AppContext/AppContext";
import { useEffect } from "react";

function App() {
  const { userData } = useAppContext();

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {!!userData && <Route path="/medicines" element={<MedicinesPage />} />}
      <Route path="*" element={<>Страница не найдена</>} />
    </Routes>
  );
}

export default App;
