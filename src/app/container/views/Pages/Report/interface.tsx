interface ISummary {
  totalDonations: {
    value: number;
    precentage: number;
  };
  totalDonationSubmitted: {
    value: number;
    precentage: number;
  };
  totalDonatur: {
    value: number;
    precentage: number;
  };
  totalNewDonatur: {
    value: number;
    precentage: number;
  };
}

interface IObjectParams {
  school_id: number | null;
  start_date: any;
  end_date: any;
  regency: null;
}

interface IFilterParams {
  filter: IObjectParams;
}

export interface ISeries {
  name: string;
  total: number;
  compareData: number;
  data: number[];
}

interface IFilterRegency {
  filter: ICityParams;
  search: any;
}

interface ICityParams {
  school: string;
}

interface IOperatorParams {
  school_id: number;
  start_date: any;
  end_date: any;
}

interface IFilterOperatorParams {
  filter: IOperatorParams;
}

export interface IState {
  filterData: any;
  handleClearFilter: Function,
  handleSetFilter: Function,
  reportType: string;
  optionsUnit: string;
  filterStartDate: Date;
  filterEndDate: Date;
  data: Array<object>;
  filterParam: IFilterParams;
  summary: ISummary;
  error: boolean;
  selectedSeries: ISeries[];
  loading: boolean;
  handleChange: Function;
  handleClick: Function;
  generalReport: any;
  divisionReport: any;
  cashAndGoodsReport: any;
  tableCommonReport: any;
  tablePermonthReport: any;
  totalZiswafPercent: any;
  upzPermonth: any;
  retailPermonth: any;
  corporatePermonth: any;
  prognosisUpz: any;
  PrognosisRetail: any;
  prognosisCorporate: any;
  setFilterParam: Function;
  idSchool: number | null;
  dateNow: Date | any;
  role: number | null;
  modal: boolean;
  setModal: Function;
  filterRegency: IFilterRegency;
  setValueData: Function;
  regency: any;
  setFilterRegency: Function;
  filterSchool: any;
  setUnit: Function;
  unit: any;
  setSchoolData: Function;
  filterParamOperator: IFilterOperatorParams;
  getRegencyData: Function;
  filterDataRegency: any;
  getSchoolData: Function;
  setFilterSchool: Function;
  filterDataSchool: Function;
  filterParamAdmin: any;
  setFilterParamAdmin: Function;
  operatorData: any;
  setDataOperator: Function;
  generalReportOperator: any;
  divisionReportOperator: any;
  cashAndGoodsReportOperator: any;
  totalZiswafPercentOperator: any;
  setZiswafPercentOperator: Function;
  tableUpzOp: any;
  tableRetailOp: any;
  tableCoprOp: any;
  dashboardData: any;
  divPercent: any;
  labelSearch: string;
  labelSearchRegency: string;
  setLabelSearchRegency: Function;
  setLabelSearch: Function;
  setReportType: Function;
  fetchReportData: Function;
  message: string;
  setMessage: Function;
  handleExportPdf: Function
  generalOperatorPerDay: any
  debouncedSchool: Function
  loadSchool: Function
}
