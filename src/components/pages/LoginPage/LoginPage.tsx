import { useNavigate } from "react-router";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import styles from "./LoginPage.module.css";
import { Button, Form, FormProps, Input, Layout } from "antd";
import logo from "../../../assets/logo.svg";
import { useCallback, useState } from "react";
import signin from "../../../api/auth/signin";
import { setToken } from "../../../api/auth/token";

type FieldType = {
  phone?: string;
  password?: string;
};

const ERROR_TEXT = "Неверный номер телефона или пароль.";
const DEFAULT_ERROR_TEXT = "";

export const LoginPage = () => {
  const [error, setError] = useState(DEFAULT_ERROR_TEXT);

  const { setUserData } = useAppContext();

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = useCallback(({ phone, password }: FieldType) => {
    if (phone && password) {
      signin(phone, password)
        .then((response) => {
          if (!response.ok) {
            throw "";
          }
          return response;
        })
        .then((response) => response.json())
        .then((data) => {
          if (data && Object.keys(data).length > 0) {
            setUserData(data);
            setToken(data);
            setError(DEFAULT_ERROR_TEXT);

            if (data.user_role !== "patient") {
              navigate("/medicines");
            } else {
              navigate("/prescriptions");
            }
          } else {
            setError(ERROR_TEXT);
          }
        })
        .catch((e) => {
          setError(ERROR_TEXT);
          console.error(e)
        });
    }
  }, [navigate, setUserData]);

  return (
    <Layout className={styles.loginPage}>
      <Form className={styles.loginForm} autoComplete="off" onFinish={onFinish}>
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
            htmlType="submit"
            className={styles.login}
          >
            Войти
          </Button>
        </Form.Item>
        {!!error && <Form.Item label={null}>
          <span className={styles.error}>
            {error}
          </span>
        </Form.Item>
        }
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
