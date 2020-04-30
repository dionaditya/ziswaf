import { useReducer, useEffect, useMemo } from "react";
import React from "react";
import { DonorPresenter } from "@/app/infrastructures/Presenter/Donor/Presenter";
import { container } from "tsyringe";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import { ProvincePresenter } from "@/app/infrastructures/Presenter/Province/Presenter";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import { EmployeePresenter } from "@/app/infrastructures/Presenter/Employee/Presenter";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";
import { useDebounce } from "use-lodash-debounce";
import { nonSortAbleDonorColumn } from "@/domain/entities/AllOptions";
import { createContainer } from "react-tracked";
import qs from "qs";
import { useLocation } from "react-router-dom";

export enum ActionType {
  handleModal = "HANDLEMODAL",
  handleSelectedColumn = "HANDLESELECTEDCOLUMN",
  handleSearchDonor = "HANDLESEARCHDONOR",
  handleUnSelectedColumn = "HANDLEUNSELECTEDCOLUMN",
  setLoading = "SETLOADING",
  setError = "SETERROR",
  setData = "SETDATA",
  handleFilters = "HANDLEFILTERS",
  handleCTA = "HANDLECTA",
  setProvince = "SETPROVINCE",
  setSchool = "SETSCHOOL",
  setRegency = "SETREGENCY",
  handleChangesRowPerPage = "HANDLECHANGESROWSPERPAGE",
  handleSort = "HANDLESORT",
  resetFilter = "RESETFILTER",
  setPage = "SETPAGE",
  setRowsPerPage = "SETROWSPERPAGE",
}

interface DisplayColumn {
  name: string;
  label: string;
  options?: {
    filter: boolean;
    sort: boolean;
  };
}

export interface IAction {
  type: string;
  payload?: any;
}

export interface FilterStatus {
  paging: {
    page: number;
    limit: number;
  };
  filter: {
    school_id: any;
    regency: any;
    donor_category: any;
    status: any;
  };
  search: string;
  sort: any;
}

export interface IState {
  statusModal: boolean;
  displayColumns: DisplayColumn[];
  loading: boolean;
  error: boolean;
  data: any;
  province: any;
  regency: any;
  school: any;
  is_company: any;
  status: any;
  filterStatus: FilterStatus;
  handleSearch: Function;
  handleCTA: Function;
  handleChangeFilter: Function;
  handleSearchDonorQuery: Function;
  handleModal: Function;
  handleSelectedColumn: Function;
  handleSort: Function;
  handleChangesRowsPerPage: Function;
  handleResetFilter: Function;
  handleDelete: Function;
  optionsTable: object;
  tableIndex: any;
  userInfo: any;
  loadData: Function;
  debounce: Function;
  setFilterStatus: Function;
  isCompany: string;
  handleCloseModal: Function;
}

const initialState: IState = {
  statusModal: false,
  displayColumns: [
    {
      label: "ID Donatur",
      name: "id",
      options: { filter: true, sort: true },
    },
    {
      label: "Kategori Donatur",
      name: "is_company",
      options: { filter: true, sort: true },
    },
    {
      label: "Nama Lengkap",
      name: "company_name",
      options: { filter: true, sort: true },
    },
    {
      label: "Alamat",
      name: "address",
      options: { filter: true, sort: true },
    },
    {
      label: "Kota",
      name: "regency_id",
      options: { filter: true, sort: true },
    },
    {
      label: "No HP",
      name: "phone",
      options: { filter: false, sort: false },
    },
    {
      label: "NPWP",
      name: "npwp",
      options: { filter: false, sort: false },
    },
    {
      label: "Nama CP",
      name: "name",
      options: { filter: true, sort: true },
    },
    {
      label: "No HP CP",
      name: "contact_number",
      options: { filter: false, sort: false },
    },
  ],
  loading: false,
  data: [],
  error: false,
  province: [],
  regency: [],
  school: [],
  is_company: [],
  status: [],
  filterStatus: {
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: "",
      regency: "",
      donor_category: "",
      status: "",
    },
    search: "",
    sort: {
      id: "DESC",
    },
  },
  userInfo: {},
  handleCTA: () => {},
  handleChangeFilter: () => {},
  handleModal: () => {},
  handleSearch: () => {},
  handleSearchDonorQuery: () => {},
  handleSelectedColumn: () => {},
  handleSort: () => {},
  handleChangesRowsPerPage: () => {},
  handleResetFilter: () => {},
  handleDelete: () => {},
  optionsTable: {},
  tableIndex: 0,
  loadData: () => {},
  debounce: () => {},
  setFilterStatus: () => {},
  isCompany: "",
  handleCloseModal: () => {},
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.handleModal:
      return { ...state, statusModal: !state.statusModal };

    case ActionType.handleSearchDonor:
      return {
        ...state,
        filterStatus: { ...state.filterStatus, search: action.payload },
      };

    case ActionType.handleSelectedColumn:
      if (state.displayColumns.length > 0) {
        const isThere = state.displayColumns.filter(
          (val) => val.name === action.payload.name
        );
        const removeChecked = state.displayColumns.filter((item) => {
          return item.name !== action.payload.name;
        });
        if (isThere.length > 0) {
          return { ...state, displayColumns: [...removeChecked] };
        } else {
          return {
            ...state,
            displayColumns: [...state.displayColumns, action.payload],
          };
        }
      }

      return {
        ...state,
        displayColumns: [...state.displayColumns, action.payload],
      };

    case ActionType.setLoading:
      return { ...state, loading: action.payload };

    case ActionType.setError:
      return { ...state, error: action.payload };

    case ActionType.handleFilters:
      const { name, value } = action.payload;
      return {
        ...state,
        filterStatus: {
          ...state.filterStatus,
          filter: { ...state.filterStatus.filter, [name]: value },
        },
      };

    case ActionType.setData:
      return { ...state, data: action.payload };

    case ActionType.handleCTA:
      return { ...state, data: action.payload };

    case ActionType.setSchool:
      return { ...state, school: action.payload };

    case ActionType.setRegency:
      return { ...state, regency: action.payload };

    case ActionType.handleChangesRowPerPage:
      return {
        ...state,
        filterStatus: {
          ...state.filterStatus,
          paging: {
            ...state.filterStatus.paging,
            limit: action.payload,
          },
        },
      };

    case ActionType.handleSort:
      return {
        ...state,
        filterStatus: {
          ...state.filterStatus,
          sort: {
            [action.payload.name]: action.payload.value,
          },
        },
      };

    case ActionType.resetFilter:
      return {
        ...state,
        filterStatus: { ...state.filterStatus, filter: action.payload },
      };

    default:
      return state;
  }
};

const useValue = ({ reducer, initialState }) =>
  useReducer(reducer, initialState);

const { Provider, useTracked } = createContainer(() =>
  useReducer(reducer, initialState)
);

export const DonorContext = React.createContext<IState>(initialState);
const { Provider: DonorProvider } = DonorContext;

const DonorController = ({ children }) => {
  const [state, dispatch] = useTracked();

  const [tableIndex, setTableIndex] = React.useState(0);
  const [userInfo, setUserInfo] = React.useState<any>({});
  const [isFilter, setFilter] = React.useState(false);
  const [querySchool, setQuerySchool] = React.useState("");
  const debouncedSchool = useDebounce(querySchool, 100);
  const location = useLocation();

  function useQuery() {
    const location = useLocation();
    return qs.parse(location.search);
  }

  let query = useQuery();

  const [filterStatus, setFilterStatus] = React.useState<any>({
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: "",
      regency: "",
      donor_category: "",
      status: "",
    },
    search: "",
    sort: {
      id: "DESC",
    },
  });
  const [pagination, setPagination] = React.useState<any>({
    total: 0,
    page: 0,
    rowsPerPage: 0,
  });
  let donorPresenter: DonorPresenter = container.resolve(DonorPresenter);
  let schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter);
  let regencyPresenter: CityPresenter = container.resolve(CityPresenter);
  let employeePresenter: EmployeePresenter = container.resolve(
    EmployeePresenter
  );
  const [isCompany, setIsCompany] = React.useState("");

  let userAccess = getUserInfo();

  useEffect(() => {
    const getData = async () => {
      setUserInfo(userAccess);
      if (userAccess.role === 1) {
        dispatch({ type: ActionType.setLoading, payload: true });
        const listDonor = await donorPresenter.getAllWithPagination({
          ...filterStatus,
        });
        if (listDonor.data.data !== null) {
          setPagination({
            total: listDonor.data.pagination.total,
            page: listDonor.data.pagination.current_page - 1,
            rowsPerPage: listDonor.data.pagination.page_size,
          });
          setUserInfo(userAccess);
          dispatch({ type: ActionType.setData, payload: listDonor.data.data });
          dispatch({ type: ActionType.setLoading, payload: false });
        } else {
          setPagination({
            total: listDonor.data.pagination.total,
            page: listDonor.data.pagination.current_page,
            rowsPerPage: listDonor.data.pagination.page_size,
          });
          setUserInfo(userAccess);
          dispatch({ type: ActionType.setData, payload: [] });
          dispatch({ type: ActionType.setLoading, payload: false });
        }
      } else {
        dispatch({ type: ActionType.setLoading, payload: true });
        const listDonor = await donorPresenter.getAllWithPagination({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            school_id: query['?all'] !== 'true' ? userAccess.school.id : '',
          },
        });
        setUserInfo(userAccess);
        setFilterStatus((prevState) => ({
          ...prevState,
          filter: {
            ...prevState.filter,
            school_id: query['?all'] !== 'true' ? userAccess.school.id : '',
          },
        }));
        if (listDonor.data.data !== null) {
          setPagination({
            total: listDonor.data.pagination.total,
            page: listDonor.data.pagination.current_page - 1,
            rowsPerPage: listDonor.data.pagination.page_size,
          });

          dispatch({
            type: ActionType.setSchool,
            payload: userAccess.school.id,
          });
          dispatch({ type: ActionType.setData, payload: listDonor.data.data });
          dispatch({ type: ActionType.setLoading, payload: false });
        } else {
          setPagination({
            total: listDonor.data.pagination.total,
            page: listDonor.data.pagination.current_page,
            rowsPerPage: listDonor.data.pagination.page_size,
          });

          dispatch({
            type: ActionType.setSchool,
            payload: userAccess.school.id,
          });
          dispatch({ type: ActionType.setData, payload: [] });
          dispatch({ type: ActionType.setLoading, payload: false });
        }
      }
    };
    getData();
  }, [location.search]);

  const optionsTable = {
    filterType: "dropdown",
    responsive: "scroll",
    sort: true,
    pagination: true,
    selectableRowsHeader: false,
    textLabels: {
      body: {
        noMatch: state.loading ? "loading..." : "Maaf tidak ada data",
      },
    },
    search: false,
    page: pagination.page,
    count: pagination.total,
    filter: false,
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    selectableRowsOnClick: true,
    fixedHeaderOptions: { yAxis: true },
    onCellClick: (colData, celMeta: { colIndex; rowIndex; dataIndex }) => {
      const idData = state.data[celMeta.dataIndex]["id"];
      setTableIndex(idData);
      setIsCompany(state.data[celMeta.dataIndex]["is_company"]);
    },
    setCellHeaderProps: () => ({ align: "center" }),
    setCellProps: () => ({ align: "center" }),
    serverSide: true,
    onTableChange: async (action, tableState) => {
      switch (action) {
        case "sort":
          if (
            tableState.announceText.slice(
              tableState.announceText.length - 9,
              tableState.announceText.length
            ) === "ascending"
          ) {
            const donorSortByColumn = await donorPresenter.getAllWithPagination(
              {
                ...filterStatus,
                sort: {
                  [state.displayColumns[tableState.activeColumn]["name"]]:
                    "ASC",
                },
              }
            );
            setFilterStatus((prevState) => ({
              ...prevState,
              sort: {
                [state.displayColumns[tableState.activeColumn]["name"]]: "ASC",
              },
            }));

            dispatch({
              type: ActionType.setData,
              payload: donorSortByColumn.data.data,
            });
          } else {
            const donorSortByColumn = await donorPresenter.getAllWithPagination(
              {
                ...filterStatus,
                sort: {
                  [state.displayColumns[tableState.activeColumn]["name"]]:
                    "DESC",
                },
              }
            );
            setFilterStatus((prevState) => ({
              ...prevState,
              sort: {
                [state.displayColumns[tableState.activeColumn]["name"]]: "DESC",
              },
            }));

            dispatch({
              type: ActionType.setData,
              payload: donorSortByColumn.data.data,
            });
          }
          break;

        case "changePage":
          dispatch({ type: ActionType.setLoading, payload: true });
          const donorSorted = await donorPresenter.getAllWithPagination({
            ...filterStatus,
            paging: {
              ...filterStatus.paging,
              page: tableState.page + 1,
            },
          });
          setFilterStatus({
            ...filterStatus,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagination((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          if (donorSorted !== null) {
            dispatch({
              type: ActionType.setData,
              payload: donorSorted.data.data,
            });
            dispatch({ type: ActionType.setLoading, payload: false });
          }

          break;
        case "changeRowsPerPage":
          const donorSortedByRows = await donorPresenter.getAllWithPagination({
            ...filterStatus,
            paging: {
              ...filterStatus.paging,
              limit: tableState.rowsPerPage,
            },
          });
          setFilterStatus({
            ...filterStatus,
            paging: {
              ...filterStatus.paging,
              limit: tableState.rowsPerPage,
            },
          });
          setPagination((prevState) => ({
            ...prevState,
            rowsPerPage: tableState.rowsPerPage,
          }));
          if (donorSortedByRows !== null) {
            dispatch({
              type: ActionType.setData,
              payload: donorSortedByRows.data.data,
            });
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

  const handleModal = async (e: any) => {
    dispatch({ type: ActionType.handleModal });
    dispatch({
      type: ActionType.setLoading,
      payload: true,
    });

    let listSchool = await schoolPresenter.loadData();
    let listRegency = await regencyPresenter.loadData();

    if (userInfo.role === 1) {
      dispatch({
        type: ActionType.setSchool,
        payload: listSchool.data.data,
      });
      dispatch({ type: ActionType.setRegency, payload: listRegency });
      dispatch({
        type: ActionType.setLoading,
        payload: false,
      });
    } else {
      let filterOperator = listSchool.data.data.filter(
        (val) => val.id === userInfo.school.id
      );

      if (filterOperator !== null && filterOperator !== undefined) {
        setFilterStatus((prevState) => ({
          ...prevState,
          filter: {
            ...prevState.filter,
            school_id: filterOperator[0].id,
          },
        }));
        dispatch({
          type: ActionType.setSchool,
          payload: listSchool.data.data,
        });
        dispatch({ type: ActionType.setRegency, payload: listRegency });
        dispatch({
          type: ActionType.setLoading,
          payload: false,
        });
      }
    }
  };

  const handleCloseModal = () => {
    dispatch({ type: ActionType.handleModal });
  };

  const handleSearchDonorQuery = (e: any) => {
    e.persist();
    setFilterStatus((prevState) => ({
      ...prevState,
      search: e.target.value,
    }));
  };

  const handleSelectedColumn = (e: { target: { value: any; name: any } }) => {
    if (nonSortAbleDonorColumn.includes(e.target.value)) {
      dispatch({
        type: ActionType.handleSelectedColumn,
        payload: {
          name: e.target.value,
          label: e.target.name,
          option: { filter: false, sort: false },
        },
      });
    } else {
      dispatch({
        type: ActionType.handleSelectedColumn,
        payload: {
          name: e.target.value,
          label: e.target.name,
          option: { filter: true, sort: true },
        },
      });
    }
  };

  const handleChangeFilter = (e: any) => {
    setFilterStatus((prevState) => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleCTA = async (state: { filterStatus: any }) => {
    dispatch({ type: ActionType.setLoading, payload: true });

    const listFilteredDonor = await donorPresenter.getAllWithPagination({
      ...filterStatus,
    });
    if (listFilteredDonor.data.data === null) {
      setFilter(true);
      dispatch({ type: ActionType.setData, payload: [] });
      setPagination({
        total: listFilteredDonor.data.pagination.total,
        page: listFilteredDonor.data.pagination.current_page,
        rowsPerPage: listFilteredDonor.data.pagination.page_size,
      });
      dispatch({ type: ActionType.handleModal });
      dispatch({ type: ActionType.setLoading, payload: false });
    } else {
      setFilter(true);
      dispatch({
        type: ActionType.setData,
        payload: listFilteredDonor.data.data,
      });
      setPagination({
        total: listFilteredDonor.data.pagination.total,
        page: listFilteredDonor.data.pagination.current_page - 1,
        rowsPerPage: listFilteredDonor.data.pagination.page_size,
      });
      dispatch({ type: ActionType.handleModal });
      dispatch({ type: ActionType.setLoading, payload: false });
    }
  };

  const handleSearch = async (controller: { filterStatus: string }) => {
    dispatch({ type: ActionType.setLoading, payload: true });
    const listDonor = await donorPresenter.getAllWithPagination({
      search: filterStatus.search,
      filter: filterStatus.filter,
      sort: {
        id: "DESC",
      },
    });
    if (listDonor.data.data === null) {
      dispatch({ type: ActionType.setData, payload: [] });
      setPagination({
        total: listDonor.data.pagination.total,
        page: listDonor.data.pagination.current_page,
        rowsPerPage: listDonor.data.pagination.page_size,
      });
      return dispatch({ type: ActionType.setLoading, payload: false });
    } else {
      dispatch({ type: ActionType.setData, payload: listDonor.data.data });
      setPagination({
        total: listDonor.data.pagination.total,
        page: listDonor.data.pagination.current_page - 1,
        rowsPerPage: listDonor.data.pagination.page_size,
      });
      return dispatch({ type: ActionType.setLoading, payload: false });
    }
  };

  const handleResetFilter = (e) => {
    const resetFilter = {
      ...initialState.filterStatus.filter,
      school_id: userInfo.school.id,
    };
    if (userInfo.role === 2) {
      setFilterStatus((prevState) => ({
        ...prevState,
        filter: resetFilter,
      }));
    } else {
      setFilterStatus((prevState) => ({
        ...prevState,
        filter: initialState.filterStatus.filter,
      }));
      dispatch({
        type: ActionType.resetFilter,
        payload: initialState.filterStatus.filter,
      });
    }
  };

  const handleDelete = async (e) => {
    try {
      const deletedDonor = await donorPresenter.delete(tableIndex);
      if (deletedDonor) {
        dispatch({
          type: ActionType.setLoading,
          payload: true,
        });
        const listDonor = await donorPresenter.getAllWithPagination({
          ...filterStatus,
        });
        setPagination({
          total: listDonor.data.pagination.total,
          page: listDonor.data.pagination.current_page - 1,
          rowsPerPage: listDonor.data.pagination.page_size,
        });
        dispatch({
          type: ActionType.setData,
          payload: listDonor.data.data,
        });
        dispatch({
          type: ActionType.setLoading,
          payload: false,
        });
        return true;
      }
    } catch {
      return false;
    }
  };

  const loadData = (newValue, callback) => {
    return setTimeout(async () => {
      const school = await schoolPresenter.loadData({
        search: newValue,
      });
      const transformData = school.data.data.map((val) => {
        return {
          value: val.id,
          label: val.name,
        };
      });
      callback(transformData);
    }, 100);
  };
  const debounce = async (inputValue, action) => {
    const inputValues = inputValue.replace(/\W/g, "");
    setQuerySchool(inputValues);
    return inputValues;
  };

  return (
    <DonorProvider
      value={{
        ...state,
        filterStatus: filterStatus,
        handleModal: handleModal,
        handleCTA: handleCTA,
        handleChangeFilter: handleChangeFilter,
        handleSearch: handleSearch,
        handleSelectedColumn: handleSelectedColumn,
        handleSearchDonorQuery: handleSearchDonorQuery,
        handleResetFilter: handleResetFilter,
        optionsTable: optionsTable,
        tableIndex: tableIndex,
        handleDelete: handleDelete,
        userInfo: userAccess,
        debounce,
        loadData,
        setFilterStatus,
        isCompany,
        handleCloseModal,
      }}
    >
      {children}
    </DonorProvider>
  );
};

export const AppProvider = ({ children }) => {
  return (
    <Provider>
      <DonorController>{children}</DonorController>
    </Provider>
  );
};
