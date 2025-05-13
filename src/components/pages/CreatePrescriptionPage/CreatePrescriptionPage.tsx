import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, DatePicker, Form, Input, Select } from "antd";
import styles from "./CreatePrescriptionPage.module.css";
import { PatientModal } from "../../Modals/PatientModal/PatientModal";
import { useState } from "react";
import { MedicinesModal } from "../../Modals/MedicinesModal/MedicinesModal";

type FieldType = {
  name?: string;
  medicine?: string;
  count?: number;
  dosage?: number;
  expiredDate?: string;
  typeOfPrescription?: "Льготный" | "За полную стоимость";
  methodOfApplication?: string;
  patient?: string;
};

export const CreatePrescriptionPage = () => {
  // показать кнопку для выбора лекарства

  const [isOpenPatientModal, setIsOpenPatientModal] = useState(false);
  const [isOpenMedicinesModal, setIsOpenMedicinesModal] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [medicineId, setMedicineId] = useState("");

  return (
    <Layout>
      <PatientModal
        isOpen={isOpenPatientModal}
        setIsOpen={setIsOpenPatientModal}
        setPatientId={setPatientId}
      />
      <MedicinesModal
        isOpen={isOpenMedicinesModal}
        setIsOpen={setIsOpenMedicinesModal}
        setMedicineId={setMedicineId}
      />
      <Header defaultSelectedKeys={["3"]} />
      <Content className={styles.content}>
        <Form className={styles.createForm} autoComplete="off">
          <Form.Item<FieldType>
            label="Лекарственный препарат"
            name="medicine"
            rules={[
              { required: true, message: "Выберите лекарственный препарат" },
            ]}
          >
            <div className={styles.patientWrapper}>
              <Button onClick={() => setIsOpenMedicinesModal(true)}>
                Выбрать
              </Button>
            </div>
            {!!medicineId && (
              <div>
                <p>Название: Амоксициллин</p>
                <p>Форма выпуска: Таблетки</p>
                <p>Дозировка: 500 мг</p>
                <p>Количество: 20 шт</p>
              </div>
            )}
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
            name="patient"
            rules={[{ required: true, message: "Выберите пациента" }]}
          >
            <div className={styles.patientWrapper}>
              <Button onClick={() => setIsOpenPatientModal(true)}>
                Выбрать
              </Button>
            </div>
            {!patientId && (
              <div>
                <p>ФИО: Богатырева Вероника Олеговна</p>
                <p>Дата рождения: 22.09.2001</p>
                <p>Серия и номер паспорта: 1234567890</p>
              </div>
            )}
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary">Создать</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
