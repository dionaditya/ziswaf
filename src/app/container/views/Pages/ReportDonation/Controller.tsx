import React, { useState, useEffect } from 'react';
import { container } from 'tsyringe';
import { ReportDonationInterface } from './interface';
import ReportDonationDefaultState from './defaultState';
import { isEmpty } from 'lodash'
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter'
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter'
import { CategoryPresenter } from '@/app/infrastructures/Presenter/Category/Presenter'
import { DashboardAdminPresenter } from '@/app/infrastructures/Presenter/DashboardAdmin/Presenter';

export const ReportDonationContext = React.createContext<ReportDonationInterface>(ReportDonationDefaultState)
export const { Provider: ReportDonationProvider, Consumer: ReportDonationConsumer } = ReportDonationContext

const ReportDonationController = ({ children }) => {
    const [state, setState] = useState<ReportDonationInterface>(ReportDonationDefaultState)
    const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
    const cityPresenter: CityPresenter = container.resolve(CityPresenter)
    const categoryPresenter: CategoryPresenter = container.resolve(CategoryPresenter)
    const dashboardPresenter: DashboardAdminPresenter = container.resolve(DashboardAdminPresenter)

    const handleMultiSelectedFilter = (field, label, name) => {
        const parseName = parseInt(name, 10);
        const isThere = state[field].filter(val => {
            return val['name'] === parseName
        })

        if (label !== 'Semua') {
            if (isThere.length > 0) {
                const removeChecked = state[field].filter(item => {
                    return item['name'] !== parseName
                })
                setState(prevState => ({ ...prevState, [field]: removeChecked }))
            } else {
                setState(prevState => ({ ...prevState, [field]: state[field].concat([{ name: parseName, label: label }]) }))
            }
        } else {
            setState(prevState => ({ ...prevState, [field]: [] }))
        }
    }

    const handleSetState = (field, name, value) => {
        setState({
            ...state,
            [field]: {
                ...state[field],
                [name]: value
            }
        })
    }

    const handleFetchStatementDonation = async () => {
        try {
            setState(prevState => ({ ...prevState, isLoadingFetchReport: true }))
            const filterCategorystatement = state['categoryDonationSelected'].filter(item => item['name'] !== 0);
            const filterCity = state['citySelected'].filter(item => item['name'] !== 0);
            const unitSelected = state['unitSelected'].filter(item => item['name'] !== 0);
            const filterParam = {
                filter: {
                    school_id: unitSelected.map(item => item['name']).join(','),
                    start_date: state.dateSelected['start_date'],
                    end_date: state.dateSelected['end_date'],
                    regency: filterCity.map(item => item['name']).join(','),
                    division_id: state['categorySourceSelected'].map(item => item['name']).join(','),
                    statement_category: filterCategorystatement.map(item => item['name']).join(','),
                    category_id: state['donationTypeSelected'].map(item => item['name']).join(','),
                    donor_category: state['donaturSelected'].map(item => item['name']).join(','),
                    category_type: state['fundSourceSelected'].map(item => item['name']).join(','),
                },
            }
            const response = await dashboardPresenter.getReportStatementDonation(filterParam);
            setState(prevState  => ({...prevState, isLoadingFetchReport: false, statementReportTotal: response}))
        } catch(error) {
            setState(prevState  => ({...prevState, isLoadingFetchReport: false}))
        }
    }
    useEffect(() => {
        const getCityData = async () => {
            try {
                const filterParamUnit = {
                    paging: {
                        page: 1,
                        limit: 200,
                    },
                    filter: {
                        school: 1,
                        is_transaction: 1
                    },
                    sort: {
                        id: "ASC",
                    },
                }
             setState(prevState  => ({...prevState, cityDataLoading: true, isCityFetching: true}))
             const response: any = await cityPresenter.loadData(filterParamUnit);
             if(!isEmpty(response)) {    
                     const transformData = response.map(item => {
                         return {
                             name: item.id,
                             label: item.name
                         }
                     })
                     setState(prevState  => ({...prevState, cityDataLoading: false, isCityFetching: false, cityData: [{name: 0, label: "Semua"}].concat(transformData)}))
                     
             }
            } catch(error) {
                setState(prevState  => ({...prevState, cityDataLoading: false, isCityFetching: true}))
            }
        }
        getCityData()
    }, [state.unitSelected])

    useEffect(() => {
        const getUnitData = async () => {
            try {
                setState(prevState => ({ ...prevState, unitSelected: [] }))
                const getListSelectedRegency = state.citySelected;
                const regency = getListSelectedRegency.map(item => item['name']).join(',')
                const filterParamUnit = {
                    paging: {
                        page: 1,
                        limit: 500,
                    },
                    filter: {
                        is_transaction: 1,
                        regency: regency
                    },
                    sort: {
                        id: "ASC",
                    },
                }
            setState(prevState  => ({...prevState, unitDataLoading: true}))
             const response: any = await schoolPresenter.loadData(filterParamUnit);
             if(response.status === 200 || response.status === 201) {
                setState(prevState  => ({...prevState, unitDataLoading: false}))
                 const { data } = response
                 const responseData = data?.data;
                 if(!isEmpty(responseData)) {
                     const transformData = responseData.map(item => {
                         return {
                             name: item.id,
                             label: item.name
                         }
                     })
                    setState(prevState  => ({...prevState, unitData: [{name: 0, label: "Semua"}].concat(transformData)}))
                 } else {
                    setState(prevState  => ({...prevState, unitData: []}))
                 }
             }
            } catch(error) {
                setState(prevState  => ({...prevState, unitDataLoading: false}))
            }
        }
        getUnitData()
    }, [state.citySelected])

    useEffect(() => {
        const getStatment = async () => {
            try {
                const filterParam = {
                    filter: {
                        is_transaction: 1,
                    },
                    sort: {
                        id: "ASC",
                    },
                }
                setState(prevState => ({ ...prevState, categoryDonationDataLoading: true }))
                const response: any = await categoryPresenter.getStatement(filterParam)
                if (!isEmpty(response)) {
                    const transformData = response.map(item => {
                        return {
                            name: item.id,
                            label: item.statement_category
                        }
                    })
                    setState(prevState => ({ ...prevState, categoryDonationData: [{ name: 0, label: "Semua" }].concat(transformData) }));
                } else {
                    setState(prevState => ({ ...prevState, unitData: [{ name: 0, label: "Semua" }] }))
                }
                setState(prevState  => ({...prevState, categoryDonationDataLoading: false}))
            } catch(error) {
                setState(prevState  => ({...prevState, categoryDonationDataLoading: false}))
            }
        }
        getStatment()
    }, [state.citySelected, state.unitSelected])

    const handleClearFilter = () => {
        setState(prevState => ({
            ...prevState,
            unitSelected: [],
            citySelected: [],
            dateSelected: ReportDonationDefaultState.dateSelected,
            fundSourceSelected: [],
            categorySourceSelected: [],
            donaturSelected: [],
            categoryDonationSelected: [],
            donationTypeSelected: []
        }))
    }

    const handleCreateReport = () => {
        handleFetchStatementDonation()
        setState(prevState => ({
            ...prevState,
            reportStep: 'viewReport',
        }))
    }

    const handleModalFilter = (status) => {
        setState(prevState => ({
            ...prevState,
            modalFilter: status,
        }))
    }

    return (
        <ReportDonationProvider value={{ ...state, handleModalFilter: handleModalFilter, handleMultiSelectedFilter: handleMultiSelectedFilter, handleSetState: handleSetState, handleClearFilter: handleClearFilter, handleCreateReport: handleCreateReport }}>
            {children}
        </ReportDonationProvider>
    )
}

export default ReportDonationController;