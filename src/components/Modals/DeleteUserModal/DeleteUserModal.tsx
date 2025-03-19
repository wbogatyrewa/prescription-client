import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./DeleteUserModal.module.css";

type DeleteUserModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userKey: string;
};

export const DeleteUserModal = ({
  isOpen,
  setIsOpen,
  userKey,
}: DeleteUserModalProps) => {
  const handleOk = () => {
    // запрос на удаление пользователя
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
            Вы уверены, что хотите удалить этого пользователя?
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
