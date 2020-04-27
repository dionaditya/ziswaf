import React, { useState, useEffect } from "react";
import { container } from "tsyringe";
import { DonationPresenter } from "@/app/infrastructures/Presenter/Donation/Presenter";
import { GoodsStatus } from "@/domain/entities/AllOptions";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import { useDebounce } from "use-lodash-debounce";

interface IState {
  data: any;
  loading: boolean;
  filterParam: any;
  setFilterParam: any;
  fetchData: Function;
  didUpdate: boolean;
  clearData: Function;
  eventSubmit: Function;
  optionsTable: object;
  displayColumns: any;
  tableIndex: any;
  handleSelectedColumn: any;
  userInfo: any;
  regency: any;
  school: any;
  handleFetchSchool: Function;
  handleFetchRegency: Function;
  loadSchool: Function;
  loadRegency: Function;
  divisionId: string;
  fetchSchool: Function;
  fetchRegency: Function;
}

interface FilterParams {
  paging: Paging;
  filter: Filter;
  search: string;
  item_id: string;
}

interface Paging {
  page: number;
  limit: number;
}

interface Filter {
  regency: string;
  status_donatur: string;
  start_total: string;
  end_total: string;
  start_date: string;
  end_date: string;
}

const initialState = {
  data: [],
  loading: false,
  filterParam: {
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      regency: "",
      start_total: "",
      end_total: "",
      start_date: "",
      end_date: "",
      school_id: "",
      division_id: "",
      donor_category: "",
      category_id: "",
      category_type: "",
    },
    search: "",
    sort: {
      created_at: "DESC",
    },
  },
  setFilterParam: () => {},
  fetchData: () => {},
  didUpdate: false,
  clearData: () => {},
  eventSubmit: () => {},
  optionsTable: {},
  displayColumns: [
    { key: "id", label: "ID Transaksi", options: { filter: true, sort: true } },
    {
      key: "donor_id",
      label: "Nama Donatur",
      options: { filter: true, sort: true },
    },
    {
      key: "divison_id",
      label: "Kategori",
      options: { filter: true, sort: true },
    },
    {
      key: "category_id",
      label: "Jenis Donasi",
      options: { filter: true, sort: true },
    },
    {
      key: "item_type",
      label: "Bentuk",
      options: { filter: true, sort: true },
    },
    { key: "Jumlah", label: "Total", options: { filter: true, sort: true } },
    {
      key: "kwitansi",
      label: "No Kwitansi",
      options: { filter: true, sort: true },
    },
  ],
  handleSelectedColumn: () => {},
  tableIndex: 0,
  userInfo: {},
  regency: [],
  school: [],
  handleFetchSchool: () => {},
  handleFetchRegency: () => {},
  loadSchool: () => {},
  loadRegency: () => {},
  divisionId: "",
  fetchRegency: () => {},
  fetchSchool: () => {},
};

export const DonationContext = React.createContext<IState>(initialState);
export const {
  Provider: DonationProvider,
  Consumer: DonationConsumer,
} = DonationContext;

export const DonationController = ({ children }) => {
  const [data, setData] = useState<any>([]);
  const [isFilter, setFilter] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filterParam, setFilterParam] = useState<any>(initialState.filterParam);
  const [didUpdate, setDidUpdate] = useState<boolean>(false);
  const donationPresenter: DonationPresenter = container.resolve(
    DonationPresenter
  );
  const [searchSchool, setSearchSchool] = useState("");
  const [searchRegency, setSearchRegency] = useState("");
  const debouncedQueySchoolValue = useDebounce(searchSchool, 200);
  const debouncedQueyRegencyValue = useDebounce(searchRegency, 200);
  const [tableIndex, setTableIndex] = useState(0);
  const [divisionId, setDivisonId] = useState("");
  const [displayColumns, setDisplayColumns] = useState({
    data: [
      {
        name: "created_at",
        label: "Tgl Transaksi",
        options: { filter: true, sort: true },
      },
      {
        name: "donor_id",
        label: "Nama Donatur",
        options: { filter: true, sort: true },
      },
      {
        name: "regency",
        label: "Kota",
        options: { filter: true, sort: true },
      },
      {
        name: "division_id",
        label: "Kategori Sumber",
        options: { filter: true, sort: true },
      },
      {
        name: "category_id",
        label: "Jenis Donasi",
        options: { filter: true, sort: true },
      },
      {
        name: "item_type",
        label: "Bentuk",
        options: { filter: true, sort: true },
      },
      {
        name: "item_id",
        label: "Tunai / Non Tunai",
        options: { filter: true, sort: true },
      },
      { name: "total", label: "Jumlah", options: { filter: true, sort: true } },
      {
        name: "kwitansi",
        label: "No Kwitansi",
        options: { filter: true, sort: true },
      },
    ],
  });
  const [userInfo, setUserInfo] = React.useState<any>({});
  const [regency, setRegency] = useState<any>([]);
  const [school, setSchool] = useState<any>([]);
  const cityPresenter: CityPresenter = container.resolve(CityPresenter);
  const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter);

  const [pagination, setPagintion] = React.useState<any>({
    total: 0,
    page: 0,
    rowsPerPage: 10,
  });

  let userAccess = getUserInfo();

  const sortable = [
    "donor_id",
    "division_id",
    "category_id",
    "statement_category_id",
    "description",
    "item_id",
    "item_type",
    "school_id",
    "status",
    "total",
    "kwitansi",
  ];

  const optionsTable = {
    responsive: "scroll",
    sort: true,
    pagination: true,
    selectableRowsHeader: false,
    search: false,
    page: pagination.page,
    count: pagination.total,
    rowsPerPage: pagination.rowsPerPage,
    filter: false,
    elevation: 0,
    textLabels: {
      body: {
        noMatch: loading ? "loading..." : "Maaf tidak ada data",
      },
    },
    print: false,
    download: false,
    viewColumns: false,
    fixedHeaderOptions: { yAxis: true },
    serverSide: true,
    onCellClick: (colData, celMeta: { colIndex; rowIndex; dataIndex }) => {
      const idData = data[celMeta.dataIndex]["id"];
      setTableIndex(idData);
      setDivisonId(data[celMeta.dataIndex]["division_id"].toLowerCase());
    },
    setCellHeaderProps: () => ({ align: "center" }),
    selectableRowsOnClick: true,
    setCellProps: () => ({ align: "center" }),
    onTableChange: async function(action, tableState) {
      switch (action) {
        case "sort":
          if (
            tableState.announceText.slice(
              tableState.announceText.length - 9,
              tableState.announceText.length
            ) === "ascending"
          ) {
            const donation = await donationPresenter.getAllWithPagination({
              ...filterParam,
              sort: {
                [displayColumns.data[tableState.activeColumn]["name"]]: "ASC",
              },
            });
            setFilterParam({
              ...filterParam,
              sort: {
                [displayColumns.data[tableState.activeColumn]["name"]]: "ASC",
              },
            });
            setData((prevState) => donation.data.data);
          } else {
            const donation = await donationPresenter.getAllWithPagination({
              ...filterParam,
              sort: {
                [displayColumns.data[tableState.activeColumn]["name"]]: "DESC",
              },
            });
            setFilterParam({
              ...filterParam,
              sort: {
                [displayColumns.data[tableState.activeColumn]["name"]]: "DESC",
              },
            });
            setData((prevState) => donation.data.data);
          }
          break;

        case "changePage":
          setFilter(false);
          setLoading(true);
          const donationSorted = await donationPresenter.getAllWithPagination({
            ...filterParam,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintion((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          setFilterParam((prevState) => ({
            ...prevState,
            paging: {
              ...prevState.paging,
              page: tableState.page + 1,
            },
          }));
          if (donationSorted.data.data !== null) {
            setData((prevState) => donationSorted.data.data);
          }
          setLoading(false);
          break;
        case "changeRowsPerPage":
          setFilter(false);
          setLoading(true);
          const donationResult = await donationPresenter.getAllWithPagination({
            ...filterParam,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintion((prevState) => ({
            ...prevState,
            rowsPerPage: tableState.rowsPerPage,
          }));
          setFilterParam((prevState) => ({
            ...prevState,
            paging: {
              page: tableState.page,
              limit: tableState.rowsPerPage,
            },
          }));
          if (donationResult !== null) {
            setData((prevState) => donationResult.data.data);
            setLoading(false);
          }
          break;
        case "propsUpdate":
          if (isFilter) {
            tableState.page = 0;
            tableState.rowsPerPage = 10;
          }
      }
    },
    disableToolbarSelect: true,
  };

  useEffect(() => {
    async function _getData() {
      setLoading(true);
      if (userAccess.role === 1) {
        let res = await donationPresenter.getAllWithPagination({
          ...filterParam,
        });
        if (res.data.data !== null) {
          setPagintion({
            total: res.data.pagination.total,
            page: res.data.pagination.current_page - 1,
            rowsPerPage: res.data.pagination.page_size,
          });
          setData(res.data.data);
          setDidUpdate(!didUpdate);
          setUserInfo(userAccess);
          setLoading(false);
        } else {
          setData([]);
          setDidUpdate(!didUpdate);
          setUserInfo(userAccess);
          setLoading(false);
        }
      } else {
        let res = await donationPresenter.getAllWithPagination({
          ...filterParam,
          filter: {
            ...filterParam.filter,
            school_id: userAccess.school.id,
          },
        });
        if (res.data.data !== null) {
          setPagintion({
            total: res.data.pagination.total,
            page: res.data.pagination.current_page - 1,
            rowsPerPage: res.data.pagination.page_size,
          });
          setFilterParam((prevState) => ({
            ...prevState,
            filter: {
              ...prevState.filter,
              school_id: userAccess.school.id,
            },
          }));
          setData(res.data.data);
          setDidUpdate(!didUpdate);
          setUserInfo(userAccess);
          setLoading(false);
        } else {
          setFilterParam((prevState) => ({
            ...prevState,
            filter: {
              ...prevState.filter,
              school_id: userAccess.school.id,
            },
          }));
          setData([]);
          setDidUpdate(!didUpdate);
          setUserInfo(userAccess);
          setLoading(false);
        }
      }
    }
    _getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (debouncedQueySchoolValue !== "") {
      (async () => {
        const school: any = await schoolPresenter.loadData({
          search: debouncedQueySchoolValue,
        });
        setSchool(school.data.data);
      })();
    }
  }, [debouncedQueySchoolValue]);

  React.useEffect(() => {
    if (debouncedQueyRegencyValue !== "") {
      (async () => {
        const regency: any = await cityPresenter.loadData({
          search: debouncedQueyRegencyValue,
        });
        setRegency(regency);
      })();
    }
  }, [debouncedQueyRegencyValue]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let res = await donationPresenter.getAllWithPagination({
        ...filterParam,
      });
      if (res.data.data !== null) {
        setPagintion({
          total: res.data.pagination.total,
          page: res.data.pagination.current_page - 1,
          rowsPerPage: res.data.pagination.page_size,
        });
        setFilter(true);
        setData(res.data.data);

        setLoading(false);
      } else {
        setPagintion({
          total: res.data.pagination.total,
          page: res.data.pagination.current_page,
          rowsPerPage: res.data.pagination.page_size,
        });
        setData([]);
        setLoading(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const clearData = async () => {
    try {
      if (userAccess.role === 2) {
        setFilterParam((prevState) => ({
          ...prevState,
          filter: {
            ...initialState.filterParam.filter,
            school_id: userAccess.school.id,
          },
        }));

        setFilter(false);
      } else {
        setFilterParam((prevState) => ({
          ...prevState,
          filter: initialState.filterParam.filter,
        }));
        setFilter(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  const eventSubmit = async (e: any) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      setLoading(true);
      let res = await donationPresenter.getAllWithPagination({
        search: filterParam.search,
        filter: filterParam.filter,
        sort: {
          created_at: "DESC",
        },
      });

      if (res.data.data !== null) {
        setPagintion({
          total: res.data.pagination.total,
          page: res.data.pagination.current_page - 1,
          rowsPerPage: res.data.pagination.page_size,
        });
        setData(res.data.data);
        setLoading(false);
      } else {
        setLoading(true);
        setPagintion({
          total: res.data.pagination.total,
          page: res.data.pagination.current_page,
          rowsPerPage: res.data.pagination.page_size,
        });
        setData([]);
        setLoading(false);
      }
    }
  };

  const fetchSchool = async () => {
    const school = await schoolPresenter.loadData();
    setSchool(school.data.data);
  };

  const fetchRegency = async () => {
    const regency = await cityPresenter.loadData();
    setRegency(regency);
  };

  const handleSelectedColumn = (e) => {
    e.persist();
    if (displayColumns.data.length > 0) {
      const isThere = displayColumns.data.filter(
        (val) => val.name === e.target.value
      );
      const removeChecked = displayColumns.data.filter((item) => {
        return item.name !== e.target.value;
      });

      if (isThere.length > 0) {
        setDisplayColumns({
          data: [...removeChecked],
        });
      } else {
        if (sortable.includes(e.target.value)) {
          setDisplayColumns({
            data: [
              ...displayColumns.data,
              {
                name: e.target.value,
                label: e.target.name,
                options: { sort: true, filter: true },
              },
            ],
          });
        } else {
          setDisplayColumns({
            data: [
              ...displayColumns.data,
              {
                name: e.target.value,
                label: e.target.name,
                options: { sort: false, filter: false },
              },
            ],
          });
        }
      }
    }
  };

  const handleFetchRegency = async (inputValue) => {
    const inputValues = inputValue.replace(/\W/g, "");
    setSearchRegency(inputValues);
  };

  const handleFetchSchool = async (inputValue) => {
    const inputValues = inputValue.replace(/\W/g, "");
    setSearchSchool(inputValues);
  };

  const loadRegency = async () => {
    if (regency !== [] || regency.length > 0) {
      const transformData = regency.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      });
      return transformData;
    }
  };

  const loadSchool = async () => {
    if (school !== [] || school.length > 0) {
      const transformData = school.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      });
      return transformData;
    }
  };

  return (
    <DonationProvider
      value={{
        data,
        loading,
        filterParam,
        setFilterParam,
        fetchData,
        didUpdate,
        clearData,
        eventSubmit,
        optionsTable,
        displayColumns,
        tableIndex,
        handleSelectedColumn,
        userInfo: userAccess,
        regency,
        school,
        handleFetchSchool,
        handleFetchRegency,
        loadRegency,
        loadSchool,
        divisionId,
        fetchSchool,
        fetchRegency,
      }}
    >
      {children}
    </DonationProvider>
  );
};
