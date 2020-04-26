import { useReducer, useEffect } from "react";
import React from "react";
import { StudentPresenter } from "../../../../infrastructures/Presenter/Student/Presenter";
import { container } from "tsyringe";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import moment from "moment";
import { ProvincePresenter } from "@/app/infrastructures/Presenter/Province/Presenter";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import { SchoolDataColumnsTable } from "@/domain/entities/AllOptions";
import { createContainer } from 'react-tracked' 

export enum ActionType {
  handleModal = "HANDLEMODAL",
  handleSelectedColumn = "HANDLESELECTEDCOLUMN",
  handleSearchMadrasah = "HANDLESEARCHMADRASAH",
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
  handleProvinceChecked = "HANDLEPROVINCECHECKED",
  handleCityChecked = "HANDLECITYCHECKED",
  setInitialData = "setInitialData",
  setAfterChangePage = "setAfterChangePage",
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
    province: number | string;
    regency: number | string;
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
  handleSearchMadrasahQuery: Function;
  handleModal: Function;
  handleSelectedColumn: Function;
  dispatch: Function;
  handleSort: Function;
  handleChangesRowsPerPage: Function;
  handleResetFilter: Function;
  optionsTable: object;
  handleDelete: Function;
  tableIndex: any;
  provinceChecked: any;
  cityChecked: any;
  intialData: any;
  fetchData: Function;
  provinceData: any;
  regencyData: any
}

const DataTableColumns = SchoolDataColumnsTable.map((val) => {
  if (
    val[0] === "head_master" ||
    val[0] === "total_teacher" ||
    val[0] === "total_student" || 
    val[0] === "phone"
  ) {
    return {
      name: val[0],
      label: val[1],
      options: {
        filter: false,
        sort: false,
      },
    };
  } else {
    return {
      name: val[0],
      label: val[1],
      options: {
        filter: true,
        sort: true,
      },
    };
  }
});

const initialState: IState = {
  statusModal: false,
  displayColumns: DataTableColumns,
  loading: false,
  data: [],
  error: false,
  province: [
    {
      name: "all",
      label: "SEMUA ",
    },
  ],
  regency: [
    {
      name: "all",
      label: "SEMUA KOTA",
    },
  ],
  school: [],
  filterStatus: {
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      province: "",
      regency: "",
    },
    search: "",
    sort: {
      id: "DESC",
    },
  },
  provinceChecked: [
    {
      name: "all",
      label: "SEMUA PROVINSI",
    },
  ],
  cityChecked: [
    {
      name: "all",
      label: "SEMUA KOTA",
    },
  ],
  handleCTA: () => {},
  handleChangeFilter: () => {},
  handleModal: () => {},
  handleSearch: () => {},
  handleSearchMadrasahQuery: () => {},
  handleSelectedColumn: () => {},
  dispatch: () => {},
  handleSort: () => {},
  handleChangesRowsPerPage: () => {},
  handleResetFilter: () => {},
  optionsTable: {},
  handleDelete: () => {},
  tableIndex: 0,
  intialData: [],
  fetchData: () => {},
  regencyData: [],
  provinceData: []
};

const reducer: React.Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.handleModal:
      return { ...state, statusModal: !state.statusModal };

    case ActionType.handleSearchMadrasah:
      return {
        ...state,
        filterStatus: { ...state.filterStatus, search: action.payload },
      };

    case ActionType.handleProvinceChecked:
      if (
        state.provinceChecked[0].name === initialState.provinceChecked[0].name
      ) {
        if (action.payload.name !== "all") {
          const removedAllProvince = state.provinceChecked.filter(
            (val) => val.name !== "all"
          );
          return {
            ...state,
            provinceChecked: [...removedAllProvince, action.payload],
          };
        } else {
          return { ...state, provinceChecked: initialState.provinceChecked };
        }
      } else {
        if (action.payload.name !== "all") {
          if (state.provinceChecked.length > 1) {
            const isThere = state.provinceChecked.filter(
              (val) => val.name === action.payload.name
            );
            const removeChecked = state.provinceChecked.filter((item) => {
              return item.name !== action.payload.name;
            });
            const removedAllProvince = state.provinceChecked.filter(
              (val) => val.name !== "all"
            );
            if (isThere.length > 0) {
              return { ...state, provinceChecked: [...removeChecked] };
            } else {
              return {
                ...state,
                provinceChecked: [...removedAllProvince, action.payload],
              };
            }
          } else {
            const isThere = state.provinceChecked.filter(
              (val) => val.name === action.payload.name
            );
            const currentFilter = [...state.provinceChecked, action.payload];

            const removedAllProvince = state.provinceChecked.filter(
              (val) => val.name !== "all"
            );

            if (isThere.length > 0) {
              return {
                ...state,
                provinceChecked: [...initialState.provinceChecked],
              };
            } else {
              return {
                ...state,
                provinceChecked: [...removedAllProvince, action.payload],
              };
            }
          }
        } else {
          return { ...state, provinceChecked: initialState.provinceChecked };
        }
      }

    case ActionType.handleCityChecked:
      if (state.cityChecked[0].name === initialState.cityChecked[0].name) {
        if (action.payload.name !== "all") {
          const removedAllCity = state.cityChecked.filter(
            (val) => val.name !== "all"
          );
          return { ...state, cityChecked: [...removedAllCity, action.payload] };
        } else {
          return {
            ...state,
            cityChecked: initialState.cityChecked,
            data: [...state.data],
          };
        }
      } else {
        if (action.payload.name !== "all") {
          if (state.cityChecked.length > 1) {
            const isThere = state.cityChecked.filter(
              (val) => val.name === action.payload.name
            );
            const removeChecked = state.cityChecked.filter((item) => {
              return item.name !== action.payload.name;
            });
            const removedAllCity = state.cityChecked.filter(
              (val) => val.name !== "all"
            );
            if (isThere.length > 0) {
              return { ...state, cityChecked: [...removeChecked] };
            } else {
              return {
                ...state,
                cityChecked: [...removedAllCity, action.payload],
              };
            }
          } else {
            const isThere = state.cityChecked.filter(
              (val) => val.name === action.payload.name
            );

            const removedAllCity = state.cityChecked.filter(
              (val) => val.name !== "all"
            );
            if (isThere.length > 0) {
              return {
                ...state,
                cityChecked: [...initialState.cityChecked],
                data: [...state.data],
              };
            } else {
              return {
                ...state,
                cityChecked: [...removedAllCity, action.payload],
              };
            }
          }
        } else {
          return { ...state, cityChecked: initialState.cityChecked };
        }
      }

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
      const transformSchoolData = action.payload.map((eachData) => {
        const data = {};
        Object.keys(eachData).forEach((column) => {
          if (column === "report_school") {
            data["total_student"] = eachData[column]["total_student"];
            data["total_teacher"] = eachData[column]["total_teacher"];
          } else if (column === "head_master") {
            data["head_master"] = eachData[column]["name"];
          } else {
            data[column] = eachData[column];
          }
        });
        return data;
      });
      return { ...state, data: transformSchoolData };

    case ActionType.handleCTA:
      return { ...state, data: action.payload };

    case ActionType.setProvince:
      const transformListProvince = action.payload.map((province) => {
        return {
          name: province.id,
          label: province.name,
        };
      });
      return {
        ...state,
        province: [...state.province, ...transformListProvince],
        provinceData: action.payload
      };

    case ActionType.setCity:
      const transformlistCity = action.payload.map((city) => {
        return {
          name: city.id,
          label: city.name,
        };
      });
      return {
        ...state,
        regency: [...state.regency, ...transformlistCity],
        regencyData: action.payload
      };

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

    case ActionType.setInitialData:
      return {
        ...state,
        intialData: action.payload,
      };

    case ActionType.resetFilter:
      return {
        ...state,
        filterStatus: {
          ...state.filterStatus,
          filter: initialState.filterStatus.filter,
        },
      };

    case ActionType.setAfterChangePage:
      const newData: any = [];
      state.provinceChecked.forEach((val) => {
        const filter = action.payload.filter(
          (item) => item.province_name === val.name
        );
        const transformSchoolData = filter.map((eachData) => {
          const data = {};
          Object.keys(eachData).forEach((column) => {
            if (column === "report_school") {
              data["total_student"] = eachData[column]["total_student"];
              data["total_teacher"] = eachData[column]["total_teacher"];
            } else if (column === "head_master") {
              data["head_master"] = eachData[column]["name"];
            } else {
              data[column] = eachData[column];
            }
          });
          return data;
        });
        transformSchoolData.forEach((item) => {
          newData.push(item);
        });
      });
      state.cityChecked.forEach((val) => {
        const filter = action.payload.filter(
          (item) => item.regency_name === val.name
        );
        const transformSchoolData = filter.map((eachData) => {
          const data = {};
          Object.keys(eachData).forEach((column) => {
            if (column === "report_school") {
              data["total_student"] = eachData[column]["total_student"];
              data["total_teacher"] = eachData[column]["total_teacher"];
            } else if (column === "head_master") {
              data["head_master"] = eachData[column]["name"];
            } else {
              data[column] = eachData[column];
            }
          });
          return data;
        });
        transformSchoolData.forEach((item) => {
          newData.push(item);
        });
      });

      return { ...state, data: [...newData] };
    default:
      return state;
  }
};

export const MadrasahContext = React.createContext<IState>(initialState);
const { Provider: MadrasahProvider } = MadrasahContext;

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);

const {
  Provider,
  useTracked,
} = createContainer(() => useReducer(reducer, initialState));

export const MadrasahController = ({ children }) => {
  const [state, dispatch] = useTracked();
  let schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter);
  let provincePresenter: ProvincePresenter = container.resolve(
    ProvincePresenter
  );
  let cityPresenter: CityPresenter = container.resolve(CityPresenter);
  const [data, setData] = React.useState([]);
  const [tableIndex, setTableIndex] = React.useState(0);
  const [isFilter, setFilter] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<any>({
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      province: "",
      regency: "",
      detail: true
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

  useEffect(() => {
    const getData = async () => {
      dispatch({ type: ActionType.setLoading, payload: true });
      const listSchool: any = await schoolPresenter.loadData(filterStatus);
      const listCity = await cityPresenter.loadData({
        filter: {
          school: "all",
        },
      });
      const listProvince = await provincePresenter.loadData({
        filter: {
          school: "all",
        },
      });
      setPagintion({
        total: listSchool.data.pagination.total,
        page: listSchool.data.pagination.current_page-1,
        rowsPerPage: listSchool.data.pagination.page_size,
      });

      dispatch({ type: ActionType.setData, payload: listSchool.data.data });
      dispatch({ type: ActionType.setProvince, payload: listProvince });
      dispatch({ type: ActionType.setCity, payload: listCity });
      dispatch({ type: ActionType.setLoading, payload: false });
    };
    getData();
  }, []);

  const optionsTable = {
    filterType: "dropdown",
    responsive: "scroll",
    sort: true,
    pagination: true,
    page: pagination.page,
    count: pagination.total,
    rowsPerPage: pagination.rowsPerPage,
    selectableRowsHeader: false,
   
    search: false,
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
    },
    setCellHeaderProps: () => ({ align: "center" }),
    setCellProps: () => ({ align: "center" }),
    disableToolbarSelect: true,
    textLabels: {
      body: {
        noMatch: state.loading ? 'loading...' : "Maaf tidak ada data",
      },
    },
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
            if (
              state.displayColumns[tableState.activeColumn]["name"] ===
              "province_name"
            ) {
           

              const schoolSortByColumn: any = await schoolPresenter.loadData({
                ...filterStatus,
                sort: {
                  province_id: "ASC",
                },
              });
              setFilterStatus({
                ...filterStatus,
                sort: {
                  province_id: "ASC",
                },
              });

              dispatch({
                type: ActionType.setData,
                payload: schoolSortByColumn.data.data,
              });
          
            } else if (
              state.displayColumns[tableState.activeColumn]["name"] ===
              "regency_name"
            ) {
          
              const schoolSortByColumn: any = await schoolPresenter.loadData({
                ...filterStatus,
                sort: {
                  regency_id: "ASC",
                },
              });
              setFilterStatus({
                ...filterStatus,
                sort: {
                  regency_id: "ASC",
                },
              });

              dispatch({
                type: ActionType.setData,
                payload: schoolSortByColumn.data.data,
              });
          
            } else {
         
              const schoolSortByColumn: any = await schoolPresenter.loadData({
                ...filterStatus,
                sort: {
                  [state.displayColumns[tableState.activeColumn]["name"]]:
                    "ASC",
                },
              });
              setFilterStatus({
                ...filterStatus,
                sort: {
                  [state.displayColumns[tableState.activeColumn]["name"]]:
                    "ASC",
                },
              });

              dispatch({
                type: ActionType.setData,
                payload: schoolSortByColumn.data.data,
              });
         
            }
          } else {
            if (
              state.displayColumns[tableState.activeColumn]["name"] ===
              "province_name"
            ) {
         
              const schoolSortByColumn: any = await schoolPresenter.loadData({
                ...filterStatus,
                sort: {
                  province_id: "DESC",
                },
              });
              setFilterStatus({
                ...filterStatus,
                sort: {
                  province_id: "DESC",
                },
              });

              dispatch({
                type: ActionType.setData,
                payload: schoolSortByColumn.data.data,
              });
          
            } else if (
              state.displayColumns[tableState.activeColumn]["name"] ===
              "regency_name"
            ) {
              
              const schoolSortByColumn: any = await schoolPresenter.loadData({
                ...filterStatus,
                sort: {
                  regency_id: "DESC",
                },
              });
              setFilterStatus({
                ...filterStatus,
                sort: {
                  regency_id: "DESC",
                },
              });

              dispatch({
                type: ActionType.setData,
                payload: schoolSortByColumn.data.data,
              });
        
            } else {
              const schoolSortByColumn: any = await schoolPresenter.loadData({
                ...filterStatus,

                sort: {
                  [state.displayColumns[tableState.activeColumn]["name"]]:
                    "DESC",
                },
              });
          
              setFilterStatus({
                ...filterStatus,
                sort: {
                  [state.displayColumns[tableState.activeColumn]["name"]]:
                    "DESC",
                },
              });

              dispatch({
                type: ActionType.setData,
                payload: schoolSortByColumn.data.data,
              });
          
            }
          }
          break;
        case "changePage":
          setFilter(false);
        
          const schoolSorted: any = await schoolPresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page+1,
              limit: tableState.rowsPerPage,
            },
          });
          console.log(schoolSorted)
          setPagintion((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          setFilterStatus({
            ...filterStatus,
            paging: {
              page: tableState.page+1,
              limit: tableState.rowsPerPage,
            },
          });

          if (schoolSorted !== null) {
            dispatch({
              type: ActionType.setData,
              payload: schoolSorted.data.data,
            });
        
          } else {
            dispatch({
              type: ActionType.setData,
              payload: [],
            });
         
          }
          break;
        case "changeRowsPerPage":
          setFilter(false);
    
          const schoolSortedByRows = await schoolPresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page,
              limit: tableState.rowsPerPage,
            },
          });
          setFilterStatus({
            ...filterStatus,
            paging: {
              page: tableState.page+1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintion((prevState) => ({
            ...prevState,
            rowsPerPage: tableState.rowsPerPage,
          }));
          if (schoolSorted !== null) {
            dispatch({
              type: ActionType.setData,
              payload: schoolSortedByRows.data.data,
            });
          
          } else {
            dispatch({
              type: ActionType.setData,
              payload: schoolSorted.data.data,
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
  };

  const handleSearchMadrasahQuery = (e: { target: { value: any } }) => (
    dispatch: (arg0: { type: any; payload: any }) => any
  ) => (actiontype: any) =>
    dispatch({ type: actiontype, payload: e.target.value });

  const handleSelectedColumn = (e) => (dispatch) => async (action) => {
    setFilter(true);
    if (action === "province") {
      if (e.target.value === "all") {
        dispatch({
          type: ActionType.setLoading,
          payload: true,
        });
        dispatch({
          type: ActionType.handleProvinceChecked,
          payload: {
            name: e.target.value,
            label: e.target.name,
          },
        });
        const school = await schoolPresenter.loadData({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            province: "",
          },
          paging: state.filterStatus.paging
        });

        setPagintion({
          total: school.data.pagination.total,
          page: school.data.pagination.current_page-1,
          rowsPerPage: school.data.pagination.page_size,
        });
        dispatch({
          type: ActionType.setData,
          payload: school.data.data,
        });

        setFilterStatus({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            province: "",
          },
          paging: state.filterStatus.paging
        });
        dispatch({
          type: ActionType.setLoading,
          payload: false,
        });
      } else {
        if (state.provinceChecked.length === 1) {
          if (state.provinceChecked[0]["name"] !== "all") {
            dispatch({
              type: ActionType.setLoading,
              payload: true,
            });
            const isThere = state.provinceChecked.filter(
              (val) => val.name === parseInt(e.target.value)
            );
            if (isThere.length > 0) {
              dispatch({
                type: ActionType.handleProvinceChecked,
                payload: {
                  name: parseInt(e.target.value),
                  label: e.target.name,
                },
              });
              const school = await schoolPresenter.loadData({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  province: "",
                },
                paging: state.filterStatus.paging
              });

              dispatch({
                type: ActionType.setData,
                payload: school.data.data,
              });

              setPagintion({
                total: school.data.pagination.total,
                page: school.data.pagination.current_page-1,
                rowsPerPage: school.data.pagination.page_size,
              });

              setFilterStatus({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  province: "",
                },
                paging: state.filterStatus.paging
              });
              dispatch({
                type: ActionType.setLoading,
                payload: false,
              });
            } else {
              dispatch({
                type: ActionType.setLoading,
                payload: true,
              });
              dispatch({
                type: ActionType.handleProvinceChecked,
                payload: {
                  name: parseInt(e.target.value),
                  label: e.target.name,
                },
              });
              const addedProvince = [
                state.provinceChecked[0]["name"],
                e.target.value,
              ];
              const school = await schoolPresenter.loadData({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  province: addedProvince.toString(),
                },
                paging: state.filterStatus.paging
              });
              dispatch({
                type: ActionType.setData,
                payload: school.data.data,
              });
              setPagintion({
                total: school.data.pagination.total,
                page: school.data.pagination.current_page-1,
                rowsPerPage: school.data.pagination.page_size,
              });
              setFilterStatus({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  province: addedProvince.toString(),
                },
                paging: state.filterStatus.paging
              });
              dispatch({
                type: ActionType.setLoading,
                payload: false,
              });
            }
          } else {
            dispatch({
              type: ActionType.setLoading,
              payload: true,
            });
            dispatch({
              type: ActionType.handleProvinceChecked,
              payload: {
                name: parseInt(e.target.value),
                label: e.target.name,
              },
            });

            const addedProvince = [parseInt(e.target.value)];
            const school = await schoolPresenter.loadData({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                province: addedProvince.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setData,
              payload: school.data.data,
            });
            setPagintion({
              total: school.data.pagination.total,
              page: school.data.pagination.current_page-1,
              rowsPerPage: school.data.pagination.page_size,
            });
            setFilterStatus({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                province: addedProvince.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setLoading,
              payload: false,
            });
          }
        } else {
          dispatch({
            type: ActionType.setLoading,
            payload: true,
          });
          const isThere = state.provinceChecked.filter(
            (val) => val.name === parseInt(e.target.value)
          );
          if (isThere.length > 0) {
            dispatch({
              type: ActionType.handleProvinceChecked,
              payload: {
                name: parseInt(e.target.value),
                label: e.target.name,
              },
            });
            const removedProvince = state.provinceChecked.filter(
              (val) => val.name !== parseInt(e.target.value)
            );
            const transformData = removedProvince.map(val => val.name)
            const school = await schoolPresenter.loadData({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                province: transformData.toString(),
              },
              paging: state.filterStatus.paging
            });
            setPagintion({
              total: school.data.pagination.total,
              page: school.data.pagination.current_page-1,
              rowsPerPage: school.data.pagination.page_size,
            });
            dispatch({
              type: ActionType.setData,
              payload: school.data.data,
            });
            dispatch({
              type: ActionType.setLoading,
              payload: false,
            });
            setFilterStatus({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                province: transformData.toString(),
              },
               paging: state.filterStatus.paging
            });
          } else {
            dispatch({
              type: ActionType.setLoading,
              payload: true,
            });
            dispatch({
              type: ActionType.handleProvinceChecked,
              payload: {
                name: parseInt(e.target.value),
                label: e.target.name,
              },
            });
            const transformChecked = state.provinceChecked.map((val) => {
              return val.name;
            });
            const addedProvince = [
              ...transformChecked,
              parseInt(e.target.value),
            ];
            const school = await schoolPresenter.loadData({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                province: addedProvince.toString(),
              },
               paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setData,
              payload: school.data.data,
            });
            setPagintion({
              total: school.data.pagination.total,
              page: school.data.pagination.current_page-1,
              rowsPerPage: school.data.pagination.page_size,
            });
            setFilterStatus({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                province: addedProvince.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setLoading,
              payload: false,
            });
          }
        }
      }
    } else {
      if (e.target.value === "all") {
        dispatch({
          type: ActionType.setLoading,
          payload: true,
        });
        dispatch({
          type: ActionType.handleCityChecked,
          payload: {
            name: e.target.value,
            label: e.target.name,
          },
        });
        const school = await schoolPresenter.loadData({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            regency: "",
          },
          paging: state.filterStatus.paging
        });

        dispatch({
          type: ActionType.setData,
          payload: school.data.data,
        });
        setPagintion({
          total: school.data.pagination.total,
          page: school.data.pagination.current_page-1,
          rowsPerPage: school.data.pagination.page_size,
        });
        setFilterStatus({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            regency: "",
          },
          paging: state.filterStatus.paging
        });
        dispatch({
          type: ActionType.setLoading,
          payload: false,
        });
      } else {
        if (state.cityChecked.length === 1) {
          if (state.cityChecked[0]["name"] !== "all") {
            dispatch({
              type: ActionType.setLoading,
              payload: true,
            });
            const isThere = state.cityChecked.filter(
              (val) => val.name === parseInt(e.target.value)
            );
            if (isThere.length > 0) {
              dispatch({
                type: ActionType.handleCityChecked,
                payload: {
                  name: parseInt(e.target.value),
                  label: e.target.name,
                },
              });
              const school = await schoolPresenter.loadData({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  regency: "",
                },
                paging: state.filterStatus.paging
              });

              dispatch({
                type: ActionType.setData,
                payload: school.data.data,
              });
              setPagintion({
                total: school.data.pagination.total,
                page: school.data.pagination.current_page-1,
                rowsPerPage: school.data.pagination.page_size,
              });

              setFilterStatus({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  regency: "",
                },
                paging: state.filterStatus.paging
              });
              dispatch({
                type: ActionType.setLoading,
                payload: false,
              });
            } else {
              dispatch({
                type: ActionType.setLoading,
                payload: true,
              });
              dispatch({
                type: ActionType.handleCityChecked,
                payload: {
                  name: parseInt(e.target.value),
                  label: e.target.name,
                },
              });
              const addedCity = [state.cityChecked[0]['name'], e.target.value];
              const school = await schoolPresenter.loadData({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  regency: addedCity.toString(),
                },
                 paging: state.filterStatus.paging
              });
              dispatch({
                type: ActionType.setData,
                payload: school.data.data,
              });
              setPagintion({
                total: school.data.pagination.total,
                page: school.data.pagination.current_page-1,
                rowsPerPage: school.data.pagination.page_size,
              });
              setFilterStatus({
                ...filterStatus,
                filter: {
                  ...filterStatus.filter,
                  regency: addedCity.toString(),
                },
                paging: state.filterStatus.paging
              });
              dispatch({
                type: ActionType.setLoading,
                payload: false,
              });
            }
          } else {
            dispatch({
              type: ActionType.setLoading,
              payload: true,
            });

            dispatch({
              type: ActionType.handleCityChecked,
              payload: {
                name: parseInt(e.target.value),
                label: e.target.name,
              },
            });
            const transformChecked = state.cityChecked.map((val) => {
              return val.name;
            });
            const addedCity = [parseInt(e.target.value)];
            const school = await schoolPresenter.loadData({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                regency: addedCity.toString(),
              },
              paging: state.filterStatus.paging
            }); 
            dispatch({
              type: ActionType.setData,
              payload: school.data.data,
            });
            setPagintion({
              total: school.data.pagination.total,
              page: school.data.pagination.current_page-1,
              rowsPerPage: school.data.pagination.page_size,
            });
            setFilterStatus({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                regency: addedCity.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setLoading,
              payload: false,
            });
          }
        } else {
          dispatch({
            type: ActionType.setLoading,
            payload: true,
          });
          const isThere = state.cityChecked.filter(
            (val) => val.name === parseInt(e.target.value)
          );
          if (isThere.length > 0) {
            dispatch({
              type: ActionType.handleCityChecked,
              payload: {
                name: parseInt(e.target.value),
                label: e.target.name,
              },
            });
            const removedCity = state.cityChecked.filter(
              (val) => val.name !== parseInt(e.target.value)
            );
            const transformData = removedCity.map(val => val.name) 
            const school = await schoolPresenter.loadData({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                regency: transformData.toString(),
              },
               paging: state.filterStatus.paging
            });
            setPagintion({
              total: school.data.pagination.total,
              page: school.data.pagination.current_page-1,
              rowsPerPage: school.data.pagination.page_size,
            });
            dispatch({
              type: ActionType.setData,
              payload: school.data.data,
            });

            setFilterStatus({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                regency: transformData.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setLoading,
              payload: false,
            });
          } else {
            dispatch({
              type: ActionType.setLoading,
              payload: true,
            });
            dispatch({
              type: ActionType.handleCityChecked,
              payload: {
                name: parseInt(e.target.value),
                label: e.target.name,
              },
            });
            const transformChecked = state.cityChecked.map((val) => {
              return val.name;
            });
            const addedCity = [...transformChecked, parseInt(e.target.value)];
            const school = await schoolPresenter.loadData({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                regency: addedCity.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setData,
              payload: school.data.data,
            });
            setPagintion({
              total: school.data.pagination.total,
              page: school.data.pagination.current_page-1,
              rowsPerPage: school.data.pagination.page_size,
            });
            setFilterStatus({
              ...filterStatus,
              filter: {
                ...filterStatus.filter,
                regency: addedCity.toString(),
              },
              paging: state.filterStatus.paging
            });
            dispatch({
              type: ActionType.setLoading,
              payload: false,
            });
          }
        }
      }
    }
  };

  const handleCTA = (state: { filterStatus: any }) => {
    return (
      dispatch: (arg0: { type: any; payload?: never[] | any }) => void
    ) => async (actiontype: any) => {
      const listFilteredSchool = await schoolPresenter.loadData(
        state.filterStatus
      );
      if (listFilteredSchool === null) {
        dispatch({ type: actiontype, payload: [] });
      } else {
        dispatch({ type: actiontype, payload: listFilteredSchool });
      }
      return dispatch({ type: ActionType.handleModal });
    };
  };

  const handleSearch = (controller: { filterStatus: string }) => {
    return (dispatch) => async (actiontype: any) => {
      const listFilteredSchool = await schoolPresenter.loadData({
        search: controller.filterStatus.search,
      });
      if (listFilteredSchool.data.data === null) {
        dispatch({ type: actiontype, payload: [] });
        setPagintion({
          total: listFilteredSchool.data.pagination.total,
          page: listFilteredSchool.data.pagination.current_page,
          rowsPerPage: listFilteredSchool.data.pagination.page_size,
        });
      } else {
        setPagintion({
          total: listFilteredSchool.data.pagination.total,
          page: listFilteredSchool.data.pagination.current_page-1,
          rowsPerPage: listFilteredSchool.data.pagination.page_size,
        });
        dispatch({ type: actiontype, payload: listFilteredSchool.data.data });
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

  const handleResetFilter = (actiontype) => {
    dispatch({ type: ActionType.resetFilter });
  };

  const handleDelete = async (e) => {
    try {
      const deleteSchool = await schoolPresenter.deleteSchoolData(tableIndex);
      if (deleteSchool === true) {
        dispatch({
          type: ActionType.setLoading,
          payload: true,
        });
        const school = await schoolPresenter.loadData({
          ...filterStatus
        });
        setPagintion({
          total: school.data.pagination.total,
          page: school.data.pagination.current_page-1,
          rowsPerPage: school.data.pagination.page_size,
        });
        dispatch({
          type: ActionType.setData,
          payload: school.data.data
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

  const fetchData = async () => {
    try {
      let res = await schoolPresenter.loadData(filterStatus);
      setData(res);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <MadrasahProvider
      value={{
        ...state,
        handleCTA: handleCTA,
        handleSearch: handleSearch,
        handleSelectedColumn: handleSelectedColumn,
        handleSearchMadrasahQuery: handleSearchMadrasahQuery,
        dispatch: dispatch,
        handleChangesRowsPerPage: handleChangesRowsPerPage,
        handleSort: handleSort,
        handleResetFilter: handleResetFilter,
        optionsTable: optionsTable,
        tableIndex: tableIndex,
        handleDelete: handleDelete,
        fetchData: fetchData,
      }}
    >
      {children}
    </MadrasahProvider>
  );
};

export const AppProvider = ({children}) => {
    return(
      <Provider>
         <MadrasahController>
             {children}
         </MadrasahController>
      </Provider>
      )
}