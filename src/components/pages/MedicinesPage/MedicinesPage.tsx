/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, Table } from "antd";
import styles from "./MedicinesPage.module.css";
import { Link } from "react-router";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { useMemo, useState } from "react";
import { MedicineModal } from "../../Modals/MedicineModal/MedicineModal";
import { DeleteMedicineModal } from "../../Modals/DeleteMedicineModal/DeleteMedicineModal";

export const MedicinesPage = () => {
  const [isOpenMedicineModal, setIsOpenMedicineModal] = useState(false);
  const [isOpenDeleteMedicineModal, setIsOpenDeleteMedicineModal] =
    useState(false);
  const [currentMedicineKey, setCurrentMedicineKey] = useState("");

  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();
  const { userData, medicines } = useAppContext();
  const { user_role } = userData || {}

  const columns = useMemo(
    () => [
      {
        title: "Название",
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
        title: "Форма выпуска",
        dataIndex: "form",
        key: "form",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "form",
        }),
      },
      {
        title: "Состав",
        dataIndex: "description",
        key: "description",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "description",
        }),
      },
      {
        title: "Дозировка",
        dataIndex: "dosage",
        key: "dosage",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "dosage",
        }),
      },
      {
        title: "Действия",
        key: "actions",
        render: (_: any, render: any) => {
          const buttons = [
            {
              link: ``,
              onClick: () => {
                setCurrentMedicineKey(render.key);
                setIsOpenMedicineModal(true);
              },
              label: `Открыть`,
            },
          ];

          if (user_role === "admin") {
            buttons.push({
              link: `/medicines/create?key=${render.key}`,
              onClick: () => { },
              label: `Редактировать`,
            });
            buttons.push({
              link: ``,
              onClick: () => {
                setCurrentMedicineKey(render.key);
                setIsOpenDeleteMedicineModal(true);
              },
              label: `Удалить`,
            });
          }

          return buttons.map((button, index) =>
            button.link ? (
              <Link key={index} to={button.link}>
                {button.label}
              </Link>
            ) : (
              <Button key={index} type="link" onClick={button.onClick}>
                {button.label}
              </Button>
            )
          );
        },
      },
    ],
    [handleReset, handleSearch, searchInput, searchText, searchedColumn, user_role]
  );

  return (
    <Layout>
      <MedicineModal
        isOpen={isOpenMedicineModal}
        setIsOpen={setIsOpenMedicineModal}
        medicineKey={currentMedicineKey}
      />
      <DeleteMedicineModal
        isOpen={isOpenDeleteMedicineModal}
        setIsOpen={setIsOpenDeleteMedicineModal}
        medicineKey={currentMedicineKey}
      />
      <Header />
      <Content className={styles.content}>
        <Table dataSource={medicines} columns={columns} />
      </Content>
    </Layout>
  );
};
