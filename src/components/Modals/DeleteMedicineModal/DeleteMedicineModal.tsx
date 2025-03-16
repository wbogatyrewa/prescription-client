import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./DeleteMedicineModal.module.css";

type DeleteMedicineModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  medicineKey: string;
};

export const DeleteMedicineModal = ({
  isOpen,
  setIsOpen,
  medicineKey,
}: DeleteMedicineModalProps) => {
  const handleOk = () => {
    // запрос на удаление препарата
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={
        <div className={styles.titleWrapper}>
          <ExclamationCircleFilled />
          <span className={styles.title}>
            Вы уверены, что хотите удалить этот рецептурный <br />
            препарат?
          </span>
        </div>
      }
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Да"
      cancelText="Нет"
    />
  );
};
