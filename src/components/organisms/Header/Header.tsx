import { Header as AntdHeader } from "antd/es/layout/layout";
import styles from "./Header.module.css";
import { Avatar, Button, Menu, Typography } from "antd";
import header from "../../../../content/header.json";
import { useMemo } from "react";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

export const Header = () => {
  const { userData, setUserData } = useAppContext();
  const { role } = userData || {};

  const navigate = useNavigate();

  const logoff = () => {
    setUserData(null);
    navigate("/");
  };

  const items = useMemo(
    () =>
      role
        ? header[role].map((item, index) => ({
            key: index + 1,
            label: item.label,
            link: item.link,
          }))
        : [],
    [role]
  );

  return (
    <AntdHeader className={styles.header}>
      <div className={styles.logo}>Лого</div>
      <Menu
        className={styles.menu}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        items={items}
      />
      <Button type="text" className={styles.avatar} onClick={logoff}>
        <Avatar
          style={{ backgroundColor: "#1890FF" }}
          icon={<UserOutlined />}
        />
        <Typography>{userData?.username}</Typography>
      </Button>
    </AntdHeader>
  );
};
