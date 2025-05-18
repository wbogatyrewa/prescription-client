import { Descriptions, DescriptionsProps, Modal } from "antd";
import styles from "./MedicineModal.module.css";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { useMemo } from "react";

type MedicineModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  medicineKey: string;
};

export const MedicineModal = ({
  isOpen,
  setIsOpen,
  medicineKey,
}: MedicineModalProps) => {
  const { medicines } = useAppContext();

  const medicine = useMemo(() => medicineKey && medicines ? medicines.find((elem) => elem.uuid === medicineKey) : undefined, [medicineKey, medicines]);

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const medicineItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Название препарата",
      children: medicine?.name,
    },
    {
      key: "2",
      label: "Форма выпуска",
      children: medicine?.form,
    },
    {
      key: "3",
      label: "Количество",
      children: medicine?.count,
    },
    {
      key: "4",
      label: "Дозировка",
      children: medicine?.dosage,
    },
    {
      key: "5",
      label: "Состав",
      children: medicine?.description,
    },
    {
      key: "6",
      label: "Производитель",
      children: medicine?.producer,
    },
  ];

  return (
    <Modal
      title={<p>Информация о рецептурном препарате <br /> №{medicineKey}</p>}
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
