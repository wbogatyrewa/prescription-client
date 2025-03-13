import { Link } from "react-router";
import styles from "./SignupPage.module.css";
import { Button, Form, Input, Layout } from "antd";
import logo from "../../../assets/logo.svg";

type FieldType = {
  surname?: string;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  snils: string;
  password?: string;
};

export const SignupPage = () => {
  const signup = () => {};

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
        <div className={styles.texts}>
          <h2>Регистрация</h2>
        </div>
        <Form.Item<FieldType>
          label="Фамилия"
          name="surname"
          rules={[{ required: true, message: "Введите фамилию" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Имя"
          name="name"
          rules={[{ required: true, message: "Введите имя" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Отчество"
          name="lastname"
          rules={[{ message: "Введите отчество" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Номер телефона"
          name="phone"
          rules={[{ required: true, message: "Введите номер телефона" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Введите email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="СНИЛС"
          name="snils"
          rules={[{ required: true, message: "Введите СНИЛС" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Дата рождения"
          name="dateOfBirth"
          rules={[{ required: true, message: "Введите дату рождения" }]}
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
            onClick={() => signup()}
            className={styles.signup}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
        <div className={styles.texts}>
          Нажимая “Зарегистрироваться”, вы соглашаетесь c <br />
          <a href="#">Условиями использования</a> и <br />
          <a href="#">Политикой конфиденциальности</a>
        </div>
      </Form>
      <div className={styles.login}>
        Уже зарегистрировались? <Link to="/">Войти</Link>
      </div>
    </Layout>
  );
};
