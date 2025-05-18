import { Descriptions, DescriptionsProps, Layout } from "antd";
import styles from "./AccountPage.module.css";
import { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { EmployerType, PatientType, useAppContext } from "../../../contexts/AppContext/AppContext";

export const AccountPage = () => {
  const { userData, patients, employees } = useAppContext();

  const user: PatientType | EmployerType = userData?.user_role === "patient"
    ? patients.find(elem => elem.uuid === userData.uuid) as PatientType
    : employees.find(elem => elem.uuid === userData?.uuid) as EmployerType;

  const personalItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ФИО",
      children: user?.full_name,
    },
    {
      key: "4",
      label: "Пол",
      children: user?.gender,
    },
    {
      key: "5",
      label: "Дата рождения",
      children: new Date(user?.birth_date || "").toLocaleDateString(),
    },
  ];

  // const addressItems: DescriptionsProps["items"] = [
  //   {
  //     key: "1",
  //     label: "Регион",
  //     children: "",
  //   },
  //   {
  //     key: "2",
  //     label: "Город",
  //     children: "Москва",
  //   },
  //   {
  //     key: "3",
  //     label: "Улица",
  //     children: "Ленина",
  //   },
  //   {
  //     key: "4",
  //     label: "Номер дома",
  //     children: "7",
  //   },
  //   {
  //     key: "5",
  //     label: "Квартира",
  //     children: "78",
  //   },
  // ];

  const passportItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Серия и номер паспорта",
      children: user?.passport_number,
    },
    {
      key: "2",
      label: "Дата выдачи",
      children: new Date(user?.passport_date || "").toLocaleDateString(),
    },
    {
      key: "3",
      label: "Кем выдано",
      children: user?.passport_issuer,
    },
  ];

  const contactsItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Номер телефона",
      children: user?.phone,
    },
    {
      key: "2",
      label: "Почта",
      children: user?.email,
    },
  ];

  const organizationItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Название",
      children: (user as EmployerType)?.organization,
    },
    {
      key: "2",
      label: "Роль пользователя",
      children: (user as EmployerType)?.user_role,
    },
    {
      key: "3",
      label: "Специализация",
      children: (user as EmployerType)?.position,
    },
    {
      key: "4",
      label: "Номер лицензии",
      children: (user as EmployerType)?.licence_number,
    },
  ];

  return (
    <Layout>
      <Header defaultSelectedKeys={["0"]} />
      <Content className={styles.content}>
        <div className={styles.infoWrapper}>
          <Descriptions
            title="Персональные данные"
            items={personalItems}
            bordered
            column={1}
            size="small"
          />
          {/* <Descriptions
            title="Адрес проживания"
            items={addressItems}
            bordered
            column={1}
            size="small"
          /> */}
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
