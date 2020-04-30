  import React, { useState, useEffect, useMemo } from 'react'
import { container } from "tsyringe";
import { DashboardAdminPresenter } from "@/app/infrastructures/Presenter/DashboardAdmin/Presenter";
import { DashboardOperatorPresenter } from "@/app/infrastructures/Presenter/DashboardOperator/Presenter";
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
import moment from 'moment';
import 'moment/locale/id'
import { useDebounce } from 'use-lodash-debounce';
import { createContainer } from 'react-tracked'



export interface IState {
  [x: string]: any;
  optionsUnit: string,
  filterStartDate: string,
  filterEndDate: string,
  error: boolean,
  selectedSeries: any,
  loading: boolean,
  handleChange: Function,
  handleClick: Function,
  data: object;
  dataDashboard: any;
  dataCommonReport: any;
  dataDivisionReport: any;
  dataNominalReport: any;
  dataPrognosisUpz: any;
  dataPrognosisRetail: any;
  dataPrognosisCorporate: any;
  dataUpzPerMonth: any;
  dataRetailPerMonth: any;
  dataCorporatePerMonth: any;
  dataDashboardOperator: any;
  filterParam: any;
  filterParamAdmin: any;
  dataPerMonthRetail: any,
  dataPerMonthUpz: any,
  dataPerMonthCorporate: any,
  school: any,
  fetchingButton: Function,
  dataOperatorZakatMaal: any,
  dataOperatorFitrah: any,
  dataOperatorInfaq: any,
  dataOperatorKurban: any,
  dataOperatorWakaf: any,
  dataOperatorOther: any,
  returnCategories: Function,
  dataPrognosisPerMonth: any,
  dataTransactionPerMonth: any,
  dataCompare: any,
  dataZiswafPersent: any
  selectedColor: any,
  dataAdminPermonth: any
  dataAdminZakatMaal: any
  dataAdminFitrah: any
  dataAdminInfaq: any
  dataAdminKurban: any
  dataAdminOther: any
  dataAdminWakaf: any
  dataSeries: any
  status: number
  role: number
  username: string,
  colors: any,
  categories: any,
  categoriesPerDay: any,
  setFilterParamAdmin: Function,
  setFilterParam: Function,
  endDate: Date,
  filterDataSchool: any,
  startDate: Date,
  idSchool: number | null,
  getSchoolData: Function,
  setLabelSearch: Function,
  labelSearch: string,
  dataOperatorPerDay: any,
  setDataOperatorPerDay: Function
  selectedSeriesOperator: any
  handleClickOperator: Function
  operatorData: any
  setOperatorData: Function
}

const { status, role, username, school: school_name, } = getUserInfo()
const idSchool = school_name?.id;
const nameSchool = school_name?.name;

const selected = moment().startOf('year').subtract(1, 'ms').add(1, 'day').format()
const selectedEnd = moment().endOf('year').toDate()
const dayNow = moment(new Date()).startOf('month').subtract(1, 'ms').add(1, 'day').format()
const dayNextMonth = moment(new Date()).endOf('month').toDate()

const startDateByRole = role !== 2 ? selected : dayNow
const endDateByRole = role !== 2 ? selectedEnd : dayNextMonth


const initialState: IState = {
  optionsUnit: '',
  filterStartDate: '',
  filterEndDate: '',
  selectedSeries: [
    {
      name: 'Total Ziswaf Permonth',
      total: 0,
      compareData: 0,
      data: [],
      color: '#2C39C2'
    },
  ],
  selectedSeriesOperator: [
    {
      name: 'Total Ziswaf Perday',
      total: 0,
      compareData: 0,
      data: [],
      color: '#2C39C2'
    },
  ],
  selectedColor: [],
  error: false,
  loading: false,
  handleChange: () => { },
  handleClick: () => { },
  data: {},
  dataDashboard: {},
  dataCommonReport: {},
  dataDivisionReport: {},
  dataNominalReport: {},
  dataPrognosisUpz: {},
  dataPrognosisRetail: {},
  dataPrognosisCorporate: {},
  dataUpzPerMonth: {},
  dataRetailPerMonth: {},
  dataCorporatePerMonth: {},
  dataDashboardOperator: {},
  filterParam: {
    filter: {
      school_id: idSchool,
      school_name: nameSchool,
      start_date: startDateByRole,
      end_date: endDateByRole,
    }
  },
  filterParamAdmin: {
    filter: {
      school_id: null,
      start_date: startDateByRole,
      end_date: endDateByRole,
    }
  },
  labelDataSelect: null,
  dataPerMonthRetail: [],
  dataPerMonthUpz: [],
  dataPerMonthCorporate: [],
  school: [],
  fetchingButton: () => { },
  dataOperatorZakatMaal: [],
  dataOperatorFitrah: [],
  dataOperatorInfaq: [],
  dataOperatorKurban: [],
  dataOperatorWakaf: [],
  dataOperatorOther: [],
  returnCategories: () => { },
  dataPrognosisPerMonth: {},
  dataTransactionPerMonth: {},
  dataCompare: {},
  dataZiswafPersent: {},
  dataAdminPermonth: [],
  dataAdminZakatMaal: [],
  dataAdminFitrah: [],
  dataAdminInfaq: [],
  dataAdminKurban: [],
  dataAdminOther: [],
  dataAdminWakaf: [],
  dataSeries: [],
  status: 0,
  role: 0,
  username: '',
  colors: [],
  categories: [],
  categoriesPerDay: [],
  setFilterParamAdmin: () => { },
  setFilterParam: () => { },
  startDate: new Date(),
  endDate: new Date(),
  filterDataSchool: [],
  idSchool: null,
  getSchoolData: () => { },
  labelSearch: '',
  setLabelSearch: () => { },
  dataOperatorPerDay: [],
  setDataOperatorPerDay: () => { },
  handleClickOperator: () => { },
  operatorData: [
    {
      name: 'Total Ziswaf Perday',
      total: 0,
      compareData: 0,
      data: [],
      color: '#2C39C2'
    },
  ],
  setOperatorData: () => { }
}

interface FilterParams {
  filter: Filter,
}
interface Filter {
  school_id: number,
  start_date: string,
  end_date: string,
}

export const DashboardContext = React.createContext<IState>(initialState);

export const { Provider: DashboardProvider, Consumer: DashboardConsumer } = DashboardContext;


const {
  Provider,
  useTracked,
} = createContainer(() => useState(initialState));

export const DashboardController = ({ children }) => {
  const [state, setState] = useTracked()
  const [loading, setLoading] = useState(false)
  const [idVal, setIdVal] = useState<number>(0)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [labelDataSelect, setLabelDataSelect] = useState(null);
  const [labelSearch, setLabelSearch] = useState('');
 
  const [filterParam, setFilterParam] = useState<any>(initialState.filterParam)
  const [filterParamAdmin, setFilterParamAdmin] = useState<any>(initialState.filterParamAdmin)
  const [school, setSchool] = useState<any>([]);

  const dashboardAdminPresenter: DashboardAdminPresenter = container.resolve(DashboardAdminPresenter);
  const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
  const debounceSearchSchool = useDebounce(school, 500)
  const filterDataSchool = school && school.length > 0 ? school.map((val, index) => ({ value: val.id, label: val.name })) : [];

  const _handleChange = (payload, action) => {
    switch (action) {
      case 'startdate':
        return setState({
          ...state,
          filterStartDate: payload
        })

      case 'enddate':
        return setState({
          ...state,
          filterEndDate: payload
        })

      default:
        return setState({
          ...state,
          optionsUnit: payload.value
        })
    }
  }

  const adminPermonth = state.dataAdminPermonth.map(val => val.total)
  const operatorPerDay = state.dataOperatorPerDay.map(val => val.total)

  useEffect(() => {
    if (role === 1) {
      if (initialState.selectedSeries[0].data.length < 1) {
        setState(prevState => ({
          ...prevState,
          selectedSeries: [{
            ...prevState.selectedSeries[0],
            data: adminPermonth
          }]
        }))
      }
    }
  }, [state.dataAdminPermonth])

  useEffect(() => {
    if (role === 2) {
      if (initialState.operatorData[0].data.length < 1) {
        const operator = [
          {
            name: 'Total Ziswaf Perday',
            total: 0,
            compareData: 0,
            data: operatorPerDay,
            color: '#2C39C2'
          },
        ]
        setState(prevState => ({
          ...prevState,
          operatorData: operator
        }))
      }
    }
  }, [state.dataOperatorPerDay])

  useEffect(() => {
    if (role === 1) {
      getSchoolData("");
    }

  }, [filterParamAdmin]);

  useEffect(() => {
    if (role === 1) {
      onGetData();
    }
  }, [filterParamAdmin]);

  useEffect(() => {
    if (role === 2) {
      onGetDataDashboardOperator();
    }
  
  }, [filterParam]);


  const onGetData = async () => {
    try {
      setLoading(true)

      const dashboardData = await dashboardAdminPresenter.getAll(filterParamAdmin);

      setState({
        ...state,
        data: dashboardData,
        selectedSeries: initialState.selectedSeries,
        dataAdminPermonth: dashboardData.data?.dashboardAdmin?.ziswafTotalPermonth,
        dataAdminZakatMaal: dashboardData.data?.dashboardAdmin?.zakatMaalPerMonth,
        dataAdminFitrah: dashboardData.data?.dashboardAdmin?.zakatFitrahPerMonth,
        dataAdminInfaq:  dashboardData.data?.dashboardAdmin?.infaqPerMonth,
        dataAdminKurban: dashboardData.data?.dashboardAdmin?.kurbanPerMonth,
        dataAdminOther: dashboardData.data?.dashboardAdmin?.otherPerMonth,
        dataAdminWakaf: dashboardData.data?.dashboardAdmin?.wakafPerMonth,
        dataDashboard: dashboardData.data?.dashboardAdmin,
        dataCommonReport: dashboardData.data?.commonReport,
        dataDivisionReport: dashboardData.data?.divisionReport,
        dataNominalReport: dashboardData.data?.nominalReport,
        dataPrognosisUpz: dashboardData.data?.prognosisUpz,
        dataPrognosisRetail: dashboardData.data?.prognosisRetail,
        dataPrognosisCorporate: dashboardData.data?.pronosisCorporate,
        dataUpzPerMonth: dashboardData.data?.upzPerMonth,
        dataRetailPerMonth: dashboardData.data?.retailPerMonth,
        dataCorporatePerMonth: dashboardData.data?.corporatePerMonth,
        dataTransactionPerMonth: dashboardData.data?.commonReport?.totalTransactionPerMonth,
        dataPrognosisPerMonth: dashboardData.data?.commonReport?.totalPrognosisPerMonth,
        dataCompare: dashboardData.data?.dashboardAdmin?.totalTransactionLastYear,
        dataZiswafPersent: dashboardData.data?.commonReport?.totalZiswafPersent,
      })
      setLoading(false)
    } catch (error) {
      setState({
        ...state,
        dataPrognosisPerMonth: {},
        selectedSeries: initialState.selectedSeries,
        dataTransactionPerMonth: {},
        dataCompare: {},
        dataZiswafPersent: {},
        dataAdminPermonth: [],
        dataAdminZakatMaal: [],
        dataAdminFitrah: [],
        dataAdminInfaq: [],
        dataAdminKurban: [],
        dataAdminOther: [],
        dataAdminWakaf: [],
        data: {},
        dataDashboard: {},
        dataCommonReport: {},
        dataDivisionReport: {},
        dataNominalReport: {},
        dataPrognosisUpz: {},
        dataPrognosisRetail: {},
        dataPrognosisCorporate: {},
        dataUpzPerMonth: {},
        dataRetailPerMonth: {},
        dataCorporatePerMonth: {},
      })
      setLoading(false)
    }
  };

  const getSchoolData = async (value) => {
    const filterParam = {
      search: value,
      paging: {
        page: 0,
        limit: 10,
      },
    }
    if (debounceSearchSchool !== '') {
      const schoolData = await schoolPresenter.loadData(filterParam)
      setSchool(schoolData.data.data)
    }
  }

  const onGetDataDashboardOperator = async () => {
    setLoading(true)
    const presenter = await container.resolve(DashboardOperatorPresenter);
    presenter.getAllData(filterParam)
      .then((res) => {
        setState({
          ...state,
          dataOperatorPerDay: res.data?.totalZiswafPerDay,
          selectedSeries: initialState.selectedSeries,
          dataDashboardOperator: res.data?.dashboardOperator,
          dataOperatorZakatMaal: res.data?.zakatMaalPerDay,
          dataOperatorFitrah: res.data?.zakatFitrahPerDay,
          dataOperatorInfaq: res.data?.infaqPerDay,
          dataOperatorKurban: res.data?.kurbanPerDay,
          dataOperatorWakaf: res.data?.wakafPerDay,
          dataOperatorOther: res.data?.otherPerDay,
          dataCommonReport: res.data?.commonReport,
          dataDivisionReport: res.data?.divisionReport,
          dataNominalReport: res.data?.nominalReport,
          dataCompare: res.data?.dashboardOperator?.totalTransactionLastYear
        })
      
        setLoading(false)
      })
      .catch((error) => {
        setState({
          ...state,
          dataCommonReport: {},
          selectedSeries: initialState.selectedSeries,
          dataDivisionReport: {},
          dataNominalReport: {},
          dataOperatorZakatMaal: [],
          dataOperatorFitrah: [],
          dataOperatorInfaq: [],
          dataOperatorKurban: [],
          dataOperatorWakaf: [],
          dataOperatorOther: [],
          dataOperatorPerDay: [],
          dataCompare: {},
          dataDashboardOperator: {}
        })
        setLoading(false)

      })
  };

  const _handleClick = (e, selected) => {
    const isThere = state.selectedSeries.filter(value => value.name === selected.name)
    if (isThere.length > 0) {
      setState({
        ...state,
        selectedSeries: state.selectedSeries.filter(value => value.name !== selected.name),
      })
    }
    else {
      setState({
        ...state,
        selectedSeries: [...state.selectedSeries, selected],
      })
    }
  }

  const _handleClickOperator = (e, selected) => {
    const isThere = state.operatorData.filter(value => value.name === selected.name)
    if (isThere.length > 0) {
      const operator = state.operatorData.filter(value => value.name !== selected.name)
      setState({
        ...state,
        operatorData: operator
      })
    }
    else {
      const temp = [...state.operatorData, selected]
      setState({
        ...state,
        operatorData: temp
      })
    }
  }

  const dataPerMonthRetail = [
    {
      name: 'Data Per Month Retail',
      data: Object.values(state.dataRetailPerMonth),
    }
  ]

  const dataPerMonthUpz = [
    {
      name: 'Data Per Month UPZ',
      data: Object.values(state.dataUpzPerMonth),
    }
  ]

  const dataPerMonthCorporate = [
    {
      name: 'Data Per Month Corporate',
      data: Object.values(state.dataCorporatePerMonth),
    }
  ]


  const fetchingButton = (val: any) => {
    setIdVal(val)
  }

  const returnCategories = () => {
    switch (idVal) {
      case idVal:
        return state.dataOperatorZakatMaal.map((val, index) => index)
      default:
        return Object.keys(state.dataPrognosisCorporate)
    }
  }

  const colors = [
    "#3DB15B",
    "#FFB946",
    "#BFC94C",
    "#F7685B",
    "#E546FF",
    "#5BEEF7",
  ];
  const currentYear = new Date().getFullYear().toString().substr(-2);
  const categories = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'Mei',
    'Jun',
    'Jul',
    'Agst',
    'Sept',
    'Okt',
    'Nov',
    'Des'
  ].map(val => `${val} ${currentYear}`)
  const categoriesPerDay = state.dataOperatorPerDay.map((val, i) => i)

  const series = [
    {
      name: 'Zakat Maal',
      total: role === 1 ? state.dataDashboard.totalZakatMaal : state.dataDashboardOperator.totalZakatMaal,
      compareData: role === 1 ? state.dataCommonReport.totalZiswafPersent && state.dataCommonReport.totalZiswafPersent.zakatMaalPersent : state.dataCommonReport.total_ziswaf_percent && state.dataCommonReport.total_ziswaf_percent.zakatMaalPersent,
      data: role === 1 ? state.dataAdminZakatMaal.map(val => val.total) : state.dataOperatorZakatMaal.map(val => val.total),
      color: "#3DB15B"
    },
    {
      name: 'Zakat Fitrah',
      total: role === 1 ? state.dataDashboard.totalZakatFitrah : state.dataDashboardOperator.totalZakatFitrah,
      compareData: role === 1 ? state.dataCommonReport.totalZiswafPersent && state.dataCommonReport.totalZiswafPersent.zakatFitrahPersent : state.dataCommonReport.total_ziswaf_percent && state.dataCommonReport.total_ziswaf_percent.zakatFitrahPersent,
      data: role === 1 ? state.dataAdminFitrah.map(val => val.total) : state.dataOperatorFitrah.map(val => val.total),
      color: "#FFB946"
    },
    {
      name: 'Infaq/Shadaqah',
      total: role === 1 ? state.dataDashboard.totalInfaq : state.dataDashboardOperator.totalInfaq,
      compareData: role === 1 ? state.dataCommonReport.totalZiswafPersent && state.dataCommonReport.totalZiswafPersent.infaqPersent :state.dataCommonReport.total_ziswaf_percent && state.dataCommonReport.total_ziswaf_percent.infaqPersent,
      data: role === 1 ? state.dataAdminInfaq.map(val => val.total) : state.dataOperatorInfaq.map(val => val.total),
      color: "#BFC94C"
    },
    {
      name: 'Wakaf',
      total: role === 1 ? state.dataDashboard.totalWakaf : state.dataDashboardOperator.totalWakaf,
      compareData: role === 1 ? state.dataCommonReport.totalZiswafPersent && state.dataCommonReport.totalZiswafPersent.waqafPersent : state.dataCommonReport.total_ziswaf_percent && state.dataCommonReport.total_ziswaf_percent.waqafPersent,
      data: role === 1 ? state.dataAdminWakaf.map(val => val.total) : state.dataOperatorWakaf.map(val => val.total),
      color: "#F7685B"
    },
    {
      name: 'Penerimaan lain',
      total: role === 1 ? state.dataDashboard.totalOther : state.dataDashboardOperator.totalOther,
      compareData: role === 1 ? state.dataCommonReport.totalZiswafPersent && state.dataCommonReport.totalZiswafPersent.otherPersent : state.dataCommonReport.total_ziswaf_percent && state.dataCommonReport.total_ziswaf_percent.otherPersent,
      data: role === 1 ? state.dataAdminOther.map(val => val.total) : state.dataOperatorOther.map(val => val.total),
      color: '#E546FF'
    },
    {
      name: 'Kurban',
      total: role === 1 ? state.dataDashboard.totalKurban : state.dataDashboardOperator.totalKurban,
      compareData: role === 1 ? state.dataCommonReport.totalZiswafPersent && state.dataCommonReport.totalZiswafPersent.qurbanPersent : state.dataCommonReport.total_ziswaf_percent && state.dataCommonReport.total_ziswaf_percent.qurbanPersent,
      data: role === 1 ? state.dataAdminKurban.map(val => val.total) : state.dataOperatorKurban.map(val => val.total),
      color: '#5BEEF7'
    },
  ]


  return (
    <DashboardProvider
      value={{
        ...state,
        getSchoolData,
        filterParam,
        filterParamAdmin,
        optionsUnit: state.optionsUnit,
        filterStartDate: state.filterStartDate,
        filterEndDate: state.filterEndDate,
        selectedSeries: state.selectedSeries,
        selectedColor: state.selectedColor,
        error: state.error,
        loading: loading,
        handleChange: _handleChange,
        handleClick: _handleClick,
        dataPerMonthRetail,
        dataPerMonthUpz,
        dataPerMonthCorporate,
        school,
        fetchingButton,
        returnCategories,
        dataSeries: series,
        startDate,
        status,
        role,
        username,
        colors,
        categories,
        categoriesPerDay,
        setFilterParamAdmin,
        setFilterParam,
        endDate,
        filterDataSchool,
        labelDataSelect,
        setLabelDataSelect,
        idSchool,
        labelSearch,
        setLabelSearch,
        selectedSeriesOperator: state.selectedSeriesOperator,
        handleClickOperator: _handleClickOperator,
      }}>
      {children}
    </DashboardProvider>
  );

};

export const AppProvider = ({ children }) => {
  return (
    <Provider>
      <DashboardController>
        {children}
      </DashboardController>
    </Provider>
  )
}