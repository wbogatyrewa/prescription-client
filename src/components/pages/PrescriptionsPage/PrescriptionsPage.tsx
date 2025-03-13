import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Badge, Button, Table } from "antd";
import styles from "./PrescriptionsPage.module.css";
import { useState } from "react";
import { PrescriptionModal } from "../../Modals/PrescriptionModal/PrescriptionModal";

const dataSource = [
  {
    key: "1",
    name: "Амоксициллин",
    patient: "Богатырева Вероника Олеговна",
    typeOfPrescription: "За полную стоимость",
    status: "Действующий",
    createdDate: "2021-02-05 08:28:36",
  },
  {
    key: "2",
    name: "Амоксициллин",
    patient: "Богатырева Вероника Олеговна",
    typeOfPrescription: "За полную стоимость",
    status: "Отпущен",
    createdDate: "2021-02-05 08:28:36",
  },
];

export const PrescriptionsPage = () => {
  const [isOpenPrescriptionModal, setIsOpenPrescriptionModal] = useState(false);
  const [currentPrescriptionKey, setCurrentPrescriptionKey] = useState("");

  const openPrescriptionModal = (prescriptionKey: string) => {
    setCurrentPrescriptionKey(prescriptionKey);
    setIsOpenPrescriptionModal(true);
  };

  const columns = [
    {
      title: "Название препарата",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ФИО пациента",
      dataIndex: "patient",
      key: "patient",
    },
    {
      title: "Тип рецепта",
      dataIndex: "typeOfPrescription",
      key: "typeOfPrescription",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (_, render) => (
        <Badge
          color={
            render.status === "Действующий"
              ? "#52C41A"
              : render.status === "Просрочен"
              ? "#FF4D4F"
              : "#D9D9D9"
          }
          text={render.status}
        />
      ),
    },
    {
      title: "Дата создания",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, render) => (
        <Button type="link" onClick={() => openPrescriptionModal(render.key)}>
          Открыть
        </Button>
      ),
    },
  ];

  return (
    <Layout>
      <PrescriptionModal
        isOpen={isOpenPrescriptionModal}
        setIsOpen={setIsOpenPrescriptionModal}
        prescriptionKey={currentPrescriptionKey}
      />
      <Header defaultSelectedKeys={["2"]} />
      <Content className={styles.content}>
        <Table dataSource={dataSource} columns={columns} />
      </Content>
    </Layout>
  );
};
