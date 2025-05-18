import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, DatePicker, Form, FormProps, Input, Select } from "antd";
import styles from "./CreatePrescriptionPage.module.css";
import { PatientModal } from "../../Modals/PatientModal/PatientModal";
import { useCallback, useMemo, useState } from "react";
import { MedicinesModal } from "../../Modals/MedicinesModal/MedicinesModal";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { useNavigate } from "react-router";
import createPrescription from "../../../api/prescriptions/createPrescription";

type FieldType = {
  expiredDate?: string;
  typeOfPrescription?: "Льготный" | "За полную стоимость";
  methodOfApplication?: string;
};

const DEFAULT_ERROR_TEXT = "";
const ERROR_TEXT = "Ошибка при создании аккаунта. Попробуйте позже.";

export const CreatePrescriptionPage = () => {
  const { userData, medicines, patients } = useAppContext();

  const [error, setError] = useState(DEFAULT_ERROR_TEXT);

  const navigate = useNavigate();

  const [isOpenPatientModal, setIsOpenPatientModal] = useState(false);
  const [isOpenMedicinesModal, setIsOpenMedicinesModal] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [medicineId, setMedicineId] = useState("");

  const medicine = useMemo(() => medicineId && medicines ? medicines.find((elem) => elem.uuid === medicineId) : undefined, [medicineId, medicines]);

  const patient = useMemo(() => patientId && patients ? patients.find((elem) => elem.uuid === patientId) : undefined, [patientId, patients]);

  const onFinish: FormProps<FieldType>['onFinish'] = useCallback(({
    expiredDate,
    typeOfPrescription,
    methodOfApplication,
  }: FieldType) => {
    const prescription = {
      doctor: userData?.uuid,
      patient: patientId,
      pharmacist: "",
      status: "CREATED",
      medicine_id: medicineId,
      type: typeOfPrescription,
      description: methodOfApplication,
      created_at: Date.now(),
      expiration_time: (new Date(expiredDate || "").getTime() / 1000)
    }

    if (expiredDate && typeOfPrescription && methodOfApplication && userData && userData.uuid && patientId && medicineId) {
      createPrescription(prescription)
        .then((response) => {
          if (!response.ok) {
            throw "";
          }
          setError(DEFAULT_ERROR_TEXT);
          navigate("/prescriptions");
        })
        .catch((e) => {
          setError(ERROR_TEXT);
          console.error(e)
        });
    }
  }, [medicineId, navigate, patientId, userData]);

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
        <Form className={styles.createForm} autoComplete="off" onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Лекарственный препарат"
            rules={[
              { required: true, message: "Выберите лекарственный препарат" },
            ]}
          >
            <div className={styles.patientWrapper}>
              <Button onClick={() => setIsOpenMedicinesModal(true)}>
                Выбрать
              </Button>
            </div>
            {!!medicineId && medicine && (
              <div>
                <p>Название: {medicine.name}</p>
                <p>Форма выпуска: {medicine.form}</p>
                <p>Дозировка: {medicine.dosage}</p>
                <p>Количество: {medicine.count}</p>
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
            rules={[{ required: true, message: "Выберите пациента" }]}
          >
            <div className={styles.patientWrapper}>
              <Button onClick={() => setIsOpenPatientModal(true)}>
                Выбрать
              </Button>
            </div>
            {patientId && patient && (
              <div>
                <p>ФИО: {patient.full_name}</p>
                <p>Дата рождения: {patient.birth_date}</p>
                <p>Номер телефона: {patient.phone}</p>
                <p>Серия и номер паспорта: {patient.passport_number}</p>
              </div>
            )}
          </Form.Item>
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">Создать</Button>
          </Form.Item>
          {!!error && <Form.Item label={null}>
            <span className={styles.error}>
              {error}
            </span>
          </Form.Item>}
        </Form>
      </Content>
    </Layout>
  );
};
