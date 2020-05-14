import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
import moment from 'moment';

const selected = moment().utcOffset("+07:00").startOf('year').format()
const selectedEnd = moment().utcOffset("+07:00").endOf('year').format()
const dayNow = moment().utcOffset("+07:00").startOf('month').format()
const dayNextMonth = moment().utcOffset("+07:00").endOf('month').format()

const { school: school_name, role } = getUserInfo()
const idSchool = school_name?.id;
const nameSchool = school_name?.name;

const startDateByRole = role !== 2 ? selected : dayNow
const endDateByRole = role !== 2 ? selectedEnd : dayNextMonth

const initialState = {
  filterData: {
    dateSelected: {
      start_date: startDateByRole,
      end_date: endDateByRole,
    },
    // Unit ma'had Data
    unitSelected: [],
    unitData: [],
    unitDataRaw: [],
    unitDataLoading: false,
    unitDataFetching: false,
    // City data
    citySelected: [],
    cityData: [{ name: 0, label: 'Semua' }],
    cityDataLoading: false,
    isCityFetching: false,
    handleSetState: () => { },
    handleCreateReport: () => { },
    modalFilter: false,
  },
  handleClearFilter: () => { },
  handleSetFilter: () => { },
  reportType: role === 1 ? "filter" : "general",
  optionsUnit: "",
  filterStartDate: new Date(),
  filterEndDate: new Date(),
  selectedSeries: [
    {
      name: "Prognosis",
      total: 12000000,
      compareData: 20,
      data: [140, 160, 175, 160, 150, 175, 170, 150],
    },
  ],
  data: [],
  summary: {
    totalDonations: {
      value: 1200000,
      precentage: 20,
    },
    totalDonationSubmitted: {
      value: 1200000,
      precentage: 20,
    },
    totalDonatur: {
      value: 1200000,
      precentage: 20,
    },
    totalNewDonatur: {
      value: 120000,
      precentage: 20,
    },
  },
  filterParam: {
    filter: {
      school_id: null,
      start_date: startDateByRole,
      end_date: endDateByRole,
      regency: null,
    },
  },
  filterRegency: {
    filter: {
      school: "all",
    },
    search: "",
  },
  filterSchool: {
    filter: {
      school_id: null,
      school_name: "",
      start_date: startDateByRole,
      end_date: endDateByRole,
    },
  },
  filterParamOperator: {
    filter: {
      school_id: idSchool,
      start_date: startDateByRole,
      end_date: endDateByRole,
    },
  },
  filterParamAdmin: {
    filter: {
      school_id: null,
      start_date: startDateByRole,
      end_date: endDateByRole,
      regency: "",
    },
  },
  generalReport: {},
  divisionReport: {},
  cashAndGoodsReport: {},
  tableCommonReport: {},
  tablePermonthReport: {},
  totalZiswafPercent: {},
  error: false,
  loading: false,
  handleChange: () => { },
  handleClick: () => { },
  upzPermonth: {},
  retailPermonth: {},
  corporatePermonth: {},
  prognosisUpz: {},
  PrognosisRetail: {},
  prognosisCorporate: {},
  setFilterParam: () => { },
  idSchool: null,
  dateNow: "",
  role: null,
  modal: false,
  setModal: () => { },
  setValueData: () => { },
  regency: [],
  setFilterRegency: () => { },
  setUnit: () => { },
  unit: [],
  setSchoolData: () => { },
  getRegencyData: () => { },
  filterDataRegency: [],
  getSchoolData: () => { },
  setFilterSchool: () => { },
  filterDataSchool: () => { },
  setFilterParamAdmin: () => { },
  operatorData: {},
  setDataOperator: () => { },
  generalReportOperator: {},
  divisionReportOperator: {},
  cashAndGoodsReportOperator: {},
  totalZiswafPercentOperator: {},
  setZiswafPercentOperator: () => { },
  tableUpzOp: {},
  tableRetailOp: {},
  tableCoprOp: {},
  dashboardData: {},
  divPercent: {},
  labelSearch: "",
  labelSearchRegency: "",
  setLabelSearchRegency: () => { },
  setLabelSearch: () => { },
  setReportType: () => { },
  fetchReportData: () => { },
  setMessage: () => { },
  message: "",
  handleExportPdf: () => { },
  generalOperatorPerDay: [],
  debouncedSchool: () => {},
  loadSchool: () => {}
};

export default initialState