import { Link } from "react-router";
import styles from "./SignupPage.module.css";
import { Button, Form, Input, Layout, Select } from "antd";
import logo from "../../../assets/logo.svg";

type FieldType = {
  surname?: string;
  name?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  gender: "Ж" | "М";
  password?: string;
  passportNumber?: number;
  passportDate?: string;
  passportIssuer?: string;
  region?: string;
  town?: string;
  street?: string;
  houseNumber?: number;
  flat?: number;
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
        <div className={styles.formWrapper}>
          <div>
            <h3>Персональные данные</h3>
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
          label="Пол"
          name="gender"
          rules={[{ required: true, message: "Выберите пол" }]}
        >
          <Select>
              <Select.Option value="Ж">Ж</Select.Option>
              <Select.Option value="М">
              М
              </Select.Option>
            </Select>
        </Form.Item>
        <Form.Item<FieldType>
          label="Дата рождения"
          name="dateOfBirth"
          rules={[{ required: true, message: "Введите дату рождения" }]}
        >
          <Input />
        </Form.Item>
        <h3>Контактные данные</h3>
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
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password />
        </Form.Item>
          </div>
          <div>
          <h3>Паспортные данные</h3>
          <Form.Item<FieldType>
          label="Серия и номер"
          name="passportNumber"
          rules={[{ required: true, message: "Введите серию и номер" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Дата выдачи"
          name="passportDate"
          rules={[{ required: true, message: "Введите дату выдачи" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Кем выдано"
          name="passportIssuer"
          rules={[{ required: true, message: "Введите кем выдано" }]}
        >
          <Input />
        </Form.Item>
        <h3>Адрес проживания</h3>
        <Form.Item<FieldType>
          label="Регион"
          name="region"
          rules={[{ message: "Введите регион" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Населенный пункт"
          name="town"
          rules={[{ required: true, message: "Введите населенный пункт" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Улица"
          name="street"
          rules={[{ required: true, message: "Введите улицу" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Номер дома"
          name="houseNumber"
          rules={[{ required: true, message: "Введите номер дома" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Номер квартиры"
          name="flat"
          rules={[{ required: true, message: "Введите номер квартиры" }]}
        >
          <Input />
        </Form.Item>
          </div>
        </div>
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
