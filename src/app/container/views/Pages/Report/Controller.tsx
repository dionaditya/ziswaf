import React, { useState, useEffect, useMemo } from 'react'
import { container } from 'tsyringe';
import { DashboardAdminPresenter } from '@/app/infrastructures/Presenter/DashboardAdmin/Presenter';
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter';
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter';
import { DashboardOperatorPresenter } from '@/app/infrastructures/Presenter/DashboardOperator/Presenter';
import { useDebounce } from 'use-lodash-debounce';
import { IState } from './interface';
import initialState from './defaultState';
import { isEmpty } from 'lodash'
import moment from 'moment'
import { createContainer } from 'react-tracked' 

interface IpagingParams {
  page: number,
  limit: number
}


// const defaultStartDate = moment().startOf('year').format('ll')



export const ReportContext = React.createContext<IState>(initialState);
export const { Provider: ReportProvider } = ReportContext;

const {
  Provider,
  useTracked,
} = createContainer(() => useState(initialState));

export const ReportController = ({ children }) => {
  const [state, setState] = useTracked()
  const [loading, setLoading] = useState<boolean>(false)
  const [dashboardData, setDashboardData] = useState<any>({})
  const [generalReport, setGeneralReport] = useState<any>({})
  const [divisionReport, setDivisionReport] = useState<any>({})
  const [cashAndGoodsReport, setCashAndGoodsReport] = useState<any>({})
  const [tableCommonReport, setTableCommonReport] = useState<any>({})
  const [tablePermonthReport, setTablePermonthReport] = useState<any>({})
  const [totalZiswafPercent, setTotalZiswafPercent] = useState<any>({})
  const [upzPermonth, setUpzPermonth] = useState<any>({})
  const [retailPermonth, setRetailPermonth] = useState<any>({})
  const [corporatePermonth, setCorporatePermonth] = useState<any>({})
  const [prognosisUpz, setPrognosisUpz] = useState<any>({})
  const [PrognosisRetail, setPrognosisRetail] = useState<any>({})
  const [prognosisCorporate, setPrognosisCorporate] = useState<any>({})
  const [divPercent, setDivisionPercent] = useState<any>({})
  const [modal, setModal] = useState<boolean>(false)
  const [message, setMessage] = useState<any>('')
  const [regency, setRegency] = useState<any>([])
  const [unit, setUnit] = useState<any>([])
  const [labelSearch, setLabelSearch] = useState('')
  const [labelSearchRegency, setLabelSearchRegency] = useState('')

  const debouncedSearchTerm = useDebounce(regency, 500)
  const debouncedSearchSchool = useDebounce(unit, 500)

  //Filter 

  const [filterParam, setFilterParam] = useState<any>(initialState.filterParam)
  const [filterRegency, setFilterRegency] = useState<any>(initialState.filterRegency)
  const [filterSchool, setFilterSchool] = useState<any>(initialState.filterSchool)
  const [filterParamOperator, setFilterParamOperator] = useState<any>(initialState.filterParamOperator)
  const [filterParamAdmin, setFilterParamAdmin] = useState<any>(initialState.filterParamAdmin)

  // Operator

  const [operatorData, setDataOperator] = useState<any>({})
  const [generalReportOperator, setGeneralReportOperator] = useState<any>({})
  const [divisionReportOperator, setDivisionReportOperator] = useState<any>({})
  const [cashAndGoodsReportOperator, setCashAndGoodsReportOperator] = useState<any>({})
  const [totalZiswafPercentOperator, setZiswafPercentOperator] = useState<any>({})
  const [tableUpzOp, setTabelUpzOperatorPerDay] = useState<any>({})
  const [tableRetailOp, setTabelRetailOperatorPerDay] = useState<any>({})
  const [tableCoprOp, setTabelCorpOperatorPerDay] = useState<any>({})

  // PRESENTER

  const reportPresenter: DashboardAdminPresenter = container.resolve(DashboardAdminPresenter)
  const regencyPresenter: CityPresenter = container.resolve(CityPresenter)
  const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
  const operatorPresenter: DashboardOperatorPresenter = container.resolve(DashboardOperatorPresenter)

  //DESTRUCTURING 
  const dateNow = new Date()
  dateNow.setDate(dateNow.getDate() + 30)
  const { role } = getUserInfo()

  const filterDataRegency = regency && regency.length > 0 ? regency.map((val, i) =>
    ({
      value: val.id,
      label: val.name
    })) : []

  const filterDataSchool = unit && unit.length > 0 ? unit.map((val, i) => ({
    value: val.id,
    label: val.name
  })) : []
  // UseEffect Only
  useEffect(() => {
    if (role === 2) {
      fetchReportData()
    }
  }, []);

  // Handler Only
  const fetchReportData = async () => {
    const { school: school_name, role } = getUserInfo()
    const idSchool = school_name?.id;
    const nameSchool = school_name?.name;

    const regencySelected = role === 1 ? state.filterData.citySelected.map(item => item['name']).join(',') : '';
    const schoolSelected = role === 1 ? state.filterData.unitSelected.map(item => item['name']).join(',') : idSchool;
    const filterParam = {
      filter: {
        school_id: schoolSelected,
        start_date: state.filterData.dateSelected.start_date,
        end_date: state.filterData.dateSelected.end_date,
        regency: regencySelected,
      },
    }

    console.log('start_date:', moment(state.filterData.dateSelected.start_date).toISOString())

    if (role === 1) {
      try {
        setLoading(true)
        const res = await reportPresenter.getAll(filterParam)
        setGeneralReport(res.data?.commonReport)
        setDivisionReport(res.data?.divisionReport)
        setCashAndGoodsReport(res.data?.nominalReport)
        setTableCommonReport(res.data?.commonReport?.totalPrognosisPerMonth)
        setTablePermonthReport(res.data?.commonReport?.totalTransactionPerMonth)
        setTotalZiswafPercent(res.data?.commonReport?.totalZiswafPersent)
        setUpzPermonth(res.data?.upzPerMonth)
        setRetailPermonth(res.data?.retailPerMonth)
        setCorporatePermonth(res.data?.corporatePerMonth)
        setPrognosisUpz(res.data?.prognosisUpz)
        setPrognosisRetail(res.data?.prognosisRetail)
        setPrognosisCorporate(res.data?.pronosisCorporate)
        setDashboardData(res.data?.dashboardAdmin)
        setDivisionPercent(res.data?.commonReport?.totalDivisionPercentage)
        setLoading(false)
        setReportType('general')
      } catch (error) {
        setLoading(false)
        setMessage(error)
      }
    }
    if (role === 2) {
      try {
        setLoading(true)
        const resOperator = await operatorPresenter.getAllData(filterParamOperator)
        setDataOperator(resOperator)
        setGeneralReportOperator(resOperator.data?.commonReport)
        setDivisionReportOperator(resOperator.data?.divisionReport)
        setCashAndGoodsReportOperator(resOperator.data?.nominalReport)
        setZiswafPercentOperator(resOperator.data?.commonReport?.total_ziswaf_percent)
        setTabelUpzOperatorPerDay(resOperator.data?.divisionReport?.total_upz_per_dayDivision)
        setTabelRetailOperatorPerDay(resOperator.data?.divisionReport?.total_retail_per_dayDivision)
        setTabelCorpOperatorPerDay(resOperator.data?.divisionReport?.total_corporate_per_day)
        setLoading(false)
      } catch (error) {
        setMessage(error)
      }
    }
  }

  const { school: school_name, } = getUserInfo()
  const idSchool = school_name?.id;
  const nameSchool = school_name?.name;

  const getSchoolData = async (val) => {
    setState(prevState => ({
      ...prevState,
      filterData: {
        ...prevState.filterData,
        unitDataLoading: true
      }
    }))
    const filterSchool = {
      paging: {
        page: 1,
        limit: 9999,
      },
      search: val
    }

    try {
      const response = await schoolPresenter.loadData(filterSchool)

      if (response.status === 200 || response.status === 201) {
        setState(prevState => ({ ...prevState, unitDataLoading: false }))
        const { data } = response
        const responseData = data?.data;
        if (!isEmpty(responseData)) {
          const transformData = responseData.map(item => {
            return {
              name: item.id,
              label: item.name
            }
          })

          setState(prevState => ({
            ...prevState,
            filterData: {
              ...prevState.filterData,
              unitData: transformData,
              unitDataLoading: false
            }
          }))

        } else {
          setState(prevState => ({
            ...prevState,
            filterData: {
              ...prevState.filterData,
              unitData: [],
              unitDataLoading: false
            }
          }))
        }
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        filterData: {
          ...prevState.filterData,
          unitDataLoading: false
        }
      }))
      console.log("Error", error)
    }
  }

  const getRegencyData = async (val) => {
    setState(prevState => ({
      ...prevState,
      filterData: {
        ...prevState.filterData,
        cityDataLoading: true
      }
    }))
    const filterParamCity = {
      paging: {
        page: 1,
        limit: 500,
      },
      filter: {
        school: 1
      },
      sort: {
        id: "ASC",
      },
    }

    try {
      const response = await regencyPresenter.loadData(filterParamCity)
      if (!isEmpty(response)) {
        const transformData = response.map(item => {
          return {
            name: item.id,
            label: item.name
          }
        })

        setState(prevState => ({
          ...prevState,
          filterData: {
            ...prevState.filterData,
            cityData: [{ name: 0, label: "Semua" }].concat(transformData),
            cityDataLoading: false
          }
        }))
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        filterData: {
          ...prevState.filterData,
          cityDataLoading: false
        }
      }))
      console.log("Error", error)
    }
  }

  useEffect(() => {
    getSchoolData("")
  }, [])

  useEffect(() => {
    getRegencyData("")
  }, [])

  const setSchoolData = options => {
    const { value, label } = options
    setState(prevState => ({
      ...prevState,
      filterSchool: {
        ...prevState.filterSchool,
        search: label,
      }
    }))
  }

  const setValueData = options => {
    const { value, label } = options
    setState(prevState => ({
      ...prevState,
      filterRegency: {
        ...prevState.filterRegency,
        search: label
      }
    }))
  }

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

  };


  const _handleClick = (e, selected) => {
    const isThere = state.selectedSeries.filter(value => value.name === selected.name)

    if (isThere.length > 0) {
      setState({
        ...state,
        selectedSeries: state.selectedSeries.filter(value => value.name !== selected.name)
      })
    } else {
      setState({
        ...state,
        selectedSeries: [...state.selectedSeries, selected]
      })
    }
  }

  const setReportType = (type) => {
    setState(prevState => ({
      ...prevState,
      reportType: type
    }))
  }

  const handleClearFilter = () => {
    setState(prevState => ({
      ...prevState,
      filterData: {
        ...prevState.filterData,
        unitSelected: [],
        citySelected: [],
        dateSelected: initialState.filterData.dateSelected,
      },
    }))
    setMessage('')
  }

  const handleSetFilter = (field, value) => {
    setState(prevState => ({
      ...prevState,
      filterData: {
        ...prevState.filterData,
        [field]: value
      }
    }))
  }


  const handleExportPdf = async () => {
    const { school: school_name, role } = getUserInfo()
    const idSchool = school_name?.id;
    const nameSchool = school_name?.name;
    const startDate = moment(state.filterData.dateSelected.start_date).toISOString()
    const endDate = moment(state.filterData.dateSelected.end_date).toISOString()

    const regencySelected = role === 1 ? state.filterData.citySelected.map(item => item['name']).join(',') : '';
    const schoolSelected = role === 1 ? state.filterData.unitSelected.map(item => item['name']).join(',') : idSchool;

    const pdfRef =
      process.env.REACT_APP_API_KEY +
      '/transaction/export-pdf?filter[regency]=' +
      regencySelected + '&filter[school_id]=' + schoolSelected +
      '&filter[start_date]=' + startDate +
      '&filter[end_date]=' + endDate

    window.open(pdfRef, '_blank')
  }

 return (
    <ReportProvider
      value={{
        ...state,
        handleClearFilter: handleClearFilter,
        handleSetFilter: handleSetFilter,
        reportType: state.reportType,
        setReportType: setReportType,
        fetchReportData: fetchReportData,
        optionsUnit: state.optionsUnit,
        filterStartDate: state.filterStartDate,
        filterEndDate: state.filterEndDate,
        selectedSeries: state.selectedSeries,
        data: [],
        error: state.error,
        loading: loading,
        summary: state.summary,
        handleChange: _handleChange,
        handleClick: _handleClick,
        filterParam,
        generalReport,
        divisionReport,
        cashAndGoodsReport,
        tableCommonReport,
        tablePermonthReport,
        totalZiswafPercent,
        upzPermonth,
        retailPermonth,
        corporatePermonth,
        prognosisUpz,
        PrognosisRetail,
        prognosisCorporate,
        setFilterParam,
        idSchool,
        dateNow,
        role,
        modal,
        setModal,
        filterRegency,
        setValueData,
        regency,
        setFilterRegency,
        filterSchool,
        setUnit,
        unit,
        setSchoolData,
        filterParamOperator,
        getRegencyData,
        filterDataRegency,
        getSchoolData,
        setFilterSchool,
        filterDataSchool,
        filterParamAdmin,
        setFilterParamAdmin,
        operatorData,
        setDataOperator,
        generalReportOperator,
        divisionReportOperator,
        cashAndGoodsReportOperator,
        totalZiswafPercentOperator,
        setZiswafPercentOperator,
        tableUpzOp,
        tableRetailOp,
        tableCoprOp,
        dashboardData,
        divPercent,
        labelSearch,
        labelSearchRegency,
        setLabelSearchRegency,
        setLabelSearch,
        message,
        setMessage,
        handleExportPdf
      }}>
      {children}
    </ReportProvider>
  )
  
}

export const AppProvider = ({children}) => {
    return(
      <Provider>
         <ReportController>
             {children}
         </ReportController>
      </Provider>
      )
}