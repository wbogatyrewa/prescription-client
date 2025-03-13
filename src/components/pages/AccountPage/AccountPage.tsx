import { Descriptions, DescriptionsProps, Layout } from "antd";
import styles from "./AccountPage.module.css";
import { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { useAppContext } from "../../../contexts/AppContext/AppContext";

export const AccountPage = () => {
  // при открытии страницы получать с бека все данные о юзере
  const { userData } = useAppContext();

  const accountItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ФИО",
      children: userData?.username,
    },
    {
      key: "2",
      label: "Роль",
      children: userData?.role,
    },
    {
      key: "3",
      label: "Email",
      children: userData?.email,
    },
  ];

  return (
    <Layout>
      <Header defaultSelectedKeys={["0"]} />
      <Content className={styles.content}>
        <Descriptions
          title="Данные пользователя"
          items={accountItems}
          bordered
          column={1}
          size="small"
        />
      </Content>
    </Layout>
  );
};
