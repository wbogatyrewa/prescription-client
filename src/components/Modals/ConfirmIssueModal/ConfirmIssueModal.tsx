import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./ConfirmIssueModal.module.css";

type ConfirmIssueModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  prescriptionKey: string;
};

export const ConfirmIssueModal = ({
  isOpen,
  setIsOpen,
  prescriptionKey,
}: ConfirmIssueModalProps) => {
  const handleOk = () => {
    // запрос на выдачу рецепта и релоад страницы, чтобы подгрузить новые статусы
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
            Вы уверены, что хотите выдать <br />
            рецептурный препарат?
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
