/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { useMemo } from "react";

type MedicinesModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setMedicineId: (id: string) => void;
};

export const MedicinesModal = ({
  isOpen,
  setIsOpen,
  setMedicineId,
}: MedicinesModalProps) => {
  const { medicines } = useAppContext();
  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        title: "Название",
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
        title: "Форма выпуска",
        dataIndex: "form",
        key: "form",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "form",
        }),
      },
      {
        title: "Количество",
        dataIndex: "count",
        key: "count",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "count",
        }),
      },
      {
        title: "Дозировка",
        dataIndex: "dosage",
        key: "dosage",
        ...getColumnSearchProps({
          searchText,
          searchedColumn,
          searchInput,
          handleSearch,
          handleReset,
          dataIndex: "dosage",
        }),
      },
      {
        title: "Действия",
        key: "actions",
        render: (_: any, render: any) => {
          return <Button onClick={() => {
            setMedicineId(render.uuid);
            setIsOpen(false);
          }}>
            Выбрать
          </Button>
        },
      },
    ],
    [handleReset, handleSearch, searchInput, searchText, searchedColumn, setIsOpen, setMedicineId]
  );

  return (
    <Modal
      title={`Выбор рецептурного препарата`}
      open={isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer=""
      width="700px"
    >
      <Table dataSource={medicines} columns={columns} scroll={{ x: "max-content" }} />
    </Modal>
  );
};
