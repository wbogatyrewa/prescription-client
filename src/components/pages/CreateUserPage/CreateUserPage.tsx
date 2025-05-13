import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, DatePicker, Form, Input, Select } from "antd";
import styles from "./CreateUserPage.module.css";
import { useSearchParams } from "react-router";

type FieldType = {
  firstName?: string;
  secondName?: string;
  lastName?: string;
  gender?: "М" | "Ж";
  birthDate?: string;
  region?: string;
  town?: string;
  street?: string;
  houseNumber?: string;
  flat?: string;
  passportNumber?: number;
  dateOfIssue?: string;
  issuedByWhom?: string;
  phone?: string;
  email?: string;
  userRole?: string;
  password?: string;
  organizationName?: string;
  position?: string;
};

export const CreateUserPage = () => {
  const [searchParams] = useSearchParams();

  const userId = searchParams.get("key");
  // получить данные по id и заполнить поля из формы

  return (
    <Layout>
      <Header defaultSelectedKeys={["4"]} />
      <Content className={styles.content}>
        <Form className={styles.createForm} autoComplete="off">
          <div className={styles.blockTitle}>Персональные данные</div>
          <Form.Item<FieldType>
            label="Фамилия"
            name="firstName"
            rules={[{ required: true, message: "Введите фамилию" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Имя"
            name="secondName"
            rules={[{ required: true, message: "Введите имя" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Отчество"
            name="lastName"
            rules={[{ required: false, message: "Введите отчество" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Пол"
            name="gender"
            rules={[{ required: true, message: "Выберите пол" }]}
          >
            <Select>
              <Select.Option value="М">М</Select.Option>
              <Select.Option value="Ж">Ж</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Дата рождения"
            name="birthDate"
            rules={[{ required: true, message: "Введите дату рождения" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<FieldType>
            label="Роль пользователя"
            name="userRole"
            rules={[{ required: true, message: "Выберите роль пользователя" }]}
          >
            <Select>
              <Select.Option value="Врач">Врач</Select.Option>
              <Select.Option value="Фармацевт">Фармацевт</Select.Option>
            </Select>
          </Form.Item>

          <div className={styles.blockTitle}>Адрес проживания</div>
          <Form.Item<FieldType>
            label="Область"
            name="region"
            rules={[{ required: true, message: "Введите область" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Город"
            name="town"
            rules={[{ required: true, message: "Введите город" }]}
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
            label="Квартира"
            name="flat"
            rules={[{ required: false, message: "Введите номер квартиры" }]}
          >
            <Input />
          </Form.Item>
          <div className={styles.blockTitle}>Паспортные данные</div>
          <Form.Item<FieldType>
            label="Серия и номер паспорта"
            name="passportNumber"
            rules={[
              { required: true, message: "Введите серию и номер паспорта" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item<FieldType>
            label="Дата выдачи"
            name="dateOfIssue"
            rules={[{ required: true, message: "Введите дату выдачи" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<FieldType>
            label="Кем выдано"
            name="issuedByWhom"
            rules={[{ required: true, message: "Введите кем выдано" }]}
          >
            <Input />
          </Form.Item>
          <div className={styles.blockTitle}>Контактные данные</div>
          <Form.Item<FieldType>
            label="Номер телефона"
            name="phone"
            rules={[{ required: true, message: "Введите номер телефона" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Почта"
            name="email"
            rules={[{ required: true, message: "Введите почту" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input readOnly />
            <Button type="link">Сгенерировать пароль</Button>
          </Form.Item>
          <div className={styles.blockTitle}>Медицинская организация</div>
          <Form.Item<FieldType>
            label="Название"
            name="organizationName"
            rules={[{ required: true, message: "Введите название" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Специализация"
            name="position"
            rules={[{ required: true, message: "Введите специализацию" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary">
              {userId ? "Редактировать" : "Создать"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
