import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Badge, Button, Table } from "antd";
import styles from "./PrescriptionsPage.module.css";
import { useState } from "react";
import { PrescriptionModal } from "../../Modals/PrescriptionModal/PrescriptionModal";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";

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
    patient: "Иванов Иван Иванович",
    typeOfPrescription: "Льготный",
    status: "Отпущен",
    createdDate: "2021-02-05 08:28:36",
  },
];

export const PrescriptionsPage = () => {
  const [isOpenPrescriptionModal, setIsOpenPrescriptionModal] = useState(false);
  const [currentPrescriptionKey, setCurrentPrescriptionKey] = useState("");

  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();

  const openPrescriptionModal = (prescriptionKey: string) => {
    setCurrentPrescriptionKey(prescriptionKey);
    setIsOpenPrescriptionModal(true);
  };

  const columns = [
    {
      title: "Название препарата",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "name",
      }),
    },
    {
      title: "ФИО пациента",
      dataIndex: "patient",
      key: "patient",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "patient",
      }),
    },
    {
      title: "Тип рецепта",
      dataIndex: "typeOfPrescription",
      key: "typeOfPrescription",
      filters: [
        {
          text: "За полную стоимость",
          value: "За полную стоимость",
        },
        {
          text: "Льготный",
          value: "Льготный",
        },
      ],
      onFilter: (value, record) =>
        record.typeOfPrescription.startsWith(value as string),
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
      filters: [
        {
          text: "Отпущен",
          value: "Отпущен",
        },
        {
          text: "Действующий",
          value: "Действующий",
        },
        {
          text: "Просрочен",
          value: "Просрочен",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as string),
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
