import { useNavigate } from "react-router";
import {
  useAppContext,
  UserData,
} from "../../../contexts/AppContext/AppContext";
import styles from "./LoginPage.module.css";
import { Button, Form, Input, Layout } from "antd";
import logo from "../../../assets/logo.svg";
import { setToken } from "../../../api/auth/token";

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

type FieldType = {
  phone?: string;
  password?: string;
};

export const LoginPage = () => {
  const { setUserData } = useAppContext();
  const navigate = useNavigate();

  const login = (user: UserData | null) => {
    setToken({
      id: user?.username || "",
      username: user?.username || "",
      email: user?.email || "",
      role: user?.role || "patient",
    });

    setUserData(user);
    if (user && user?.role !== "patient") {
      navigate("/medicines");
    } else if (user) {
      navigate("/prescriptions");
    }
  };

  return (
    <Layout className={styles.loginPage}>
      <Form className={styles.loginForm} autoComplete="off">
        <div className={styles.texts}>
          <img src={logo} />
          <h1>
            Программная система
            <br />
            для учета выдачи
            <br />
            рецептурных препаратов
          </h1>
        </div>
        <Form.Item<FieldType>
          label="Телефон"
          name="phone"
          rules={[{ required: true, message: "Введите номер телефона" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            onClick={() => login(mockUsers.admin)}
            className={styles.login}
          >
            Войти как админ
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            onClick={() => login(mockUsers.doctor)}
            className={styles.login}
          >
            Войти как врач
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            onClick={() => login(mockUsers.pharmacist)}
            className={styles.login}
          >
            Войти как фармацевт
          </Button>
        </Form.Item>
        <Form.Item label={null}>
          <Button
            type="primary"
            onClick={() => login(mockUsers.patient)}
            className={styles.login}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        className={styles.signup}
        onClick={() => navigate("/signup")}
      >
        Зарегистрироваться
      </Button>
    </Layout>
  );
};
