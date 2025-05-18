import Layout, { Content } from "antd/es/layout/layout";
import { Header } from "../../organisms/Header/Header";
import { Badge, Button, Flex, Input, Table, TableColumnsType } from "antd";
import styles from "./PrescriptionsPage.module.css";
import { useCallback, useMemo, useState } from "react";
import { PrescriptionModal } from "../../Modals/PrescriptionModal/PrescriptionModal";
import { useTableSearch } from "../../../hooks/useTableSearch";
import { getColumnSearchProps } from "../../../utils/getColumnSearchProps";
import { PrescriptionType, statusMap, useAppContext } from "../../../contexts/AppContext/AppContext";
import { Link } from "react-router";
import { ConfirmIssueModal } from "../../Modals/ConfirmIssueModal/ConfirmIssueModal";
import { DownloadOutlined } from "@ant-design/icons";
import getPrescription from "../../../api/prescriptions/getPrescription";

export const PrescriptionsPage = () => {
  const [isOpenPrescriptionModal, setIsOpenPrescriptionModal] = useState(false);
  const [isOpenConfirmIssueModal, setIsOpenConfirmIssueModal] = useState(false);
  const [currentPrescriptionKey, setCurrentPrescriptionKey] = useState("");
  const [inputPrescriptionKey, setInputPrescriptionKey] = useState("");
  const [searchPrescription, setSearchPrescription] = useState<PrescriptionType>();

  const { prescriptions } = useAppContext();

  const data = useMemo(() =>
    inputPrescriptionKey
      ? searchPrescription
        ? [searchPrescription]
        : []
      : prescriptions,
    [inputPrescriptionKey, prescriptions, searchPrescription]
  );

  const { userData } = useAppContext();
  const { user_role } = userData || {};

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
    setInputPrescriptionKey(e.target.value);
    setSearchPrescription(undefined);
  };

  const searchPrescriptionHandler = useCallback(() => {
    getPrescription(inputPrescriptionKey)
      .then((response) => {
        if (!response.ok) {
          throw "";
        }
        return response;
      })
      .then((response) => response.json())
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setSearchPrescription(data);
        } else {
          setSearchPrescription(undefined);
        }
      })
      .catch((e) => {
        setSearchPrescription(undefined);
        console.error(e)
      });
  }, [inputPrescriptionKey]);

  const columns: TableColumnsType<PrescriptionType> = [
    {
      title: "№",
      dataIndex: "uuid",
      key: "uuid",
      ...getColumnSearchProps({
        searchText,
        searchedColumn,
        searchInput,
        handleSearch,
        handleReset,
        dataIndex: "uuid",
      }),
    },
    {
      title: "Название препарата",
      dataIndex: ["medicine", "name"],
      key: "medicine",
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
      dataIndex: ["patient", "full_name"],
      key: "patient.full_name",
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
      title: "Тип рецепта",
      dataIndex: "type",
      key: "type",
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
        record.type?.startsWith(value as string) || false,
    },
    {
      title: "Статус",
      dataIndex: "status",
      width: "150px",
      key: "status",
      render: (_, render) => (
        <Badge
          color={
            render.status === "CREATED"
              ? "#52C41A"
              : render.status === "EXPIRED"
                ? "#FF4D4F"
                : "#D9D9D9"
          }
          text={render.status && render.status in statusMap ? statusMap[render.status] : ""}
        />
      ),
      filters: [
        {
          text: "Создан",
          value: "Создан",
        },
        {
          text: "Просрочен",
          value: "Просрочен",
        },
        {
          text: "Выдан",
          value: "Выдан",
        },
      ],
      onFilter: (value, record) => record && record.status ? statusMap[record.status]?.startsWith(value as string) : false,
    },
    {
      title: "Дата создания",
      dataIndex: "created_at",
      key: "created_at",
      render: item => new Date(item).toLocaleDateString(),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_, render) => {
        const buttons = [
          {
            link: ``,
            onClick: () => {
              openPrescriptionModal(render.uuid || "");
            },
            label: `Открыть`,
          },
        ];

        if (userData) {
          if (
            user_role === "pharmacist" &&
            render.status === "CREATED"
          ) {
            buttons.push({
              link: ``,
              onClick: () => {
                openConfirmIssueModal(render.uuid || "");
              },
              label: `Выдать`,
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
      <Header defaultSelectedKeys={user_role === "patient" ? ["1"] : ["2"]} />
      <Content className={styles.content}>
        <Flex className={styles.searchWrapper}>
          <span className={styles.searchLabel}>Номер рецепта:</span>
          <Input
            placeholder="Введите номер рецепта"
            className={styles.searchInput}
            value={inputPrescriptionKey}
            onChange={changeSearchInput}
          />
          <Button type="primary" onClick={searchPrescriptionHandler}>
            Поиск
          </Button>
        </Flex>
        {prescriptions && prescriptions.length > 0 && (user_role === "admin" || user_role === "pharmacist") && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            className={styles.downloadButton}
          >
            Скачать
          </Button>
        )}
        <Table dataSource={data} columns={columns} />
      </Content>
    </Layout>
  );
};
