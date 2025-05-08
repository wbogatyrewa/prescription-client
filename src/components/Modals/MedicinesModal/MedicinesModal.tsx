import { Button, Modal, Table, TableColumnsType } from "antd";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { useTableSearch } from "../../../hooks/useTableSearch";

type MedicinesModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMedicineId: (id: string) => void;
};

interface DataType {
  key: string;
  name: string;
  dateOfBirth: string;
  SNILS: string;
}

const dataSource = [
  {
    key: "1",
    name: "Богатырева Вероника Олеговна",
    dateOfBirth: "2021-02-05",
    SNILS: "150-360 078 54",
  },
  {
    key: "2",
    name: "Иванов Иван Иванович",
    dateOfBirth: "2024-01-08",
    SNILS: "451-150 123 47",
  },
];

export const MedicinesModal = ({
  isOpen,
  setIsOpen,
  setMedicineId,
}: MedicinesModalProps) => {
  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "ФИО",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "name",
      }),
    },
    {
      title: "Дата рождения",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "dateOfBirth",
      }),
    },
    {
      title: "СНИЛС",
      dataIndex: "SNILS",
      key: "SNILS",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "SNILS",
      }),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, render) => (
        <Button
          type="default"
          onClick={() => {
            setMedicineId(render.key);
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
      <Table dataSource={dataSource} columns={columns} />
    </Modal>
  );
};
