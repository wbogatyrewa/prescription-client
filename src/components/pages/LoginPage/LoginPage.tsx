import { useNavigate } from "react-router";
import {
  useAppContext,
  UserData,
} from "../../../contexts/AppContext/AppContext";
import styles from "./LoginPage.module.css";

const mockUsers: Record<string, UserData> = {
  admin: {
    id: "1",
    username: "Администратор",
    email: "admin@example.com",
    role: "admin",
  },
  doctor: {
    id: "2",
    username: "Врач",
    email: "doctor@example.com",
    role: "doctor",
  },
  pharmacist: {
    id: "3",
    username: "Фармацевт",
    email: "pharmacist@example.com",
    role: "pharmacist",
  },
  patient: {
    id: "4",
    username: "Пациент",
    email: "patient@example.com",
    role: "patient",
  },
};

export const LoginPage = () => {
  const { setUserData } = useAppContext();
  const navigate = useNavigate();

  const login = (user: UserData | null) => {
    setUserData(user);
    if (user) {
      navigate("/medicines");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div>
        <button onClick={() => login(null)}>Выход</button>

        <div className="text-center">
          <div className="flex gap-4 justify-center">
            <button onClick={() => login(mockUsers.admin)}>
              Войти как админ
            </button>
            <button onClick={() => login(mockUsers.doctor)}>
              Войти как врач
            </button>
            <button onClick={() => login(mockUsers.pharmacist)}>
              Войти как фармацевт
            </button>
            <button onClick={() => login(mockUsers.patient)}>
              Войти как пациент
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
