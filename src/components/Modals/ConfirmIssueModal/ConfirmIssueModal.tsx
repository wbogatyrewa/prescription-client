import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from "./ConfirmIssueModal.module.css";
import givePrescription from "../../../api/prescriptions/givePrescription";
import { useAppContext } from "../../../contexts/AppContext/AppContext";

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
  const { userData } = useAppContext();

  const handleOk = () => {
    if (userData && userData.uuid) {
      givePrescription(prescriptionKey, userData.uuid)
        .then((response) => {
          if (!response.ok) {
            throw "";
          }

          setIsOpen(false);
          window.location.reload();
        })
        .catch((e) => {
          console.error(e)
        });
    }
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
