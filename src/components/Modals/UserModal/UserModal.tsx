import { Descriptions, DescriptionsProps, Modal } from "antd";
import styles from "./UserModal.module.css";

type UserModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userKey: string;
};

const medicineItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Название препарата",
    children: "Амоксициллин",
  },
  {
    key: "2",
    label: "Форма выпуска",
    children: "Таблетки",
  },
  {
    key: "3",
    label: "Количество",
    children: "50 таб.",
  },
  {
    key: "4",
    label: "Дозировка",
    children: "500 мг",
  },
  {
    key: "5",
    label: "Способ применения",
    children: "По 1 таблетке 2-3 раза в сутки после еды.",
  },
];

export const UserModal = ({ isOpen, setIsOpen, userKey }: UserModalProps) => {
  // при открытии модалки получать все данные о препарате

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={`Информация о пользователе №${userKey}`}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer=""
    >
      <div className={styles.infoWrapper}>
        <Descriptions
          title="Рецептурный препарат"
          items={medicineItems}
          bordered
          column={1}
          size="small"
        />
      </div>
    </Modal>
  );
};
