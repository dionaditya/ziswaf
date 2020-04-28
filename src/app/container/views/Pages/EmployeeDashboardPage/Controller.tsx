import { useReducer, useEffect } from "react";
import React from "react";
import { container } from "tsyringe";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import { ProvincePresenter } from "@/app/infrastructures/Presenter/Province/Presenter";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import { EmployeePresenter } from "@/app/infrastructures/Presenter/Employee/Presenter";
import { EmployeeStatus, nonSoratAbleEmployeeDataTable } from "@/domain/entities/AllOptions";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";
import { useDebounce } from "use-lodash-debounce";
import { createContainer } from 'react-tracked'    

export enum ActionType {
  handleModal = "HANDLEMODAL",
  handleSelectedColumn = "HANDLESELECTEDCOLUMN",
  handleSearchSiswa = "HANDLESEARCHSISWA",
  handleUnSelectedColumn = "HANDLEUNSELECTEDCOLUMN",
  setLoading = "SETLOADING",
  setError = "SETERROR",
  setData = "SETDATA",
  handleFilters = "HANDLEFILTERS",
  handleCTA = "HANDLECTA",
  setProvince = "SETPROVINCE",
  setSchool = "SETSCHOOL",
  setCity = "SETCITY",
  handleChangesRowPerPage = "HANDLECHANGESROWSPERPAGE",
  handleSort = "HANDLESORT",
  resetFilter = "RESETFILTER",
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
    province: any;
    regency: any;
    register_start: any;
    register_end: any;
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
  filterStatus: FilterStatus;
  handleSearch: Function;
  handleCTA: Function;
  handleChangeFilter: Function;
  handleSearchSiswaQuery: Function;
  handleModal: Function;
  handleSelectedColumn: Function;
  dispatch: Function;
  handleSort: Function;
  handleChangesRowsPerPage: Function;
  handleResetFilter: Function;
  optionsTable: object;
  handleDelete: Function;
  tableIndex: any;
  userInfo: any;
  loadData: Function;
  debounce: Function;
  setFilterStatus: Function;
}

const initialState: IState = {
  statusModal: false,
  displayColumns: [
    {
      label: "No ID Pegawai",
      name: "id",
      options: { filter: true, sort: true },
    },
    {
      label: "Nama Lengkap",
      name: "name",
      options: { filter: true, sort: true },
    },
    { label: "Alamat", name: "address", options: { filter: true, sort: true } },
    {
      label: "Provinsi",
      name: "province_id",
      options: { filter: true, sort: true },
    },
    {
      label: "Kota",
      name: "regency_id",
      options: { filter: true, sort: true },
    },
    { label: "No Hp.", name: "phone", options: { filter: false, sort: false } },
    { label: "Status", name: "status", options: { filter: true, sort: true } },
    {
      label: "Tahun Masuk",
      name: "registered_year",
      options: { filter: true, sort: true },
    },
  ],
  loading: false,
  data: [],
  error: false,
  province: [],
  regency: [],
  school: [],
  filterStatus: {
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: "",
      province: "",
      regency: "",
      register_start: null,
      register_end: null,
      status: "",
    },
    search: "",
    sort: {
      name: "",
    },
  },
  handleCTA: () => {},
  handleChangeFilter: () => {},
  handleModal: () => {},
  handleSearch: () => {},
  handleSearchSiswaQuery: () => {},
  handleSelectedColumn: () => {},
  dispatch: () => {},
  handleSort: () => {},
  handleChangesRowsPerPage: () => {},
  handleResetFilter: () => {},
  optionsTable: {},
  handleDelete: () => {},
  tableIndex: 0,
  userInfo: {},
  loadData: () => {},
  debounce: () => {},
  setFilterStatus: () => {},
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.handleModal:
      return { ...state, statusModal: !state.statusModal };

    case ActionType.handleSearchSiswa:
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

    case ActionType.setProvince:
      return { ...state, province: action.payload };

    case ActionType.setCity:
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
        filterStatus: {
          ...state.filterStatus,
          filter: initialState.filterStatus.filter,
        },
      };

    default:
      return state;
  }
};

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);

const {
  Provider,
  useTracked,
} = createContainer(() => useReducer(reducer, initialState));

export const StudentListDashboardContext = React.createContext<IState>(
  initialState
);
const { Provider: StudentListProvider } = StudentListDashboardContext;

export const StudentListController = ({ children }) => {
   const [state, dispatch] = useTracked();

  let schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter);
  let provincePresenter: ProvincePresenter = container.resolve(
    ProvincePresenter
  );
  let cityPresenter: CityPresenter = container.resolve(CityPresenter);
  let employeePresenter: EmployeePresenter = container.resolve(
    EmployeePresenter
  );
  const [tableIndex, setTableIndex] = React.useState(0);
  const [userInfo, setUserInfo] = React.useState<any>({});
  const [isFilter, setFilter] = React.useState(false);
  const [querySchool, setQuerySchool] = React.useState("");

  const debouncedSchool = useDebounce(querySchool, 100);
  const [school, setSchool] = React.useState<any>([])

  const [filterStatus, setFilterStatus] = React.useState<any>({
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: "",
      province: "",
      regency: "",
      register_start: null,
      register_end: null,
      status: "",
    },
    search: "",
    sort: {
      id: "DESC",
    },
  });
  const [pagination, setPagintion] = React.useState<any>({
    total: 0,
    page: 0,
    rowsPerPage: 10,
  });

  let userAccess = getUserInfo();

  useEffect(() => {
    const getData = async () => {
      if (userAccess.role === 1) {
        dispatch({ type: ActionType.setLoading, payload: true });
        const listEmployee = await employeePresenter.loadData({
          ...filterStatus,
        });
      
        dispatch({ type: ActionType.setData, payload: listEmployee.data.data !== null ? listEmployee.data.data : [] });
        setPagintion({
          total: listEmployee.data.pagination.total,
          page: listEmployee.data.pagination.current_page-1,
          rowsPerPage: listEmployee.data.pagination.page_size,
        });

        setUserInfo(userAccess);
        dispatch({ type: ActionType.setLoading, payload: false });
      } else {
        dispatch({ type: ActionType.setLoading, payload: true });
        const listEmployee = await employeePresenter.loadData({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            school_id: userAccess.school.id,
          },
        });
        setUserInfo(userAccess);
        setFilterStatus({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            school_id: userAccess.school.id,
          },
        });
        setPagintion({
          total: listEmployee.data.pagination.total,
          page: listEmployee.data.pagination.current_page-1,
          rowsPerPage: listEmployee.data.pagination.page_size,
        });
        dispatch({ type: ActionType.setData, payload: listEmployee.data.data !== null ? listEmployee.data.data : [] });
        dispatch({ type: ActionType.setLoading, payload: false });
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    if (debouncedSchool !== "" && debouncedSchool.length > 0) {
      (async () => {
        const school = await schoolPresenter.loadData({
          search: debouncedSchool,
        });
        if (school.data.data !== null) {
          setSchool(school.data.data)
        } else {
          dispatch({ type: ActionType.setSchool, payload: [] });
        }
      })();
    }
  }, [debouncedSchool]);

  const optionsTable = {
    filterType: "dropdown",
    responsive: "scroll",
    sort: true,
    page: pagination.page,
    count: pagination.total,
    rowsPerPage: pagination.rowsPerPage,
    pagination: true,
    selectableRowsHeader: false,
    search: false,
    filter: false,
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    textLabels: {
      body: {
        noMatch: state.loading ? 'loading...' : "Maaf tidak ada data",
      },
    },
    selectableRowsOnClick: true,
    fixedHeaderOptions: { yAxis: true },
    onCellClick: (colData, celMeta: { colIndex; rowIndex; dataIndex }) => {
      const idData = state.data[celMeta.dataIndex]["id"];
      setTableIndex((prevState) => idData);
    },
    setCellHeaderProps: () => ({ align: "center" }),
    setCellProps: () => ({ align: "center" }),
    serverSide: true,
    onTableChange: async (action, tableState) => {
      switch (action) {
        case "sort":
          setFilter(false);
          if (
            tableState.announceText.slice(
              tableState.announceText.length - 9,
              tableState.announceText.length
            ) === "ascending"
          ) {
            const employeeSortByColumn = await employeePresenter.loadData({
              ...filterStatus,
              sort: {
                [state.displayColumns[tableState.activeColumn]["name"]]: "ASC",
              },
            });
            setFilterStatus({
              ...filterStatus,
              sort: {
                [state.displayColumns[tableState.activeColumn]["name"]]: "ASC",
              },
            });

            dispatch({
              type: ActionType.setData,
              payload: employeeSortByColumn.data.data,
            });
          } else {
            const employeeSortByColumn = await employeePresenter.loadData({
              ...filterStatus,
              sort: {
                [state.displayColumns[tableState.activeColumn]["name"]]: "DESC",
              },
            });
            setFilterStatus({
              ...filterStatus,
              sort: {
                [state.displayColumns[tableState.activeColumn]["name"]]: "DESC",
              },
            });

            dispatch({
              type: ActionType.setData,
              payload: employeeSortByColumn.data.data,
            });
          }
          break;

        case "changePage":
          setFilter(false);
          dispatch({ type: ActionType.setLoading, payload: true });
          const employeeSorted = await employeePresenter.loadData({
            ...filterStatus,
            paging: {
              ...filterStatus.paging,
              page: tableState.page + 1,
            },
          });

          setPagintion((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          setFilterStatus({
            ...filterStatus,
            paging: {
              ...filterStatus.paging,
              page: tableState.page+1,
            },
          });
          if (employeeSorted !== null) {
            dispatch({
              type: ActionType.setData,
              payload: employeeSorted.data.data,
            });
          }
          dispatch({ type: ActionType.setLoading, payload: false });
          break;
        case "changeRowsPerPage":
          setFilter(false);
          dispatch({ type: ActionType.setLoading, payload: true });
          const employeeSortedByRows = await employeePresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintion((prevState) => ({
            ...prevState,
            rowsPerPage: tableState.rowsPerPage,
          }));
          setFilterStatus({
            ...filterStatus,
            paging: {
              ...filterStatus.paging,
              limit: tableState.rowsPerPage,
            },
          });
          if (employeeSorted !== null) {
            dispatch({
              type: ActionType.setData,
              payload: employeeSortedByRows.data.data,
            });
          }
          dispatch({ type: ActionType.setLoading, payload: false });
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

  const handleModal = (e: any) => {
    return (dispatch: any) => async (actiontype: any) => {
      dispatch({type: ActionType.handleModal})
      if (state.statusModal === false) {
        const province = await provincePresenter.loadData();
        const city = await cityPresenter.loadData();
        const school = await schoolPresenter.loadData();
        dispatch({ type: ActionType.setProvince, payload: province });
        dispatch({ type: ActionType.setCity, payload: city });
        dispatch({ type: ActionType.setSchool, payload: school.data.data });
      }
    };
  };

  const handleSearchSiswaQuery = (e: any) => (dispatch) => (actiontype) => {
    e.persist();
    setFilterStatus({
      ...filterStatus,
      search: e.target.value,
    });
  };

  const handleSelectedColumn = (e: { target: { value: any; name: any } }) => (
    dispatch: (arg0: {
      type: any;
      payload: { name: any; label: any; option: any };
    }) => any
  ) => (actiontype: any) => {
    if(e.target.value === 'phone' || e.target.value === "email" || e.target.value === "pos_code") {
      dispatch({
        type: actiontype,
        payload: {
          name: e.target.value,
          label: e.target.name,
          option: { filter: false, sort: false },
        },
      });
    } else  {
      dispatch({
        type: actiontype,
        payload: {
          name: e.target.value,
          label: e.target.name,
          option: { filter: true, sort: true },
        },
      });
    }
   
  };

  const handleChangeFilter = (e: any) => {
    return async (dispatch: any) => {
      setFilterStatus({
        ...filterStatus,
        filter: {
          ...filterStatus.filter,
          [e.target.name]: e.target.value,
        },
      });
    };
  };

  const handleCTA = (state: { filterStatus: any }) => {
    return (dispatch: any) => async (actiontype: any) => {
      dispatch({ type: ActionType.setLoading, payload: true });

      const listFilteredEmployee = await employeePresenter.loadData(
        {
          ...filterStatus,
        }
      );
      if (listFilteredEmployee.data.data === null) {
        setFilter(true);
        dispatch({ type: ActionType.handleModal });
        dispatch({ type: actiontype, payload: [] });
        setPagintion({
          total: listFilteredEmployee.data.pagination.total,
          page: listFilteredEmployee.data.pagination.current_page - 1,
          rowsPerPage: listFilteredEmployee.data.pagination.page_size,
        });
        dispatch({ type: ActionType.setLoading, payload: false });
      } else {
        setFilter(!isFilter);
        dispatch({ type: actiontype, payload: listFilteredEmployee.data.data });
        dispatch({ type: ActionType.handleModal });
        setPagintion({
          total: listFilteredEmployee.data.pagination.total,
          page: listFilteredEmployee.data.pagination.current_page - 1,
          rowsPerPage: listFilteredEmployee.data.pagination.page_size,
        });
        dispatch({ type: ActionType.setLoading, payload: false });
      }
    };
  };

  const handleSearch = (controller: { filterStatus: string }) => {
    return (dispatch) => async (actiontype: any) => {
      dispatch({ type: ActionType.setLoading, payload: true });
      const listSearchEmployee = await employeePresenter.loadData({
        search: filterStatus.search,
        filter: filterStatus.filter,
        sort: {
          id: 'DESC'
        }
      });
      if (listSearchEmployee.data.data === null) {
        dispatch({ type: actiontype, payload: [] });
        setPagintion({
          total: listSearchEmployee.data.pagination.total,
          page: listSearchEmployee.data.pagination.current_page - 1,
          rowsPerPage: listSearchEmployee.data.pagination.page_size,
        });
        return dispatch({ type: ActionType.setLoading, payload: false });
      } else {
        dispatch({ type: actiontype, payload: listSearchEmployee.data.data });
        setPagintion({
          total: listSearchEmployee.data.pagination.total,
          page: listSearchEmployee.data.pagination.current_page - 1,
          rowsPerPage: listSearchEmployee.data.pagination.page_size,
        });
        return dispatch({ type: ActionType.setLoading, payload: false });
      }
    };
  };

  const handleChangesRowsPerPage = (count) => {
    dispatch({ type: ActionType.handleSort, payload: count });
  };

  const handleSort = (e, direction) => {
    if (direction === "descending") {
      dispatch({
        type: ActionType.handleSort,
        payload: {
          name: e,
          value: "DESC",
        },
      });
    } else {
      dispatch({
        type: ActionType.handleSort,
        payload: {
          name: e,
          value: "ASC",
        },
      });
    }
  };

  const handleDelete = async (e) => {
    try {
      const deletedEmployee = await employeePresenter.deleteEmployeeData(
        tableIndex
      );
      if (deletedEmployee.data.success === true) {
        dispatch({
          type: ActionType.setLoading,
          payload: true,
        });
        const listEmployee = await employeePresenter.loadData({
          ...filterStatus,
        });
        setPagintion({
          total: listEmployee.data.pagination.total,
          page: listEmployee.data.pagination.current_page - 1,
          rowsPerPage: listEmployee.data.pagination.page_size,
        });
        dispatch({
          type: ActionType.setData,
          payload: listEmployee.data.data,
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

  const handleResetFilter = (e) => (dispatch) => async (actiontype) => {
    if (userInfo.role === 2) {
      const resetFilter = {
        ...initialState.filterStatus.filter,
        school_id: userInfo.school.id,
      };
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



 
  return (
    <StudentListProvider
      value={{
        ...state,
        handleModal: handleModal,
        handleCTA: handleCTA,
        handleChangeFilter: handleChangeFilter,
        handleSearch: handleSearch,
        handleSelectedColumn: handleSelectedColumn,
        handleSearchSiswaQuery: handleSearchSiswaQuery,
        dispatch: dispatch,
        handleChangesRowsPerPage: handleChangesRowsPerPage,
        handleSort: handleSort,
        handleResetFilter: handleResetFilter,
        optionsTable: optionsTable,
        handleDelete: handleDelete,
        filterStatus: filterStatus,
        userInfo: userAccess,
        tableIndex: tableIndex,
        setFilterStatus,
      }}
    >
      {children}
    </StudentListProvider>
  );
};


export const AppProvider = ({children}) => {
    return(
      <Provider>
         <StudentListController>
             {children}
         </StudentListController>
      </Provider>
      )
}