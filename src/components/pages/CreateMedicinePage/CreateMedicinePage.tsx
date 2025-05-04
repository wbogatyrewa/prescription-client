import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, Form, Input } from "antd";
import styles from "./CreateMedicinePage.module.css";
import { useSearchParams } from "react-router";

type FieldType = {
  name?: string;
  count?: number;
  dosage?: number;
  producer?: string;
  description?: string;
  form?: string;
};

export const CreateMedicinePage = () => {
  const [searchParams] = useSearchParams();

  const medicineId = searchParams.get("key");
  // получить данные по id и заполнить поля из формы

  return (
    <Layout>
      <Header defaultSelectedKeys={["2"]} />
      <Content className={styles.content}>
        <Form className={styles.createForm} autoComplete="off">
          <Form.Item<FieldType>
            label="Название лекарственного препарата"
            name="name"
            rules={[
              { required: true, message: "Выберите лекарственный препарат" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Количество"
            name="count"
            rules={[{ required: true, message: "Введите количество" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Дозировка"
            name="dosage"
            rules={[{ required: true, message: "Введите дозировку" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Производитель"
            name="producer"
            rules={[{ required: true, message: "Введите производителя" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Состав"
            name="description"
            rules={[{ required: true, message: "Введите состав" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Форма выпуска"
            name="form"
            rules={[{ required: true, message: "Введите форму выпуска" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary">
              {medicineId ? "Редактировать" : "Создать"}
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
