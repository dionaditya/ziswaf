import { useReducer, useEffect } from "react";
import React from "react";
import { StudentPresenter } from "../../../../infrastructures/Presenter/Student/Presenter";
import { container } from "tsyringe";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import { ProvincePresenter } from "@/app/infrastructures/Presenter/Province/Presenter";
import { CityPresenter } from "@/app/infrastructures/Presenter/City/Presenter";
import { getUserInfo } from "@/app/infrastructures/misc/Cookies";
import {
  nonSortAbleStudentDataTable,
  StudentInfo,
  EducationInfo,
  ParentInfo,
} from "@/domain/entities/AllOptions";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Avatar from "@material-ui/core/Avatar";
import { createContainer } from "react-tracked";
import { useDebounce } from "use-lodash-debounce";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flexGap: {
      marginRight: "20px",
    },
  })
);

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
  setSchoolId = "SETSCHOOLID",
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
    school_id: number | string;
    province: number | string;
    regency: number | string;
    age_start: string;
    age_end: string;
    education_status: number | string;
    sosial_status: number | string;
    registered_start: string;
    registered_end: string;
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
  tableIndex: any;
  handleDelete: Function;
  userInfo: any;
  setFilterStatus: Function;
  debounce: Function;
  loadData: Function;

}

const initialState: IState = {
  statusModal: false,
  displayColumns: [
    {
      label: "NIS",
      name: "identity_number",
      options: { filter: true, sort: true },
    },
    {
      label: "Nama Siswa",
      name: "name",
      options: { filter: true, sort: true },
    },
    {
      label: "Asal Unit",
      name: "school_id",
      options: { filter: true, sort: true },
    },
    {
      label: "Tempat Lahir",
      name: "place_of_birth",
      options: { filter: true, sort: true },
    },
    { label: "alamat", name: "address", options: { filter: true, sort: true } },
    {
      label: "Status sosial",
      name: "sosial_status",
      options: { filter: true, sort: true },
    },
    {
      label: "Status Pendidikan",
      name: "education_status",
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
      age_start: "",
      age_end: "",
      education_status: "",
      sosial_status: "",
      registered_start: "",
      registered_end: "",
    },
    search: "",
    sort: {
      name: "",
    },
  },
  userInfo: {},
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
  tableIndex: 0,
  handleDelete: () => {},
  setFilterStatus: () => {},
  debounce: () => {},
  loadData: () => {}
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
      return {
        ...state,
        school: action.payload,
      };

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
        filterStatus: { ...state.filterStatus, filter: action.payload },
      };

    case ActionType.setSchoolId:
      return {
        ...state,
        filterStatus: {
          ...state.filterStatus,
          filter: {
            ...state.filterStatus.filter,
            school_id: action.payload,
          },
        },
      };

    case ActionType.setProvince:
      return { ...state, province: action.payload };

    default:
      return state;
  }
};

export const StudentListDashboardContext = React.createContext<IState>(
  initialState
);
const { Provider: StudentListProvider } = StudentListDashboardContext;

const useValue = ({ reducer, initialState }) =>
  useReducer(reducer, initialState);

const { Provider, useTracked } = createContainer(() =>
  useReducer(reducer, initialState)
);

export const StudentListController = ({ children }) => {
  const [state, dispatch] = useTracked();
  const [tableIndex, setTableIndex] = React.useState(0);
  const [userInfo, setUserInfo] = React.useState<any>({});
  const [filterStatus, setFilterStatus] = React.useState<any>({
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: "",
      province: "",
      regency: "",
      age_start: "",
      age_end: "",
      education_status: "",
      sosial_status: "",
      registered_start: "",
      registered_end: "",
    },
    search: "",
    sort: {
      id: "DESC",
    },
  });
  const [pagination, setPagintion] = React.useState<any>({
    total: 0,
    page: 0,
    rowsPerPage: 0,
  });
  const [isFilter, setFilter] = React.useState(false);
  let studentPresenter: StudentPresenter = container.resolve(StudentPresenter);
  let schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter);
  let provincePresenter: ProvincePresenter = container.resolve(
    ProvincePresenter
  );
  let cityPresenter: CityPresenter = container.resolve(CityPresenter);

  let userAccess = getUserInfo();
  const [querySchool, setQuerySchool] = React.useState("");

  const debouncedSchool = useDebounce(querySchool, 40);


  useEffect(() => {
    const getData = async () => {
      setUserInfo(userAccess);
      if (userAccess.role === 1) {
        dispatch({ type: ActionType.setLoading, payload: true });
        const listStudent = await studentPresenter.loadData({
          ...filterStatus,
        });
        if (listStudent.data.data !== null) {
          setPagintion({
            total: listStudent.data.pagination.total,
            page: listStudent.data.pagination.current_page - 1,
            rowsPerPage: listStudent.data.pagination.page_size,
          });
          dispatch({
            type: ActionType.setData,
            payload: listStudent.data.data,
          });
          dispatch({ type: ActionType.setLoading, payload: false });
        } else {
          setPagintion({
            total: listStudent.data.pagination.total,
            page: listStudent.data.pagination.current_page,
            rowsPerPage: listStudent.data.pagination.page_size,
          });
          dispatch({ type: ActionType.setData, payload: [] });
          dispatch({ type: ActionType.setLoading, payload: false });
        }
      } else {
        dispatch({ type: ActionType.setLoading, payload: true });
        const listStudent = await studentPresenter.loadData({
          ...filterStatus,
          filter: {
            ...filterStatus.filter,
            school_id: userAccess.school.id,
          },
        });
        if (listStudent.data.data !== null) {
          setFilterStatus({
            ...filterStatus,
            filter: {
              ...filterStatus.filter,
              school_id: userAccess.school.id,
            },
          });
          setPagintion({
            total: listStudent.data.pagination.total,
            page: listStudent.data.pagination.current_page - 1,
            rowsPerPage: listStudent.data.pagination.page_size,
          });
          dispatch({
            type: ActionType.setSchoolId,
            payload: userAccess.school.id,
          });
          dispatch({
            type: ActionType.setData,
            payload: listStudent.data.data,
          });
          dispatch({ type: ActionType.setLoading, payload: false });
        } else {
          dispatch({
            type: ActionType.setSchoolId,
            payload: userAccess.school.id,
          });
          dispatch({ type: ActionType.setData, payload: [] });
          setPagintion({
            total: listStudent.data.pagination.total,
            page: listStudent.data.pagination.current_page,
            rowsPerPage: listStudent.data.pagination.page_size,
          });
          dispatch({ type: ActionType.setLoading, payload: false });
        }
      }
    };
    getData();
  }, []);

  React.useEffect(() => {
    if(debouncedSchool !== "") {
      (async () => {
        const school: any = await schoolPresenter.loadData({
          search: debouncedSchool,
        });
        dispatch({
          type: ActionType.setSchool,
          payload: school.data.data,
        });
      })();
    } else {
      (async () => {
        const school: any = await schoolPresenter.loadData({
         paging: {
           page: 1,
           limit: 10
         }
        });
        dispatch({
          type: ActionType.setSchool,
          payload: school.data.data,
        });
      })();
    }
   
  }, [debouncedSchool]);

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
    selectableRows: false,
    viewColumns: false,
    selectableRowsOnClick: false,
    fixedHeaderOptions: { yAxis: true },
    onCellClick: (colData, celMeta: { colIndex; rowIndex; dataIndex }) => {
      const idData = state.data[celMeta.dataIndex]["id"];
      setTableIndex(idData);
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
            const studentSortByColumn = await studentPresenter.loadData({
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
              payload: studentSortByColumn.data.data,
            });
          } else {
            const studentSortByColumn = await studentPresenter.loadData({
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
              payload: studentSortByColumn.data.data,
            });
          }
          break;

        case "changePage":
          setFilter(false);
          dispatch({ type: ActionType.setLoading, payload: true });
          const studentSorted = await studentPresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setFilterStatus((prevState) => ({
            ...prevState,
            paging: {
              ...prevState.paging,
              page: tableState.page + 1,
            },
          }));
          setPagintion((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          if (studentSorted !== null) {
            dispatch({
              type: ActionType.setData,
              payload: studentSorted.data.data,
            });
            dispatch({ type: ActionType.setLoading, payload: false });
          }

          break;
        case "changeRowsPerPage":
          setFilter(false);
          dispatch({ type: ActionType.setLoading, payload: true });
          const studentSortedByRows = await studentPresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintion((prevState) => ({
            ...prevState,
            limit: tableState.rowsPerPage,
          }));
          setPagintion((prevState) => ({
            ...prevState,
            rowsPerPage: tableState.rowsPerPage,
          }));
          if (studentSortedByRows.data.data !== null) {
            dispatch({
              type: ActionType.setData,
              payload: studentSortedByRows.data.data,
            });
            dispatch({ type: ActionType.setLoading, payload: false });
          }
        case "propsUpdate":
          if (isFilter) {
            tableState.page = 0;
            tableState.rowsPerPage = 10;
          }
      }
    },
    disableToolbarSelect: true,
    expandableRows: true,
    expandableRowsOnClick: true,
    renderExpandableRow: (rowData, rowMeta) => {
      return (
        <>
          <TableCell colSpan={7}>
            <div
              style={{
                width: "100%",
                height: "100%",
                paddingLeft: "60px",
              }}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={2} mb={4} mr={2}>
                      <Box display="flex" marginBottom="20px">
                        <div
                          style={{
                            width: "82px",
                            height: "82px",
                            border: "1px solid #979797",
                            borderRadius: "50%",
                          }}
                        >
                          {state.data[rowMeta.dataIndex]["image"] === "" ||
                          state.data[rowMeta.dataIndex]["image"] === null ? (
                            <Avatar
                              style={{
                                background: "orange",
                                width: "82px",
                                height: "82px",
                              }}
                            >
                             {state.data[rowMeta.dataIndex]["name"][0]}
                            </Avatar>
                          ) : (
                            <img
                              src={state.data[rowMeta.dataIndex]["image"]}
                              alt="foto siswa"
                              width="80px"
                              height="80px"
                              style={{
                                border: "2px solid transparent",
                                borderRadius: "50%",
                              }}
                            />
                          )}
                        </div>
                      </Box>
                    </GridItem>
                    <GridItem xs={12} sx={12} md={10}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <Typography
                                component="h5"
                                style={{
                                  fontSize: "32px",
                                  color: "#354052",
                                  fontWeight: "bold",
                                }}
                              >
                                {state.data[rowMeta.dataIndex]["name"]}
                              </Typography>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <Typography
                                component="p"
                                style={{
                                  fontSize: "16px",
                                  color: "rgba(50, 60, 71, 0.6)",
                                }}
                              >
                                {state.data[rowMeta.dataIndex]["school_id"]}
                              </Typography>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={12}>
                              <Typography
                                component="p"
                                style={{
                                  fontSize: "16px",
                                  color: "rgba(50, 60, 71, 0.6)",
                                }}
                              >
                                {
                                  state.data[rowMeta.dataIndex][
                                    "identity_number"
                                  ]
                                }
                              </Typography>
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={4}
                              style={{
                                marginTop: "20px",
                              }}
                            >
                              <GridContainer>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  style={{
                                    marginBottom: "20px",
                                  }}
                                >
                                  <Typography
                                    component="p"
                                    style={{
                                      fontSize: "16px",
                                      color: "rgba(50, 60, 71, 0.6)",
                                      fontWeight: "bold",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span> Info Data Siswa</span>
                                    <Box
                                      style={{
                                        height: "5px",
                                        width: "100%",
                                        background: "rgb(109, 180, 0)",
                                      }}
                                    />
                                  </Typography>
                                </GridItem>
                                {StudentInfo.map((val) => {
                                  return (
                                    <>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Typography
                                          component="p"
                                          style={{
                                            fontSize: "14px",
                                            color: "rgba(50, 60, 71, 0.6)",
                                          }}
                                        >
                                          {val[1]}:
                                        </Typography>
                                      </GridItem>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Typography
                                          component="p"
                                          style={{
                                            fontSize: "14px",
                                            color: "#354052",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {
                                            state.data[rowMeta.dataIndex][
                                              val[0]
                                            ]
                                          }
                                        </Typography>
                                      </GridItem>
                                    </>
                                  );
                                })}
                              </GridContainer>
                            </GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={4}
                              style={{
                                marginTop: "20px",
                              }}
                            >
                              <GridContainer>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  style={{
                                    marginBottom: "20px",
                                  }}
                                >
                                  <Typography
                                    component="p"
                                    style={{
                                      fontSize: "16px",
                                      color: "rgba(50, 60, 71, 0.6)",
                                      fontWeight: "bold",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span> Info Data Pendidikan</span>
                                    <Box
                                      style={{
                                        height: "5px",
                                        width: "100%",
                                        background: "rgb(109, 180, 0)",
                                      }}
                                    />
                                  </Typography>
                                </GridItem>
                                {EducationInfo.map((val) => {
                                  return (
                                    <>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Typography
                                          component="p"
                                          style={{
                                            fontSize: "14px",
                                            color: "rgba(50, 60, 71, 0.6)",
                                          }}
                                        >
                                          {val[1]}:
                                        </Typography>
                                      </GridItem>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Typography
                                          component="p"
                                          style={{
                                            fontSize: "14px",
                                            color: "#354052",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {
                                            state.data[rowMeta.dataIndex][
                                              val[0]
                                            ]
                                          }
                                        </Typography>
                                      </GridItem>
                                    </>
                                  );
                                })}
                              </GridContainer>
                            </GridItem>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={4}
                              style={{
                                marginTop: "20px",
                              }}
                            >
                              <GridContainer>
                                <GridItem
                                  xs={12}
                                  sm={12}
                                  md={12}
                                  style={{
                                    marginBottom: "20px",
                                  }}
                                >
                                  <Typography
                                    component="p"
                                    style={{
                                      fontSize: "16px",
                                      color: "rgba(50, 60, 71, 0.6)",
                                      fontWeight: "bold",
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <span> Info Data Orang Tua</span>
                                    <Box
                                      style={{
                                        height: "5px",
                                        width: "100%",
                                        background: "rgb(109, 180, 0)",
                                      }}
                                    />
                                  </Typography>
                                </GridItem>
                                {ParentInfo.map((val) => {
                                  return (
                                    <>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Typography
                                          component="p"
                                          style={{
                                            fontSize: "14px",
                                            color: "rgba(50, 60, 71, 0.6)",
                                          }}
                                        >
                                          {val[1]}:
                                        </Typography>
                                      </GridItem>
                                      <GridItem xs={6} sm={6} md={6}>
                                        <Typography
                                          component="p"
                                          style={{
                                            fontSize: "14px",
                                            color: "#354052",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          {
                                            state.data[rowMeta.dataIndex][
                                              val[0]
                                            ]
                                          }
                                        </Typography>
                                      </GridItem>
                                    </>
                                  );
                                })}
                              </GridContainer>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </div>
          </TableCell>
        </>
      );
    },
  };

  const handleModal = (e: any) => {
    return (dispatch: any) => async (actiontype: any) => {
      dispatch({ type: actiontype });

      if (state.province !== [] && state.regency !== []) {
        dispatch({ type: ActionType.setLoading, payload: true });
     
        let listProvince = await provincePresenter.loadData(
          new Map<string, string>()
        );
        let cityList = await cityPresenter.loadData();
        dispatch({ type: ActionType.setCity, payload: cityList });
        dispatch({
          type: ActionType.setProvince,
          payload: listProvince
        });
        dispatch({ type: ActionType.setLoading, payload: false });
      }
    };
  };

  const handleSearchSiswaQuery = (e: any) => {
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
    if (nonSortAbleStudentDataTable.includes(e.target.value)) {
      dispatch({
        type: actiontype,
        payload: {
          name: e.target.value,
          label: e.target.name,
          option: { filter: false, sort: false },
        },
      });
    } else {
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

  const handleChangeFilter = async (e: any) => {
    if (e.target.name === "province") {
      setFilterStatus((prevState) => ({
        ...prevState,
        filter: {
          ...prevState.filter,
          [e.target.name]: e.target.value,
        },
      }));
    } else {
      setFilterStatus((prevState) => ({
        ...prevState,
        filter: {
          ...prevState.filter,
          [e.target.name]: e.target.value,
        },
      }));
    }
  };

  const handleCTA = async () => {
    let studentPresenter: StudentPresenter = container.resolve(
      StudentPresenter
    );
    dispatch({ type: ActionType.setLoading, payload: true });
    const listFilteredStudent = await studentPresenter.loadData({
      ...filterStatus,
    });
    if (listFilteredStudent.data.data === null) {
      setFilter(true);
      dispatch({ type: ActionType.setData, payload: [] });
      setPagintion({
        total: listFilteredStudent.data.pagination.total,
        page: listFilteredStudent.data.pagination.current_page,
        rowsPerPage: listFilteredStudent.data.pagination.page_size,
      });
      dispatch({ type: ActionType.setLoading, payload: false });
    } else {
      setFilter(true);
      dispatch({
        type: ActionType.setData,
        payload: listFilteredStudent.data.data,
      });
      setPagintion({
        total: listFilteredStudent.data.pagination.total,
        page: listFilteredStudent.data.pagination.current_page - 1,
        rowsPerPage: listFilteredStudent.data.pagination.page_size,
      });
      dispatch({ type: ActionType.setLoading, payload: false });
    }
    return dispatch({ type: ActionType.handleModal });
  };

  const handleSearch = (controller: { filterStatus: string }) => {
    return (dispatch) => async (actiontype: any) => {
      let studentPresenter: StudentPresenter = container.resolve(
        StudentPresenter
      );
      dispatch({ type: ActionType.setLoading, payload: true });
      const listFilteredStudent = await studentPresenter.loadData({
        filter: filterStatus.filter,
        search: filterStatus.search,
        sort: {
          id: "DESC",
        },
      });
      if (listFilteredStudent.data.data === null) {
        dispatch({ type: actiontype, payload: [] });
        setPagintion({
          total: listFilteredStudent.data.pagination.total,
          page: listFilteredStudent.data.pagination.current_page,
          rowsPerPage: listFilteredStudent.data.pagination.page_size,
        });
        dispatch({ type: ActionType.setLoading, payload: false });
      } else {
        dispatch({ type: actiontype, payload: listFilteredStudent.data.data });
        setPagintion({
          total: listFilteredStudent.data.pagination.total,
          page: listFilteredStudent.data.pagination.current_page - 1,
          rowsPerPage: listFilteredStudent.data.pagination.page_size,
        });
        return dispatch({ type: ActionType.setLoading, payload: false });
      }
    };
  };

  const handleResetFilter = async (dispatch) => {
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

  const handleDelete = async (e) => {
    try {
      const deleteStudent = await studentPresenter.deleteStudentData(
        tableIndex
      );
      if (deleteStudent !== null) {
        dispatch({
          type: ActionType.setLoading,
          payload: true,
        });
        const listStudent = await studentPresenter.loadData({
          ...filterStatus,
        });
        if(listStudent.data.data !== null){
          setPagintion({
            pagination: listStudent.data.pagination,
          });
          dispatch({
            type: ActionType.setData,
            payload: listStudent.data.data,
          });
          dispatch({
            type: ActionType.setLoading,
            payload: false,
          });
        }else{
          setPagintion({
            pagination: listStudent.data.pagination,
          });
          dispatch({
            type: ActionType.setData,
            payload: [],
          });
          dispatch({
            type: ActionType.setLoading,
            payload: false,
          });
        }
        return ['success', deleteStudent];
      }
    } catch(e) {
      return ['error', e.response];
    }
  };

  const loadData = (newValue, callback) => {
    const transformData = state.school.map((val) => {
      return {
        value: val.id,
        label: val.name,
      };
    });
    const witHDefaultValue = [{
      value: "",
      label: "SEMUA"
    }, ...transformData]
    return callback(witHDefaultValue);
  };

  const debounce = async (inputValue) => {
    setQuerySchool(inputValue);
  };


  return (
    <StudentListProvider
      value={{
        ...state,
        filterStatus: filterStatus,
        handleModal: handleModal,
        handleCTA: handleCTA,
        handleChangeFilter: handleChangeFilter,
        handleSearch: handleSearch,
        handleSelectedColumn: handleSelectedColumn,
        handleSearchSiswaQuery: handleSearchSiswaQuery,
        dispatch: dispatch,
        handleResetFilter: handleResetFilter,
        optionsTable: optionsTable,
        tableIndex: tableIndex,
        handleDelete: handleDelete,
        userInfo: userAccess,
        setFilterStatus: setFilterStatus,
        debounce,
        loadData
      }}
    >
      {children}
    </StudentListProvider>
  );
};

export const AppProvider = ({ children }) => {
  return (
    <Provider>
      <StudentListController>{children}</StudentListController>
    </Provider>
  );
};
