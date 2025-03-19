import { Descriptions, DescriptionsProps, Modal } from "antd";
import styles from "./UserModal.module.css";

type UserModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userKey: string;
};

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
  {
    key: "6",
    label: "Роль пользователя",
    children: "Врач",
  },
  {
    key: "7",
    label: "Специализация",
    children: "Терапевт",
  },
];

const addressItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Область",
    children: "",
  },
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
];

export const UserModal = ({ isOpen, setIsOpen, userKey }: UserModalProps) => {
  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={`Информация о пользователе`}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer=""
    >
      <div className={styles.infoWrapper}>
        <Descriptions
          title="Личные данные"
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
    </Modal>
  );
};
