import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Button, Table } from "antd";
import styles from "./UsersPage.module.css";
import { Link } from "react-router";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { useMemo, useState } from "react";
import { DeleteUserModal } from "../../Modals/DeleteUserModal/DeleteUserModal";
import { UserModal } from "../../Modals/UserModal/UserModal";

const dataSource = [
  {
    key: "1",
    FIO: "Богатырева Вероника Олеговна",
    gender: "Ж",
    birthDate: "01-01-2001",
    address: "г. Москва, ул. Ленина, д.7, кв.78",
    passportNumber: 12345678790,
    dateOfIssue: "01-01-2001",
    issuedByWhom: "ГУ МВД",
    phone: "+78947851046",
    email: "veronika01-01@mail.ru",
    userRole: "Врач",
    organizationName: "ГБУЗ ГП № 19 ДЗМ Филиал № 3 (ГП № 189)",
    position: "Терапевт",
  },
  {
    key: "2",
    FIO: "Богатырева Вероника Олеговна",
    gender: "Ж",
    birthDate: "01-01-2001",
    address: "г. Москва, ул. Ленина, д.7, кв.78",
    passportNumber: 12345678790,
    dateOfIssue: "01-01-2001",
    issuedByWhom: "ГУ МВД",
    phone: "+78947851046",
    email: "veronika01-01@mail.ru",
    userRole: "Врач",
    organizationName: "ГБУЗ ГП № 19 ДЗМ Филиал № 3 (ГП № 189)",
    position: "Терапевт",
  },
];

export const UsersPage = () => {
  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState(false);
  const [currentUserKey, setCurrentUserKey] = useState("");

  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();
  const { userData } = useAppContext();

  const columns = useMemo(
    () => [
      {
        title: "ФИО",
        dataIndex: "FIO",
        key: "FIO",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "FIO",
        }),
      },
      {
        title: "Пол",
        dataIndex: "gender",
        key: "gender",
        filters: [
          {
            text: "М",
            value: "М",
          },
          {
            text: "Ж",
            value: "Ж",
          },
        ],
        onFilter: (value, record) => record.gender.startsWith(value as string),
      },
      {
        title: "Дата рождения",
        dataIndex: "birthDate",
        key: "birthDate",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "birthDate",
        }),
      },
      {
        title: "Адрес",
        dataIndex: "address",
        key: "address",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "address",
        }),
      },
      {
        title: "Серия и номер паспорта",
        dataIndex: "passportNumber",
        key: "passportNumber",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "passportNumber",
        }),
      },
      {
        title: "Дата выдачи паспорта",
        dataIndex: "dateOfIssue",
        key: "dateOfIssue",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "dateOfIssue",
        }),
      },
      {
        title: "Кем выдано",
        dataIndex: "issuedByWhom",
        key: "issuedByWhom",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "issuedByWhom",
        }),
      },
      {
        title: "Номер телефона",
        dataIndex: "phone",
        key: "phone",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "phone",
        }),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "email",
        }),
      },
      {
        title: "Роль",
        dataIndex: "userRole",
        key: "userRole",
        filters: [
          {
            text: "Врач",
            value: "Врач",
          },
          {
            text: "Фармацевт",
            value: "Фармацевт",
          },
        ],
        onFilter: (value, record) =>
          record.userRole.startsWith(value as string),
      },
      {
        title: "Название организации",
        dataIndex: "organizationName",
        key: "organizationName",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "organizationName",
        }),
      },
      {
        title: "Специальность",
        dataIndex: "position",
        key: "position",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "position",
        }),
      },
      {
        title: "Действия",
        key: "actions",
        fixed: "right",
        render: (_, render) => {
          const buttons = [
            {
              link: ``,
              onClick: () => {
                setCurrentUserKey(render.key);
                setIsOpenUserModal(true);
              },
              label: `Открыть`,
            },
          ];

          if (userData) {
            if (userData.role === "admin") {
              buttons.push({
                link: `/users/create?key=${render.key}`,
                onClick: () => {},
                label: `Редактировать`,
              });
              buttons.push({
                link: ``,
                onClick: () => {
                  setCurrentUserKey(render.key);
                  setIsOpenDeleteUserModal(true);
                },
                label: `Удалить`,
              });
            }
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
    [
      handleReset,
      handleSearch,
      searchInput,
      searchText,
      searchedColumn,
      userData,
    ]
  );

  return (
    <Layout>
      <UserModal
        isOpen={isOpenUserModal}
        setIsOpen={setIsOpenUserModal}
        userKey={currentUserKey}
      />
      <DeleteUserModal
        isOpen={isOpenDeleteUserModal}
        setIsOpen={setIsOpenDeleteUserModal}
        userKey={currentUserKey}
      />
      <Header defaultSelectedKeys={["3"]} />
      <Content className={styles.content}>
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: "max-content" }}
        />
      </Content>
    </Layout>
  );
};
