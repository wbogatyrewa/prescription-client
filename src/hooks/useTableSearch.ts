import { InputRef } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";
import { useState, useRef } from "react";

export const useTableSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  return {
    searchText,
    searchedColumn,
    searchInput,
    handleSearch,
    handleReset,
  };
};
