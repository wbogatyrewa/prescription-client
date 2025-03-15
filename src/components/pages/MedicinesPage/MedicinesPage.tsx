import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Table } from "antd";
import styles from "./MedicinesPage.module.css";
import { Link } from "react-router";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";

const dataSource = [
  {
    key: "1",
    name: "Амоксициллин",
    form: "Таблетки",
    composition:
      "Действующее вещество: амоксициллина тригидрат - 287 мг, 574 мг (в пересчете на амоксициллин - 250 мг, 500 мг).",
    dosage: "500 мг",
  },
  {
    key: "2",
    name: "Амоксициллин",
    form: "Таблетки",
    composition:
      "Действующее вещество: амоксициллина тригидрат - 287 мг, 574 мг (в пересчете на амоксициллин - 250 мг, 500 мг).",
    dosage: "500 мг",
  },
];

export const MedicinesPage = () => {
  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();

  const columns = [
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
      dataIndex: "composition",
      key: "composition",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "composition",
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
      render: (_, render) => (
        <Link to={`/prescriptions/create?key=${render.key}`}>
          Создать рецепт
        </Link>
      ),
    },
  ];

  return (
    <Layout>
      <Header />
      <Content className={styles.content}>
        <Table dataSource={dataSource} columns={columns} />
      </Content>
    </Layout>
  );
};
