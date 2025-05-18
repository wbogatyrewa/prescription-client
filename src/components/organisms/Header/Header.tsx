import { Header as AntdHeader } from "antd/es/layout/layout";
import styles from "./Header.module.css";
import { Avatar, Button, Menu } from "antd";
import header from "../../../../content/header.json";
import { useMemo } from "react";
import { useAppContext, userRoleMap } from "../../../contexts/AppContext/AppContext";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import logo from "../../../assets/logo.svg";
import { removeToken } from "../../../api/auth/token";

type HeaderProps = {
  defaultSelectedKeys?: string[];
};

const DEFAULT_SELECTED_KEYS = ["1"];

export const Header = ({ defaultSelectedKeys }: HeaderProps) => {
  const { userData, setUserData } = useAppContext();
  const { user_role } = userData || {};

  const navigate = useNavigate();

  const logoff = () => {
    removeToken();
    setUserData(null);
    navigate("/");
    window.location.reload();
  };

  const items = useMemo(
    () =>
      user_role
        ? header[user_role].map((item, index) => ({
          key: index + 1,
          label: <Link to={item.link}>{item.label}</Link>,
        }))
        : [],
    [user_role]
  );

  if (!(userData && Object.keys(userData).length > 0)) {
    return null;
  }

  return (
    <AntdHeader className={styles.header}>
      <img src={logo} />
      <Menu
        className={styles.menu}
        mode="horizontal"
        defaultSelectedKeys={defaultSelectedKeys || DEFAULT_SELECTED_KEYS}
        items={items}
      />
      <Link to="/account" className={styles.avatar}>
        <Avatar
          style={{ backgroundColor: "#1890FF" }}
          icon={<UserOutlined />}
        />
        {userRoleMap[userData.user_role]}
      </Link>
      <Button type="primary" className={styles.logoff} onClick={logoff}>
        Выйти
      </Button>
    </AntdHeader>
  );
};
