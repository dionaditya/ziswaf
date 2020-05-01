import React from "react";
import { useParams } from "react-router-dom";
import { EmployeePresenter } from "@/app/infrastructures/Presenter/Employee/Presenter";
import { container } from "tsyringe";
import { SchoolPresenter } from "@/app/infrastructures/Presenter/School/Presenter";
import _ from "lodash";
import { School } from "@/domain/entities/School";
import qs from "qs";
import { useLocation } from "react-router-dom";
import { StudentPresenter } from "@/app/infrastructures/Presenter/Student/Presenter";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TableCell from "@material-ui/core/TableCell";
import GridContainer from "@/app/container/commons/Grid/GridContainer";
import GridItem from "@/app/container/commons/Grid/GridItem";
import Avatar from "@material-ui/core/Avatar";
import { createContainer } from "react-tracked";
import {
  nonSortAbleStudentDataTable,
  StudentListTableColumn,
  StudentInfo,
  EducationInfo,
  ParentInfo,
} from "@/domain/entities/AllOptions";

interface IState {
  data: any;
  employee: any;
  tableIndex: number;
  schoolId: number;
  filterStatus: any;
  displayColumn: any;
  loading: boolean;
  error: boolean;
  handleSearch: Function;
  handleDelete: Function;
  optionsTable: any;
  students: any;
  tableIndexOfStudentData: number;
  displayColumnOfStudentData: any;
  optionsStudentDataTable: any;
  handleSearchStudent: Function;
  handleDeleteStudent: Function;
}
const initialState: IState = {
  data: {
    id: 0,
    name: "",
    phone: "",
    email: "",
    pos_code: 0,
    description: "",
    user_id: 0,
    province_name: "",
    regency_name: "",
    opened_at: "",
    report_school: {
      total_employee: 0,
      total_teacher: 0,
      total_social_employee: 0,
      total_student: 0,
    },
    head_master: {
      id: 0,
      name: "",
      email: "",
      phone: "",
      image: null,
    },
    address: "",
  },
  employee: [],
  tableIndex: 0,
  schoolId: 0,
  filterStatus: {},
  displayColumn: [{}],

  loading: false,
  error: false,
  handleSearch: () => {},
  handleDelete: () => {},
  optionsTable: {},
  students: [],
  tableIndexOfStudentData: 0,
  displayColumnOfStudentData: [],
  handleSearchStudent: () => {},
  handleDeleteStudent: () => {},
  optionsStudentDataTable: {},
};

export const MadrasahInfoContext = React.createContext(initialState);

const MadrasahInfoController = ({ children }) => {
  const [state, setState] = React.useState(initialState);
  const [tableIndex, setTableIndex] = React.useState(0);
  const employeePresenter: EmployeePresenter = container.resolve(
    EmployeePresenter
  );
  const studentPresenter: StudentPresenter = container.resolve(
    StudentPresenter
  );
  const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter);
  const { id } = useParams();
  const [filterStatus, setFilterStatus] = React.useState<any>({
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: id,
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

  const [displayColumn, setDisplayColumn] = React.useState([
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
    { label: "No Hp.", name: "phone", options: { filter: true, sort: true } },
    { label: "Status", name: "status", options: { filter: true, sort: true } },
    {
      label: "Tahun Masuk",
      name: "registered_year",
      options: { filter: true, sort: true },
    },
  ]);

  const optionsTable = {
    filterType: "dropdown",
    responsive: "scroll",
    sort: true,
    pagination: true,
    selectableRowsHeader: false,
    search: false,
    page: pagination.page,
    count: pagination.total,
    filter: false,
    textLabels: {
      body: {
        noMatch: state.loading ? "loading..." : "Maaf tidak ada data",
      },
    },
    elevation: 0,
    print: false,
    download: false,
    viewColumns: false,
    selectableRowsOnClick: true,
    fixedHeaderOptions: { yAxis: true },
    onCellClick: (colData, celMeta: { colIndex; rowIndex; dataIndex }) => {
      const idData = state.employee[celMeta.dataIndex]["id"];
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
            const employeeSortByColumn = await employeePresenter.loadData({
              ...filterStatus,
              sort: {
                [displayColumn[tableState.activeColumn]["name"]]: "ASC",
              },
            });
            setFilterStatus({
              ...filterStatus,
              sort: {
                [displayColumn[tableState.activeColumn]["name"]]: "ASC",
              },
            });
            setState({
              ...state,
              employee: employeeSortByColumn.data.data,
            });
          } else {
            const employeeSortByColumn = await employeePresenter.loadData({
              ...filterStatus,
              sort: {
                [displayColumn[tableState.activeColumn]["name"]]: "DESC",
              },
            });
            setFilterStatus({
              ...filterStatus,
              sort: {
                [displayColumn[tableState.activeColumn]["name"]]: "DESC",
              },
            });
            setState({
              ...state,
              employee: employeeSortByColumn.data.data,
            });
          }
          break;

        case "changePage":
          const employeeSorted = await employeePresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintion((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          if (employeeSorted !== null) {
            setState({
              ...state,
              employee: employeeSorted.data.data,
            });
          }
          break;
        case "rowsPerPage":
          const employeeSortedByRows = await employeePresenter.loadData({
            ...filterStatus,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          if (employeeSorted !== null) {
            setState({
              ...state,
              employee: employeeSortedByRows.data.data,
            });
          }
      }
    },
    disableToolbarSelect: true,
  };

  const [tableIndexOfStudentData, setTableIndexOfStudentData] = React.useState(
    0
  );

  const [
    filterStatusOfStudentData,
    setFilterStatusOfStudentData,
  ] = React.useState<any>({
    paging: {
      page: 1,
      limit: 10,
    },
    filter: {
      school_id: id,
    },
    search: "",
    sort: {
      id: "DESC",
    },
  });

  const [paginationOfStudenData, setPagintionOfStudentData] = React.useState<
    any
  >({
    total: 0,
    page: 0,
    rowsPerPage: 10,
  });

  const [
    displayColumnOfStudentData,
    setDisplayColumnofStudentData,
  ] = React.useState([
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
  ]);

  const optionsStudentDataTable = {
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
    page: paginationOfStudenData.page,
    count: paginationOfStudenData.total,
    filter: false,
    elevation: 0,
    print: false,
    download: false,
    selectableRows: false,
    viewColumns: false,
    selectableRowsOnClick: false,
    fixedHeaderOptions: { yAxis: true },
    onCellClick: (colData, celMeta: { colIndex; rowIndex; dataIndex }) => {
      const idData = state.students[celMeta.dataIndex]["id"];
      setTableIndexOfStudentData(idData);
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
              ...filterStatusOfStudentData,
              sort: {
                [displayColumnOfStudentData[tableState.activeColumn]["name"]]:
                  "ASC",
              },
            });
            setFilterStatusOfStudentData({
              ...filterStatusOfStudentData,
              sort: {
                [displayColumnOfStudentData[tableState.activeColumn]["name"]]:
                  "ASC",
              },
            });

            setState({
              ...state,
              students: studentSortByColumn.data.data,
            });
          } else {
            const studentSortByColumn = await studentPresenter.loadData({
              ...filterStatusOfStudentData,
              sort: {
                [displayColumnOfStudentData[tableState.activeColumn]["name"]]:
                  "DESC",
              },
            });
            setFilterStatusOfStudentData({
              ...filterStatusOfStudentData,
              sort: {
                [displayColumnOfStudentData[tableState.activeColumn]["name"]]:
                  "DESC",
              },
            });

            setState({
              ...state,
              students: studentSortByColumn.data.data,
            });
          }
          break;

        case "changePage":
          const studentSorted = await studentPresenter.loadData({
            ...filterStatusOfStudentData,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });
          setPagintionOfStudentData((prevState) => ({
            ...prevState,
            page: tableState.page,
          }));
          setFilterStatusOfStudentData({
            ...filterStatusOfStudentData,
            paging: {
              ...filterStatusOfStudentData.paging,
              page: tableState.page,
            },
          });
          if (studentSorted.data.data !== null) {
            setState({
              ...state,
              students: studentSorted.data.data,
            });
          }

          break;
        case "changeRowsPerPage":
          const studentSortedByRows = await studentPresenter.loadData({
            ...filterStatusOfStudentData,
            paging: {
              page: tableState.page + 1,
              limit: tableState.rowsPerPage,
            },
          });

          setPagintionOfStudentData((prevState) => ({
            ...prevState,
            rowsPerPage: tableState.rowsPerPage,
          }));
          setFilterStatusOfStudentData({
            ...filterStatusOfStudentData,
            paging: {
              ...filterStatusOfStudentData.paging,
              rowsPerPage: tableState.rowsPerPage,
            },
          });
          if (studentSortedByRows.data.data !== null) {
            setState({
              ...state,
              students: studentSortedByRows.data.data,
            });
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
                paddingLeft: "40px",
              }}
            >
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12} mb={4} mr={2}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={3}>
                            <div
                              style={{
                                width: "82px",
                                height: "82px",
                                border: "1px solid #979797",
                                borderRadius: "50%",
                              }}
                            >
                              {state.students[rowMeta.dataIndex]["image"] ===
                                "" ||
                              state.students[rowMeta.dataIndex]["image"] ===
                                null ? (
                                <Avatar
                                  style={{
                                    background: "orange",
                                    width: "82px",
                                    height: "82px",
                                  }}
                                >
                                  {state.students[rowMeta.dataIndex]["name"][0]}
                                </Avatar>
                              ) : (
                                <img
                                  src={
                                    state.students[rowMeta.dataIndex]["image"]
                                  }
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
                        </GridItem>
                        <GridItem xs={12} sm={12} md={9}>
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
                                {state.students[rowMeta.dataIndex]["name"]}
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
                                {state.students[rowMeta.dataIndex]["school_id"]}
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
                                  state.students[rowMeta.dataIndex][
                                    "identity_number"
                                  ]
                                }
                              </Typography>
                            </GridItem>
                          </GridContainer>
                        </GridItem>
                      </GridContainer>
                    </GridItem>
                    <GridItem xs={12} sx={12} md={12}>
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={12}>
                          <GridContainer>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={6}
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
                                            state.students[rowMeta.dataIndex][
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
                              md={6}
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
                                            state.students[rowMeta.dataIndex][
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
                              md={6}
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
                                            state.students[rowMeta.dataIndex][
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

  React.useEffect(() => {
    (async () => {
      setState((prevState) => ({
        ...state,
        loading: true,
      }));
      const schoolData: any = await schoolPresenter.loadDataDetail(
        _.toNumber(id)
      );
      const employeeData: any = await employeePresenter.loadData({
        ...filterStatus,
      });
      const studentData: any = await studentPresenter.loadData({
        ...filterStatusOfStudentData,
      });
      setPagintion({
        total: employeeData.data.pagination.total,
        page: employeeData.data.pagination.current_page - 1,
        rowsPerPage: employeeData.data.pagination.page_size,
      });
      setFilterStatus((prevState) => ({
        ...prevState,
        paging: {
          page: employeeData.data.pagination.current_page - 1,
          limit: employeeData.data.pagination.page_size,
        },
      }));
      setPagintionOfStudentData((prevState) => ({
        total: studentData.data.pagination.total,
        page: studentData.data.pagination.current_page - 1,
        rowsPerPage: studentData.data.pagination.page_size,
      }));
      setFilterStatusOfStudentData((prevState) => ({
        ...prevState,
        paging: {
          page: studentData.data.pagination.current_page - 1,
          limit: studentData.data.pagination.page_size,
        },
      }));
      setState((prevState) => ({
        ...prevState,
        employee: employeeData.data.data === null ? [] : employeeData.data.data,
        data: schoolData,
        students: studentData.data.data === null ? [] : studentData.data.data,
        loading: false,
      }));
    })();
  }, []);

  const handleSearch = async (query) => {
    const employeeBySearchQuery: any = await employeePresenter.loadData({
      ...filterStatus,
      search: query,
    });
    console.log(employeeBySearchQuery);
    if (employeeBySearchQuery.data.data !== null) {
      setState((prevState) => ({
        ...prevState,
        employee: employeeBySearchQuery.data.data,
      }));
      setPagintion({
        total: employeeBySearchQuery.data.pagination.total,
        page: employeeBySearchQuery.data.pagination.current_page - 1,
        rowsPerPage: employeeBySearchQuery.data.pagination.page_size,
      });
      setFilterStatus((prevState) => ({
        ...prevState,
        paging: {
          page: employeeBySearchQuery.data.pagination.current_page - 1,
          limit: employeeBySearchQuery.data.pagination.page_size,
        },
      }));
    } else {
      setPagintion({
        total: employeeBySearchQuery.data.pagination.total,
        page: employeeBySearchQuery.data.pagination.cuurent_page,
        rowsPerPage: employeeBySearchQuery.data.pagination.page_size,
      });
      setFilterStatus((prevState) => ({
        ...prevState,
        paging: {
          page: employeeBySearchQuery.data.pagination.current_page,
          limit: employeeBySearchQuery.data.pagination.page_size,
        },
      }));
      setState((prevState) => ({
        ...prevState,
        employee: [],
      }));
    }
  };

  const handleSearchStudent = async (query) => {
    const studentBySearchQuery: any = await studentPresenter.loadData({
      ...filterStatusOfStudentData,
      search: query,
    });
    if (studentBySearchQuery.data.data !== null) {
      setPagintionOfStudentData((prevState) => ({
        total: studentBySearchQuery.data.pagination.total,
        page: studentBySearchQuery.data.pagination.current_page - 1,
        rowsPerPage: studentBySearchQuery.data.pagination.page_size,
      }));
      setFilterStatusOfStudentData((prevState) => ({
        ...prevState,
        paging: {
          page: studentBySearchQuery.data.pagination.current_page - 1,
          limit: studentBySearchQuery.data.pagination.page_size,
        },
      }));
      setState((prevState) => ({
        ...prevState,
        students: studentBySearchQuery.data.data,
      }));
    } else {
      setPagintionOfStudentData((prevState) => ({
        total: studentBySearchQuery.data.pagination.total,
        page: studentBySearchQuery.data.pagination.current_page,
        rowsPerPage: studentBySearchQuery.data.pagination.page_size,
      }));
      setFilterStatusOfStudentData((prevState) => ({
        ...prevState,
        paging: {
          page: studentBySearchQuery.data.pagination.current_page - 1,
          limit: studentBySearchQuery.data.pagination.page_size,
        },
      }));
      setState((prevState) => ({
        ...prevState,
        students: [],
      }));
    }
  };

  const handleDelete = async (id) => {
    const employeeBySearchQuery: any = employeePresenter.deleteEmployeeData(id);
    if (employeeBySearchQuery) {
      const employee = await employeePresenter.loadData(filterStatus);
      setPagintion({
        total: employee.data.pagination.total,
        page: employee.data.pagination.current_page - 1,
        rowsPerPage: employee.data.pagination.page_size,
      });
      setFilterStatus((prevState) => ({
        ...prevState,
        paging: {
          page: employee.data.pagination.current_page - 1,
          limit: employee.data.pagination.page_size,
        },
      }));
      setState((prevState) => ({
        ...prevState,
        employee: employee.data.data,
      }));
      return true;
    } else {
      return false;
    }
  };

  const handleDeleteStudent = async (id) => {
    const studentBySearchQuery: any = studentPresenter.deleteStudentData(id);

    if (studentBySearchQuery) {
      const students = await studentPresenter.loadData(filterStatus);
      setPagintionOfStudentData((prevState) => ({
        total: students.data.pagination.total,
        page: students.data.pagination.cuurent_page - 1,
        rowsPerPage: students.data.pagination.page_size,
      }));
      setFilterStatusOfStudentData((prevState) => ({
        ...prevState,
        paging: {
          page: students.data.pagination.cuurent_page - 1,
          limit: students.data.pagination.page_size,
        },
      }));
      setState((prevState) => ({
        ...prevState,
        students: students.data.data,
      }));
      return true;
    } else {
      return false;
    }
  };

  console.log(state);

  return (
    <MadrasahInfoContext.Provider
      value={{
        ...state,
        tableIndex: tableIndex,
        filterStatus: filterStatus,
        displayColumn: displayColumn,
        handleSearch: handleSearch,
        handleDelete: handleDelete,
        optionsTable: optionsTable,
        tableIndexOfStudentData,
        handleSearchStudent,
        handleDeleteStudent,
        optionsStudentDataTable: optionsStudentDataTable,
        displayColumnOfStudentData,
      }}
    >
      {" "}
      {children}
    </MadrasahInfoContext.Provider>
  );
};

export default MadrasahInfoController;
