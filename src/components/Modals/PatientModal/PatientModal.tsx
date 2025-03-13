import { Button, Modal, Table } from "antd";

type PatientModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setPatientId: (id: string) => void;
};

const dataSource = [
  {
    key: "1",
    name: "Богатырева Вероника Олеговна",
    dateOfBirth: "2021-02-05",
    SNILS: "150-360 078 54",
  },
  {
    key: "2",
    name: "Богатырева Вероника Олеговна",
    dateOfBirth: "2021-02-05",
    SNILS: "150-360 078 54",
  },
];

export const PatientModal = ({
  isOpen,
  setIsOpen,
  setPatientId,
}: PatientModalProps) => {
  // при открытии модалки получать с бека данные о пациентах

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const columns = [
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Дата рождения",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
    },
    {
      title: "СНИЛС",
      dataIndex: "SNILS",
      key: "SNILS",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, render) => (
        <Button
          type="default"
          onClick={() => {
            setPatientId(render.key);
            setIsOpen(false);
          }}
        >
          Выбрать
        </Button>
      ),
    },
  ];

  return (
    <Modal
      title={`Выбор пациента`}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer=""
    >
      Блок с поиском
      <Table dataSource={dataSource} columns={columns} />
    </Modal>
  );
};
