import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, DatePicker, Form, Input, Select } from "antd";
import styles from "./CreatePrescriptionPage.module.css";
import { PatientModal } from "../../Modals/PatientModal/PatientModal";
import { useState } from "react";

type FieldType = {
  name?: string;
  count?: number;
  dosage?: number;
  expiredDate?: string;
  typeOfPrescription?: "Льготный" | "За полную стоимость";
  methodOfApplication?: string;
  patientId?: string;
};

export const CreatePrescriptionPage = () => {
  // получить из квери ключ препарата, если есть, заполнить данные о нем, если нет, показать кнопку для выбора

  const [isOpenPatientModal, setIsOpenPatientModal] = useState(false);
  const [patientId, setPatientId] = useState("");

  return (
    <Layout>
      <PatientModal
        isOpen={isOpenPatientModal}
        setIsOpen={setIsOpenPatientModal}
        setPatientId={setPatientId}
      />
      <Header defaultSelectedKeys={["3"]} />
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
            label="Срок действия рецепта"
            name="expiredDate"
            rules={[
              { required: true, message: "Введите срок действия рецепта" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item<FieldType>
            label="Тип рецепта"
            name="typeOfPrescription"
            rules={[{ required: true, message: "Введите тип рецепта" }]}
          >
            <Select>
              <Select.Option value="Льготный">Льготный</Select.Option>
              <Select.Option value="За полную стоимость">
                За полную стоимость
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType>
            label="Способ применения"
            name="methodOfApplication"
            rules={[{ required: true, message: "Введите способ применения" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Пациент"
            name="methodOfApplication"
            rules={[{ required: true, message: "Выберите пациента" }]}
          >
            <div className={styles.patientWrapper}>
              {!!patientId && <div>Пациент: {patientId}</div>}
              <Button onClick={() => setIsOpenPatientModal(true)}>
                Выбрать
              </Button>
            </div>
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary">Создать</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
