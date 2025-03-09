import { Header as AntdHeader } from "antd/es/layout/layout";
import styles from "./Header.module.css";
import { Avatar, Button, Menu } from "antd";
import header from "../../../../content/header.json";
import { useMemo } from "react";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import logo from "../../../assets/logo.svg";

type HeaderProps = {
  defaultSelectedKeys?: string[];
};

const DEFAULT_SELECTED_KEYS = ["1"];

export const Header = ({ defaultSelectedKeys }: HeaderProps) => {
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
            label: <Link to={item.link}>{item.label}</Link>,
          }))
        : [],
    [role]
  );

  return (
    <AntdHeader className={styles.header}>
      <img src={logo} />
      <Menu
        className={styles.menu}
        mode="horizontal"
        defaultSelectedKeys={defaultSelectedKeys || DEFAULT_SELECTED_KEYS}
        items={items}
      />
      <Button type="text" className={styles.avatar}>
        <Avatar
          style={{ backgroundColor: "#1890FF" }}
          icon={<UserOutlined />}
        />
        {userData?.username}
      </Button>
      <Button type="primary" className={styles.logoff} onClick={logoff}>
        Выйти
      </Button>
    </AntdHeader>
  );
};
