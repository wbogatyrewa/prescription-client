import { Badge, Descriptions, DescriptionsProps, Modal } from "antd";
import styles from "./PrescriptionModal.module.css";
import { statusMap, useAppContext } from "../../../contexts/AppContext/AppContext";
import { useMemo } from "react";

type PrescriptionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  prescriptionKey: string;
};

export const PrescriptionModal = ({
  isOpen,
  setIsOpen,
  prescriptionKey,
}: PrescriptionModalProps) => {
  const { prescriptions } = useAppContext();

  const prescription = useMemo(() => prescriptionKey && prescriptions ? prescriptions.find((elem) => elem.uuid === prescriptionKey) : undefined, [prescriptionKey, prescriptions]);

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
      children: prescription?.medicine?.name,
    },
    {
      key: "2",
      label: "Форма выпуска",
      children: prescription?.medicine?.form,
    },
    {
      key: "3",
      label: "Количество",
      children: prescription?.medicine?.count,
    },
    {
      key: "4",
      label: "Дозировка",
      children: prescription?.medicine?.dosage,
    },
    {
      key: "5",
      label: "Производитель",
      children: prescription?.medicine?.producer,
    },
  ];

  const prescriptionItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Дата создания",
      children: new Date(prescription?.created_at || "").toLocaleDateString(),
    },
    {
      key: "2",
      label: "Дата истечения срока действия",
      children: new Date(prescription?.expiration_time || "").toLocaleDateString(),
    },
    {
      key: "3",
      label: "Тип рецепта",
      children: prescription?.type,
    },
    {
      key: "4",
      label: "Статус",
      children: <Badge color="#52C41A" text={prescription && prescription.status && prescription.status in statusMap ? statusMap[prescription.status] : ""} />,
    },
    {
      key: "5",
      label: "Способ применения",
      children: prescription?.description,
    },
  ];

  const patientItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "ФИО",
      children: prescription?.patient?.full_name,
    },
    {
      key: "2",
      label: "Дата рождения",
      children: new Date(prescription?.patient?.birth_date || "").toLocaleDateString(),
    },
    {
      key: "3",
      label: "Серия и номер паспорта",
      children: prescription?.patient?.passport_number,
    },
    {
      key: "4",
      label: "Дата выдачи паспорта",
      children: new Date(prescription?.patient?.passport_date || "").toLocaleDateString(),
    },
    {
      key: "5",
      label: "Кем выдан паспорт",
      children: prescription?.patient?.passport_issuer,
    },
  ];

  const hospitalItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Название",
      children: prescription?.doctor?.organization,
    },
    {
      key: "2",
      label: "Врач",
      children: prescription?.doctor?.full_name,
    },
    {
      key: "4",
      label: "Специализация",
      children: prescription?.doctor?.position,
    },
  ];

  return (
    <Modal
      title={<p>Информация о рецепте <br /> №{prescriptionKey}</p>}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer=""
    >
      <div className={styles.infoWrapper}>
        <Descriptions
          title="Лекарственный препарат"
          items={medicineItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Рецепт"
          items={prescriptionItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Пациент"
          items={patientItems}
          bordered
          column={1}
          size="small"
        />
        <Descriptions
          title="Медицинская организация"
          items={hospitalItems}
          bordered
          column={1}
          size="small"
        />
      </div>
    </Modal>
  );
};
