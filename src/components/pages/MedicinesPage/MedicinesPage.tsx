import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Table } from "antd";
import styles from "./MedicinesPage.module.css";
import { Link } from "react-router";

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

const columns = [
  {
    title: "Название",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Форма выпуска",
    dataIndex: "form",
    key: "form",
  },
  {
    title: "Состав",
    dataIndex: "composition",
    key: "composition",
  },
  {
    title: "Дозировка",
    dataIndex: "dosage",
    key: "dosage",
  },
  {
    title: "Действия",
    key: "actions",
    render: (_, render) => (
      <Link to={`/prescriptions/create?key=${render.key}`}>Создать рецепт</Link>
    ),
  },
];

export const MedicinesPage = () => {
  return (
    <Layout>
      <Header />
      <Content className={styles.content}>
        <Table dataSource={dataSource} columns={columns} />
      </Content>
    </Layout>
  );
};
