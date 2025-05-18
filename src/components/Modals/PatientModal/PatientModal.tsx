import { Button, Modal, Table, TableColumnsType } from "antd";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { PatientType, useAppContext } from "../../../contexts/AppContext/AppContext";

type PatientModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setPatientId: (id: string) => void;
};

export const PatientModal = ({
  isOpen,
  setIsOpen,
  setPatientId,
}: PatientModalProps) => {
  const { patients } = useAppContext();

  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const columns: TableColumnsType<PatientType> = [
    {
      title: "ФИО",
      dataIndex: "full_name",
      key: "full_name",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "full_name",
      }),
    },
    {
      title: "Пол",
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "gender",
      }),
      render: item => new Date(item).toLocaleDateString(),
    },
    {
      title: "Дата рождения",
      dataIndex: "birth_date",
      key: "birth_date",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "birth_date",
      }),
      render: item => new Date(item).toLocaleDateString(),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, render) => (
        <Button
          type="default"
          onClick={() => {
            setPatientId(render.uuid || "");
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
      <Table dataSource={patients} columns={columns} />
    </Modal>
  );
};
