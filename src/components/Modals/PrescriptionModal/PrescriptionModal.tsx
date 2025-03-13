import { Badge, Descriptions, DescriptionsProps, Modal } from "antd";
import styles from "./PrescriptionModal.module.css";

type PrescriptionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  prescriptionKey: string;
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

const prescriptionItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Дата создания",
    children: "2021-02-05 08:28:36",
  },
  {
    key: "2",
    label: "Дата истечения срока действия",
    children: "2021-03-05 08:28:36",
  },
  {
    key: "3",
    label: "Тип рецепта",
    children: "За полную стоимость",
  },
  {
    key: "4",
    label: "Статус",
    children: <Badge color="#52C41A" text="Действующий" />,
  },
];

const patientItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "ФИО",
    children: "Богатырева Вероника Олеговна",
  },
  {
    key: "2",
    label: "Дата рождения",
    children: "2021-03-05",
  },
  {
    key: "3",
    label: "СНИЛС",
    children: "150-360 789 03",
  },
];

const hospitalItems: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "Название",
    children: "ГБУЗ «ГП №19 ДЗМ»",
  },
  {
    key: "2",
    label: "Врач",
    children: "Терапевт Сидоров Иван Иванович",
  },
];

export const PrescriptionModal = ({
  isOpen,
  setIsOpen,
  prescriptionKey,
}: PrescriptionModalProps) => {
  // при открытии модалки получать с бека все данные о рецепте

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      title={`Информация о рецепте №${prescriptionKey}`}
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
