import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Badge, Button, Flex, Input, Table } from "antd";
import styles from "./PrescriptionsPage.module.css";
import { useEffect, useState } from "react";
import { PrescriptionModal } from "../../Modals/PrescriptionModal/PrescriptionModal";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { useAppContext } from "../../../contexts/AppContext/AppContext";
import { Link } from "react-router";
import { ConfirmIssueModal } from "../../Modals/ConfirmIssueModal/ConfirmIssueModal";
import { DownloadOutlined } from "@ant-design/icons";

const dataSource = [
  {
    key: "1",
    name: "Амоксициллин",
    patient: "Богатырева Вероника Олеговна",
    typeOfPrescription: "За полную стоимость",
    status: "Действующий",
    createdDate: "2021-02-05 08:28:36",
  },
  {
    key: "2",
    name: "Амоксициллин",
    patient: "Иванов Иван Иванович",
    typeOfPrescription: "Льготный",
    status: "Отпущен",
    createdDate: "2021-02-05 08:28:36",
  },
];

export const PrescriptionsPage = () => {
  const [isOpenPrescriptionModal, setIsOpenPrescriptionModal] = useState(false);
  const [isOpenConfirmIssueModal, setIsOpenConfirmIssueModal] = useState(false);
  const [currentPrescriptionKey, setCurrentPrescriptionKey] = useState("");
  const [inputPrescriptionKey, setInputPrescriptionKey] = useState<number>();
  const [data, setData] = useState(dataSource);

  const { userData } = useAppContext();

  const { searchText, searchedColumn, searchInput, handleSearch, handleReset } =
    useTableSearch();

  const openPrescriptionModal = (prescriptionKey: string) => {
    setCurrentPrescriptionKey(prescriptionKey);
    setIsOpenPrescriptionModal(true);
  };

  const openConfirmIssueModal = (prescriptionKey: string) => {
    setCurrentPrescriptionKey(prescriptionKey);
    setIsOpenConfirmIssueModal(true);
  };

  const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPrescriptionKey(Number(e.target.value));
  };

  const searchPrescription = () => {
    // поиск рецепта по номеру (запрос на бек)
  };

  const columns = [
    {
      title: "Название препарата",
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
      title: "ФИО пациента",
      dataIndex: "patient",
      key: "patient",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "patient",
      }),
    },
    {
      title: "Тип рецепта",
      dataIndex: "typeOfPrescription",
      key: "typeOfPrescription",
      filters: [
        {
          text: "За полную стоимость",
          value: "За полную стоимость",
        },
        {
          text: "Льготный",
          value: "Льготный",
        },
      ],
      onFilter: (value, record) =>
        record.typeOfPrescription.startsWith(value as string),
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render: (_, render) => (
        <Badge
          color={
            render.status === "Действующий"
              ? "#52C41A"
              : render.status === "Просрочен"
              ? "#FF4D4F"
              : "#D9D9D9"
          }
          text={render.status}
        />
      ),
      filters: [
        {
          text: "Отпущен",
          value: "Отпущен",
        },
        {
          text: "Действующий",
          value: "Действующий",
        },
        {
          text: "Просрочен",
          value: "Просрочен",
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value as string),
    },
    {
      title: "Дата создания",
      dataIndex: "createdDate",
      key: "createdDate",
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, render) => {
        const buttons = [
          {
            link: ``,
            onClick: () => {
              openPrescriptionModal(render.key);
            },
            label: `Открыть`,
          },
        ];

        if (userData) {
          if (
            userData.role === "pharmacist" &&
            render.status === "Действующий"
          ) {
            buttons.push({
              link: ``,
              onClick: () => {
                openConfirmIssueModal(render.key);
              },
              label: `Отпустить рецептурный препарат`,
            });
          }
        }

        return buttons.map((button, index) =>
          button.link ? (
            <Link key={index} to={button.link}>
              {button.label}
            </Link>
          ) : (
            <Button key={index} type="link" onClick={button.onClick}>
              {button.label}
            </Button>
          )
        );
      },
    },
  ];

  useEffect(() => {
    if (userData?.role === "pharmacist") {
      setData(data.filter((elem) => elem.status === "Отпущен"));
    }
  }, []);

  return (
    <Layout>
      <PrescriptionModal
        isOpen={isOpenPrescriptionModal}
        setIsOpen={setIsOpenPrescriptionModal}
        prescriptionKey={currentPrescriptionKey}
      />
      <ConfirmIssueModal
        isOpen={isOpenConfirmIssueModal}
        setIsOpen={setIsOpenConfirmIssueModal}
        prescriptionKey={currentPrescriptionKey}
      />
      <Header defaultSelectedKeys={["2"]} />
      <Content className={styles.content}>
        <Flex className={styles.searchWrapper}>
          <span className={styles.searchLabel}>Номер рецепта:</span>
          <Input
            placeholder="Введите номер рецепта"
            className={styles.searchInput}
            value={inputPrescriptionKey}
            onChange={changeSearchInput}
            type="number"
          />
          <Button type="primary" onClick={searchPrescription}>
            Поиск
          </Button>
        </Flex>
        {/* {data && data.length > 0 && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className={styles.downloadButton}
          >
            Скачать
          </Button>
        )} */}
        <Table dataSource={data} columns={columns} />
      </Content>
    </Layout>
  );
};
