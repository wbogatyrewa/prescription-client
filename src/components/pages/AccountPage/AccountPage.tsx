import { Descriptions, DescriptionsProps, Layout } from "antd";
import styles from "./AccountPage.module.css";
import { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { useAppContext } from "../../../contexts/AppContext/AppContext";

const personalItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Фамилия",
    children: "Богатырева",
  },
  {
    key: "2",
    label: "Имя",
    children: "Вероника",
  },
  {
    key: "3",
    label: "Отчество",
    children: "Олеговна",
  },
  {
    key: "4",
    label: "Пол",
    children: "Ж",
  },
  {
    key: "5",
    label: "Дата рождения",
    children: "01-01-2001",
  },
];

const addressItems: DescriptionsProps["items"] = [
  // {
  //   key: "1",
  //   label: "Область",
  //   children: "",
  // },
  {
    key: "2",
    label: "Город",
    children: "Москва",
  },
  {
    key: "3",
    label: "Улица",
    children: "Ленина",
  },
  {
    key: "4",
    label: "Номер дома",
    children: "7",
  },
  {
    key: "5",
    label: "Квартира",
    children: "78",
  },
];

const passportItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Серия и номер паспорта",
    children: "7895456789",
  },
  {
    key: "2",
    label: "Дата выдачи",
    children: "2021-03-05",
  },
  {
    key: "3",
    label: "Кем выдано",
    children: "ГУ МВД",
  },
];

const contactsItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Номер телефона",
    children: "+79856547821",
  },
  {
    key: "2",
    label: "Почта",
    children: "veronika01-01@mail.ru",
  },
];

const organizationItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Название",
    children: "ГБУЗ «ГП №19 ДЗМ»",
  },
  {
    key: "2",
    label: "Роль пользователя",
    children: "Врач",
  },
  {
    key: "3",
    label: "Специализация",
    children: "Терапевт",
  },
];

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
        {/* <Descriptions
          title="Данные пользователя"
          items={accountItems}
          bordered
          column={1}
          size="small"
        /> */}

<div className={styles.infoWrapper}>
        <Descriptions
          title="Персональные данные"
          items={personalItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Адрес проживания"
          items={addressItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Паспортные данные"
          items={passportItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Контактные данные"
          items={contactsItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Медицинская организация"
          items={organizationItems}
          bordered
          column={1}
          size="small"
        />
      </div>
      </Content>
    </Layout>
  );
};
