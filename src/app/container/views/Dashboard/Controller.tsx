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
  const [data, setData] = useState<any>({});
  const [dataDashboard, setDataDashboard] = useState<any>({})
  const [dataCommonReport, setDataCommonReport] = useState<any>({})
  const [dataDivisionReport, setDataDivisionReport] = useState<any>({})
  const [dataNominalReport, setDataNominalReport] = useState<any>({})
  const [dataPrognosisUpz, setDataPrognosisUpz] = useState<any>({})
  const [dataPrognosisRetail, setDataPrognosisRetail] = useState<any>({})
  const [dataPrognosisCorporate, setDataPrognosisCorporate] = useState<any>({})
  const [dataUpzPerMonth, setDataUpzPerMonth] = useState<any>({})
  const [dataRetailPerMonth, setDataRetailPerMonth] = useState<any>({})
  const [dataCorporatePerMonth, setDataCorporatePerMonth] = useState<any>({})
  const [dataDashboardOperator, setDataDashboardOperator] = useState<any>({})
  const [dataAdminPermonth, setDataAdminPermonth] = useState<any>([])
  const [dataAdminZakatMaal, setDataAdminZakatMaal] = useState<any>([])
  const [dataAdminFitrah, setDataAdminZakatFitrah] = useState<any>([])
  const [dataAdminInfaq, setDataAdminInfaq] = useState<any>([])
  const [dataAdminKurban, setDataAdminKurban] = useState<any>([])
  const [dataAdminOther, setDataAdminOther] = useState<any>([])
  const [dataAdminWakaf, setDataAdminWakaf] = useState<any>([])
  const [dataOperatorPerDay, setDataOperatorPerDay] = useState<any>([])
  const [dataOperatorZakatMaal, setDataOperatorZakatMaal] = useState<any>([])
  const [dataOperatorFitrah, setDataOperatorZakatFitrah] = useState<any>([])
  const [dataOperatorInfaq, setDataOperatorInfaq] = useState<any>([])
  const [dataOperatorKurban, setDataOperatorKurban] = useState<any>([])
  const [dataOperatorOther, setDataOperatorOther] = useState<any>([])
  const [dataOperatorWakaf, setDataOperatorWakaf] = useState<any>([])
  const [dataPrognosisPerMonth, setDataPrognosisPerMonth] = useState<any>({})
  const [dataTransactionPerMonth, setDataTransactionPerMonth] = useState<any>({})
  const [dataCompare, setDataCompare] = useState<any>({})
  const [dataZiswafPersent, setDataZiswafPersent] = useState<any>({})
  const [idVal, setIdVal] = useState<number>(0)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [labelDataSelect, setLabelDataSelect] = useState(null);
  const [labelSearch, setLabelSearch] = useState('');
  const [operatorData, setOperatorData] = useState([
    {
      name: 'Total Ziswaf Perday',
      total: 0,
      compareData: 0,
      data: [],
      color: '#2C39C2'
    },
  ])

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

  const adminPermonth = dataAdminPermonth.map(val => val.total)
  const operatorPerDay = dataOperatorPerDay.map(val => val.total)

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
  }, [dataAdminPermonth])

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
        setOperatorData(operator)
      }
    }
  }, [dataOperatorPerDay])

  useEffect(() => {
    if (role === 1) {
      getSchoolData("");
    }

  }, [filterParamAdmin]);

  useEffect(() => {
    if (role === 1) {
      onGetData();
      setState(prevState => ({
        ...prevState,
        selectedSeries: initialState.selectedSeries
      }))
    }
  }, [filterParamAdmin]);

  useEffect(() => {
    if (role === 2) {
      setState(prevState => ({
        ...prevState,
        setFilterParam: {
          ...prevState.setFilterParam,
          filter: {
            ...prevState.filter,
            school_id: idSchool,
            shchool_name: nameSchool,
          }
        },
        selectedSeries: state.selectedSeriesOperator
      }))
    }
    onGetDataDashboardOperator();
  }, [filterParam]);


  const onGetData = async () => {
    try {
      setState(prevState => ({
        ...prevState, loading: true
      }))

      const dashboardData = await dashboardAdminPresenter.getAll(filterParamAdmin);
      setData(dashboardData);
      setDataAdminPermonth(dashboardData.data?.dashboardAdmin?.ziswafTotalPermonth)
      setDataAdminZakatMaal(dashboardData.data?.dashboardAdmin?.zakatMaalPerMonth)
      setDataAdminZakatFitrah(dashboardData.data?.dashboardAdmin?.zakatFitrahPerMonth)
      setDataAdminInfaq(dashboardData.data?.dashboardAdmin?.infaqPerMonth)
      setDataAdminKurban(dashboardData.data?.dashboardAdmin?.kurbanPerMonth)
      setDataAdminOther(dashboardData.data?.dashboardAdmin?.otherPerMonth)
      setDataAdminWakaf(dashboardData.data?.dashboardAdmin?.wakafPerMonth)
      setDataDashboard(dashboardData.data?.dashboardAdmin)
      setDataCommonReport(dashboardData.data?.commonReport)
      setDataDivisionReport(dashboardData.data?.divisionReport)
      setDataNominalReport(dashboardData.data?.nominalReport)
      setDataPrognosisUpz(dashboardData.data?.prognosisUpz)
      setDataPrognosisRetail(dashboardData.data?.prognosisRetail)
      setDataPrognosisCorporate(dashboardData.data?.pronosisCorporate)
      setDataUpzPerMonth(dashboardData.data?.upzPerMonth)
      setDataRetailPerMonth(dashboardData.data?.retailPerMonth)
      setDataCorporatePerMonth(dashboardData.data?.corporatePerMonth)
      setDataTransactionPerMonth(dashboardData.data?.commonReport?.totalTransactionPerMonth)
      setDataPrognosisPerMonth(dashboardData.data?.commonReport?.totalPrognosisPerMonth)
      setDataCompare(dashboardData.data?.dashboardAdmin?.totalTransactionLastYear)
      setDataZiswafPersent(dashboardData.data?.commonReport?.totalZiswafPersent)
      setState(prevState => ({
        ...prevState, loading: false
      }))
    } catch (error) {
      setData([]);
      setDataAdminPermonth([])
      setDataAdminZakatMaal([])
      setDataAdminZakatFitrah([])
      setDataAdminInfaq([])
      setDataAdminKurban([])
      setDataAdminOther([])
      setDataAdminWakaf([])
      setDataDashboard([])
      setDataCommonReport([])
      setDataDivisionReport([])
      setDataNominalReport([])
      setDataPrognosisUpz([])
      setDataPrognosisRetail([])
      setDataPrognosisCorporate([])
      setDataUpzPerMonth([])
      setDataRetailPerMonth([])
      setDataCorporatePerMonth([])
      setDataTransactionPerMonth([])
      setDataPrognosisPerMonth([])
      setDataCompare([])
      setDataZiswafPersent([])
      setState(prevState => ({
        ...prevState, loading: false
      }))
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
    setState(prevState => ({
      ...prevState, loading: true
    }))
    const presenter = await container.resolve(DashboardOperatorPresenter);
    presenter.getAllData(filterParam)
      .then((res) => {
        setState(prevState => ({
          ...prevState, loading: false
        }))

        setDataOperatorPerDay(res.data?.totalZiswafPerDay)
        setDataDashboardOperator(res.data?.dashboardOperator)
        setDataOperatorZakatMaal(res.data?.zakatMaalPerDay)
        setDataOperatorZakatFitrah(res.data?.zakatFitrahPerDay)
        setDataOperatorInfaq(res.data?.infaqPerDay)
        setDataOperatorKurban(res.data?.kurbanPerDay)
        setDataOperatorOther(res.data?.otherPerDay)
        setDataOperatorWakaf(res.data?.wakafPerDay)
        setDataCommonReport(res.data?.commonReport)
        setDataDivisionReport(res.data?.divisionReport)
        setDataNominalReport(res.data?.nominalReport)
        setDataCompare(res.data?.dashboardOperator?.totalTransactionLastYear)
      })
      .catch((error) => {
        setState(prevState => ({
          ...prevState, loading: false
        }))
        setDataOperatorPerDay([])
        setDataDashboardOperator({})
        setDataOperatorZakatMaal([])
        setDataOperatorZakatFitrah([])
        setDataOperatorInfaq([])
        setDataOperatorKurban([])
        setDataOperatorOther([])
        setDataOperatorWakaf([])
        setDataCommonReport({})
        setDataDivisionReport({})
        setDataNominalReport({})
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
    const isThere = operatorData.filter(value => value.name === selected.name)
    if (isThere.length > 0) {
      const operator = operatorData.filter(value => value.name !== selected.name)
      setOperatorData(operator)
    }
    else {
      const temp = [...operatorData, selected]
      setOperatorData(temp)
    }
  }

  const dataPerMonthRetail = [
    {
      name: 'Data Per Month Retail',
      data: Object.values(dataRetailPerMonth),
    }
  ]

  const dataPerMonthUpz = [
    {
      name: 'Data Per Month UPZ',
      data: Object.values(dataUpzPerMonth),
    }
  ]

  const dataPerMonthCorporate = [
    {
      name: 'Data Per Month Corporate',
      data: Object.values(dataCorporatePerMonth),
    }
  ]


  const fetchingButton = (val: any) => {
    setIdVal(val)
  }

  const returnCategories = () => {
    switch (idVal) {
      case idVal:
        return dataOperatorZakatMaal.map((val, index) => index)
      default:
        return Object.keys(dataPrognosisCorporate)
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
  const categoriesPerDay = dataOperatorPerDay.map((val, i) => i)

  const series = [
    {
      name: 'Zakat Maal',
      total: role === 1 ? dataDashboard.totalZakatMaal : dataDashboardOperator.totalZakatMaal,
      compareData: role === 1 ? dataCommonReport.totalZiswafPersent && dataCommonReport.totalZiswafPersent.zakatMaalPersent : dataCommonReport.total_ziswaf_percent && dataCommonReport.total_ziswaf_percent.zakatMaalPersent,
      data: role === 1 ? dataAdminZakatMaal.map(val => val.total) : dataOperatorZakatMaal.map(val => val.total),
      color: "#3DB15B"
    },
    {
      name: 'Zakat Fitrah',
      total: role === 1 ? dataDashboard.totalZakatFitrah : dataDashboardOperator.totalZakatFitrah,
      compareData: role === 1 ? dataCommonReport.totalZiswafPersent && dataCommonReport.totalZiswafPersent.zakatFitrahPersent : dataCommonReport.total_ziswaf_percent && dataCommonReport.total_ziswaf_percent.zakatFitrahPersent,
      data: role === 1 ? dataAdminFitrah.map(val => val.total) : dataOperatorFitrah.map(val => val.total),
      color: "#FFB946"
    },
    {
      name: 'Infaq/Shadaqah',
      total: role === 1 ? dataDashboard.totalInfaq : dataDashboardOperator.totalInfaq,
      compareData: role === 1 ? dataCommonReport.totalZiswafPersent && dataCommonReport.totalZiswafPersent.infaqPersent : dataCommonReport.total_ziswaf_percent && dataCommonReport.total_ziswaf_percent.infaqPersent,
      data: role === 1 ? dataAdminInfaq.map(val => val.total) : dataOperatorInfaq.map(val => val.total),
      color: "#BFC94C"
    },
    {
      name: 'Wakaf',
      total: role === 1 ? dataDashboard.totalWakaf : dataDashboardOperator.totalWakaf,
      compareData: role === 1 ? dataCommonReport.totalZiswafPersent && dataCommonReport.totalZiswafPersent.waqafPersent : dataCommonReport.total_ziswaf_percent && dataCommonReport.total_ziswaf_percent.waqafPersent,
      data: role === 1 ? dataAdminWakaf.map(val => val.total) : dataOperatorWakaf.map(val => val.total),
      color: "#F7685B"
    },
    {
      name: 'Penerimaan lain',
      total: role === 1 ? dataDashboard.totalOther : dataDashboardOperator.totalOther,
      compareData: role === 1 ? dataCommonReport.totalZiswafPersent && dataCommonReport.totalZiswafPersent.otherPersent : dataCommonReport.total_ziswaf_percent && dataCommonReport.total_ziswaf_percent.otherPersent,
      data: role === 1 ? dataAdminOther.map(val => val.total) : dataOperatorOther.map(val => val.total),
      color: '#E546FF'
    },
    {
      name: 'Kurban',
      total: role === 1 ? dataDashboard.totalKurban : dataDashboardOperator.totalKurban,
      compareData: role === 1 ? dataCommonReport.totalZiswafPersent && dataCommonReport.totalZiswafPersent.qurbanPersent : dataCommonReport.total_ziswaf_percent && dataCommonReport.total_ziswaf_percent.qurbanPersent,
      data: role === 1 ? dataAdminKurban.map(val => val.total) : dataOperatorKurban.map(val => val.total),
      color: '#5BEEF7'
    },
  ]


  return (
    <DashboardProvider
      value={{
        getSchoolData,
        data,
        dataDashboard,
        dataCommonReport,
        dataDivisionReport,
        dataNominalReport,
        dataCorporatePerMonth,
        dataPrognosisCorporate,
        dataPrognosisRetail,
        dataPrognosisUpz,
        dataRetailPerMonth,
        dataUpzPerMonth,
        filterParam,
        filterParamAdmin,
        dataDashboardOperator,
        optionsUnit: state.optionsUnit,
        filterStartDate: state.filterStartDate,
        filterEndDate: state.filterEndDate,
        selectedSeries: state.selectedSeries,
        selectedColor: state.selectedColor,
        error: state.error,
        loading: state.loading,
        handleChange: _handleChange,
        handleClick: _handleClick,
        dataPerMonthRetail,
        dataPerMonthUpz,
        dataPerMonthCorporate,
        school,
        fetchingButton,
        dataOperatorZakatMaal,
        dataOperatorFitrah,
        dataOperatorInfaq,
        dataOperatorKurban,
        dataOperatorWakaf,
        dataOperatorOther,
        returnCategories,
        dataPrognosisPerMonth,
        dataTransactionPerMonth,
        dataCompare,
        dataZiswafPersent,
        dataAdminPermonth,
        dataAdminZakatMaal,
        dataAdminFitrah,
        dataAdminInfaq,
        dataAdminKurban,
        dataAdminOther,
        dataAdminWakaf,
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
        dataOperatorPerDay,
        setDataOperatorPerDay,
        selectedSeriesOperator: state.selectedSeriesOperator,
        handleClickOperator: _handleClickOperator,
        operatorData,
        setOperatorData
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