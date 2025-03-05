import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
// import styles from "./MedicinesPage.module.css";

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#0958d9",
};

export const MedicinesPage = () => {
  return (
    <Layout>
      <Header />
      <Content style={contentStyle}>
        Страница с рецептурными препаратами
      </Content>
    </Layout>
  );
};
