import React, { useState, useContext } from 'react'
import { container } from 'tsyringe'
import { DonorPresenter } from '@/app/infrastructures/Presenter/Donor/Presenter'
import { DonationPresenter } from '@/app/infrastructures/Presenter/Donation/Presenter'
import { CreateDonorApiRequest } from '@/data/payload/api/DonorApiRequest'
import { ProvincePresenter } from '@/app/infrastructures/Presenter/Province/Presenter'
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter'
import { EmployeePresenter } from '@/app/infrastructures/Presenter/Employee/Presenter'
import { useDebounce } from 'use-lodash-debounce'
import { DonorDetails } from '@/domain/entities/Donor'
import { CategoryPresenter } from '@/app/infrastructures/Presenter/Category/Presenter'
import _ from 'lodash'
import { CreateDonationApiRequest } from '@/data/payload/api/DonationApiRequest'
import { AppContext } from '@/App'
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies'
import qs from 'qs'
import moment from 'moment'

export interface Cash {
    type_id: any;
    category_id: any;
    value: number;
    ref_number: string;
}

export interface Goods {
    category_id: number;
    description: string;
    quantity: number;
    value: number;
    status: number;
}

export interface Donation {
    donor_id: number;
    division_id: number;
    category_id: number;
    statement_category_id: number;
    description: string;
    donation_item: number;
    employee_id: number;
    cash: Cash;
    kwitansi: string;
    created_at: string;
    goods: Goods;
}
interface IState {
    setState: Function,
    postData: Function;
    DonaturInfo: any;
    handleInput: Function,
    province: any,
    regency: any,
    search: string,
    data: any,
    donatur: any,
    selectedDonatur: any,
    optionsDonatur: any,
    DonationInfo: Donation,
    category: any,
    transaction: any,
    handleSearchDonatur: Function,
    handleSelectedDonatur: Function,
    handlePostDonation: Function,
    handleInputDonation: Function,
    subCategory: any,
    handleTypeDonation: Function,
    showTypeDonation: Number,
    handleCashInput: Function,
    handleGoodsInput: Function,
    employeeQuery: string,
    handleEmployeeQuery: Function,
    employeeOptions: Array<object>
    employee: any,
    selectedEmployee: any
    handleSelectedEmployee: Function
    handleSubmit: Function
    selected: boolean
    handleExportPdf: Function
    postUpdateData: Function
    setSelected: Function
}

const initialState: IState = {
    DonaturInfo: {
        name: '',
        company_name: '',
        is_company: false,
        position: '',
        email: '',
        address: '',
        phone: '',
        status: '',
        npwp: '',
        pos_code: '',
        info: '',
        province_id: '',
        regency_id: '',
    },
    DonationInfo: {
        donor_id: 0,
        division_id: 1,
        category_id: 0,
        statement_category_id: 0,
        description: '',
        donation_item: 1,
        employee_id: 0,
        kwitansi: '',
        created_at: '',
        cash: {
            type_id: '',
            category_id: '',
            value: 0,
            ref_number: '',
        },
        goods: {
            category_id: 0,
            description: '',
            quantity: 0,
            value: 0,
            status: 0,
        }
    },
    transaction: {},
    showTypeDonation: 0,
    province: [],
    regency: [],
    search: '',
    donatur: [],
    optionsDonatur: [],
    selectedDonatur: {},
    subCategory: [],
    data: [],
    category: [],
    setState: () => { },
    postData: () => { },
    handleInput: () => { },
    handleSearchDonatur: () => { },
    handleSelectedDonatur: () => { },
    handlePostDonation: () => { },
    handleInputDonation: () => { },
    handleTypeDonation: () => { },
    handleCashInput: () => { },
    handleGoodsInput: () => { },
    employeeQuery: '',
    handleEmployeeQuery: () => { },
    employeeOptions: [],
    employee: [],
    handleSelectedEmployee: () => { },
    selectedEmployee: {},
    handleSubmit: () => { },
    selected: false,
    handleExportPdf: () => { },
    postUpdateData: () => { },
    setSelected: () =>  {}
}

export const CorporateContext = React.createContext<IState>(initialState)
export const { Provider: CorporateProvider, Consumer: CorporateConsumer } = CorporateContext

export const CorporateController = ({ children }) => {
    const [state, setState] = useState<IState>(initialState)
    const [index, setIndex] = useState(0)
    const [category, setCategory] = useState<any>([{}])
    const [employeeOptions, setEmployeOptions] = useState<any>([{}])
    const [selectedEmployee, setSelectedEmployee] = useState<any>({})
    const [employee, setEmployee] = useState<any>([{}])
    const [selected, setSelected] = useState(false)
    const debouncedValue = useDebounce(state.search, 100)
    const searchEmployeeDebounced = useDebounce(state.employeeQuery, 200)
    const corporatePresenter: DonorPresenter = container.resolve(DonorPresenter)
    const donationPresenter: DonationPresenter = container.resolve(DonationPresenter)
    const provincePresenter: ProvincePresenter = container.resolve(ProvincePresenter)
    const cityPresenter: CityPresenter = container.resolve(CityPresenter)
    const categoryPresenter: CategoryPresenter = container.resolve(CategoryPresenter)
    const employeePresenter: EmployeePresenter = container.resolve(EmployeePresenter)
    const { user_id, role, school } = getUserInfo()
    const history = useHistory()
    const donationParams: any = useParams()
    const { transaction_id } = useParams()
    let isReceipt: any = useRouteMatch({
        path: '/dashboard/upz-tanda-terima/:transaction_id',
        strict: false,
        sensitive: true
    })

    let isDonation: any = useRouteMatch({
        path: '/dashboard/upz-transaction/:donor_id',
        strict: false,
        sensitive: true
    })

    let isDonor: any = useRouteMatch({
        path: '/dashboard/upz/donor',
        strict: false,
        sensitive: true
    })

    function useQuery() {
        const location = useLocation()
        return qs.parse(location.search)
    }

    let query = useQuery();

    React.useEffect(() => {
        if (isReceipt && isReceipt.path === '/dashboard/upz-tanda-terima/:transaction_id') {
            (async () => {
                const donationDetail: any = await donationPresenter.getById(_.toNumber(transaction_id))
                const employee: any = await employeePresenter.loadDataDetail(_.toNumber(query['?employee_id']))

                setState(prevState => ({
                    ...prevState,
                    transaction: {
                        ...donationDetail,
                        employeeName: employee.data.data.name
                    },
                }))
            })()
        }

        if (isDonation && isDonation.path === '/dashboard/upz-transaction/:donor_id') {
            (async () => {
                setState(prevState => ({
                    ...prevState,
                    DonationInfo: {
                        ...state.DonationInfo,
                        donor_id: _.toNumber(donationParams.donor_id),
                        employee_id: _.toNumber(query.employee_id),
                        kwitansi: query.kwitansi,
                        created_at: query.tanggal
                    }
                }))
            })()
        }

        if (isDonor && isDonor.path === '/dashboard/upz/donor') {
            (async () => {
                if (query[`?is_company`] === 'false') {
                    setState(prevState => ({
                        ...prevState,
                        DonaturInfo: {
                            ...prevState.DonaturInfo,
                            is_company: false
                        },
                        DonationInfo: {
                            ...prevState.DonationInfo,
                            employee_id: _.toNumber(query.employee_id),
                            kwitansi: query.kwitansi,
                            created_at: query.tanggal
                        }
                    }))
                } else {
                    setState(prevState => ({
                        ...prevState,
                        DonaturInfo: {
                            ...prevState.DonaturInfo,
                            is_company: true
                        },
                        DonationInfo: {
                            ...prevState.DonationInfo,
                            employee_id: query.employee_id,
                            kwitansi: query.kwitansi,
                            created_at: query.tanggal
                        }
                    }))
                }
            })()
        }

        (async () => {
            const listProvince = await provincePresenter.loadData()
            setState(_prevState => ({
                ..._prevState,
                province: listProvince
            }))
        })();
        (async () => {
            const categoryList = role !== 2 ? await categoryPresenter.getAll() : await categoryPresenter.getAllOperator()
            setCategory(_prevState => categoryList)
        })();

    }, [])

    React.useEffect(() => {
        if (debouncedValue !== '') {
            (async () => {
                if (state.DonaturInfo.is_company === true) {
                    const donaturQueryResult = await corporatePresenter.getAll({ search: debouncedValue, filter: {donor_category: 1} })
                    if (donaturQueryResult !== null) {
                        const transformedDonaturQuery = donaturQueryResult.map(val => {
                            return {
                                value: val.company_name,
                                key: val.id
                            }
                        })
                        setState(prevState =>
                            ({
                                ...prevState,
                                optionsDonatur: transformedDonaturQuery,
                                donatur: donaturQueryResult
                            }))
                    }
                } else {
                    const donaturQueryResult = await corporatePresenter.getAll({ search: debouncedValue, filter: {donor_category: 0} })
                    if (donaturQueryResult !== null) {
                        const transformedDonaturQuery = donaturQueryResult.map(val => {
                            return {
                                value: val.company_name,
                                key: val.id
                            }
                        })
                        setState(prevState =>
                            ({
                                ...prevState,
                                optionsDonatur: transformedDonaturQuery,
                                donatur: donaturQueryResult
                            }))
                    }
                }
            })()

        }
    }, [debouncedValue])



    React.useEffect(() => {
        if (searchEmployeeDebounced !== '') {
            (async () => {

                const optionsEmployee = await employeePresenter.loadData({ search: searchEmployeeDebounced })
                if (_.isNil(optionsEmployee.data.data) === false && optionsEmployee.data.data !== null) {
                    const transformData = optionsEmployee.data.data.map(res => {
                        return {
                            value: res.name,
                            key: res.id
                        }
                    })
                    setEmployeOptions(transformData)
                    setEmployee(optionsEmployee.data.data)
                }
            })()
        }
    }, [searchEmployeeDebounced])

    const postData = async () => {
       if (state.DonaturInfo.is_company) {
                const res = await corporatePresenter.store(new CreateDonorApiRequest(
                    state.DonaturInfo.name,
                    state.DonaturInfo.company_name,
                    state.DonaturInfo.is_company,
                    state.DonaturInfo.position,
                    state.DonaturInfo.email,
                    state.DonaturInfo.address,
                    state.DonaturInfo.phone,
                    Number(state.DonaturInfo.status),
                    Number(state.DonaturInfo.npwp),
                    Number(state.DonaturInfo.posCode),
                    state.DonaturInfo.info,
                    Number(state.DonaturInfo.province_id),
                    Number(state.DonaturInfo.regency_id),
                ))
                setState(_prevState => ({
                    ..._prevState,
                    DonationInfo: {
                        ..._prevState.DonationInfo,
                        donor_id: res.id
                    }
                }))

                return res
            } else {
                const res = await corporatePresenter.store(new CreateDonorApiRequest(
                    state.DonaturInfo.name,
                    state.DonaturInfo.company_name,
                    state.DonaturInfo.is_company,
                    state.DonaturInfo.position,
                    state.DonaturInfo.email,
                    state.DonaturInfo.address,
                    state.DonaturInfo.phone,
                    Number(state.DonaturInfo.status),
                    Number(state.DonaturInfo.npwp),
                    Number(state.DonaturInfo.posCode),
                    state.DonaturInfo.info,
                    Number(state.DonaturInfo.province_id),
                    Number(state.DonaturInfo.regency_id),
                ))
                setState(_prevState => ({
                    ..._prevState,
                    DonationInfo: {
                        ..._prevState.DonationInfo,
                        donor_id: res.id
                    }
                }))

                return res
            }
    }

    const postUpdateData = async () => {
        try {
            if (state.DonaturInfo.is_company) {
                const res = await corporatePresenter.storeNewData(new CreateDonorApiRequest(
                    state.DonaturInfo.name,
                    state.DonaturInfo.company_name,
                    false,
                    state.DonaturInfo.position,
                    state.DonaturInfo.email,
                    state.DonaturInfo.address,
                    state.DonaturInfo.phone,
                    Number(state.DonaturInfo.status),
                    Number(state.DonaturInfo.npwp),
                    Number(state.DonaturInfo.posCode),
                    state.DonaturInfo.info,
                    Number(state.DonaturInfo.province_id),
                    Number(state.DonaturInfo.regency_id),
                ))
                setState(_prevState => ({
                    ..._prevState,
                    DonationInfo: {
                        ..._prevState.DonationInfo,
                        donor_id: res.id
                    }
                }))

                if (res) {
                    return res
                } else {
                    return false
                }
            } else {
                const res = await corporatePresenter.storeNewData(new CreateDonorApiRequest(
                    state.DonaturInfo.name,
                    state.DonaturInfo.company_name,
                    true,
                    state.DonaturInfo.position,
                    state.DonaturInfo.email,
                    state.DonaturInfo.address,
                    state.DonaturInfo.phone,
                    Number(state.DonaturInfo.status),
                    Number(state.DonaturInfo.npwp),
                    Number(state.DonaturInfo.posCode),
                    state.DonaturInfo.info,
                    Number(state.DonaturInfo.province_id),
                    Number(state.DonaturInfo.regency_id),
                ))
                setState(_prevState => ({
                    ..._prevState,
                    DonationInfo: {
                        ..._prevState.DonationInfo,
                        donor_id: res.id
                    }
                }))

                if (res) {
                    return res
                } else {
                    return false
                }
            }

        } catch (error) {
            alert(error)
            return false
        }
    }

    const handlePostDonation = async (e) => {
        try {
            e.preventDefault()
            if(state.DonationInfo.donation_item === 1) {
                  const postDontation = await donationPresenter.store(new CreateDonationApiRequest(
                state.DonationInfo.donor_id,
                state.DonationInfo.division_id,
                state.DonationInfo.category_id,
                state.DonationInfo.statement_category_id,
                state.DonationInfo.description,
                state.DonationInfo.donation_item,
                state.DonationInfo.employee_id,
                state.DonationInfo.cash,
                null
            ))
            const transactionDetail = await donationPresenter.getById(postDontation.id)
            setState(prevState => ({
                ...prevState,
                transaction: transactionDetail
            }))
            return ['success', transactionDetail]
            } else {
                  const postDontation = await donationPresenter.store(new CreateDonationApiRequest(
                state.DonationInfo.donor_id,
                state.DonationInfo.division_id,
                state.DonationInfo.category_id,
                state.DonationInfo.statement_category_id,
                state.DonationInfo.description,
                state.DonationInfo.donation_item,
                state.DonationInfo.employee_id,
                null,
                state.DonationInfo.goods
            ))
            const transactionDetail = await donationPresenter.getById(postDontation.id)
            setState(prevState => ({
                ...prevState,
                transaction: transactionDetail
            }))
            return ['success', transactionDetail]
            }
               
        } catch (e) {
            return ['error', e]
        }

    }

    const handleInput = async (e) => {
        const value = e.target.value
        const name = e.target.name
        if (e.target.name === 'province_id') {
            setState(_prevState => (
                {
                    ..._prevState,
                    DonaturInfo: {
                        ..._prevState.DonaturInfo,
                        province_id: value
                    },
                }
            ))

            const city = await cityPresenter.loadData({
                filter: {
                    province_id: value
                }
            })

            setState(_prevState => (
                {
                    ..._prevState,
                    regency: city
                }
            ))


        } else {
            setState(_prevState =>
                ({
                    ..._prevState,
                    DonaturInfo: {
                        ..._prevState.DonaturInfo,
                        [name]: value
                    }
                })
            )
        }
    }

    const handleInputDonation = (e) => {
        const name = e.target.name
        const value = e.target.value
       if (e.target.name === 'category_id') {
            const selectCategory = category.filter(val => val.id === e.target.value)
            setState(prevState => ({
                ...prevState,
                subCategory: selectCategory[0].subCategories,
                DonationInfo: {
                    ...prevState.DonationInfo,
                    [name]: value
                }
            }))
        } else if (e.target.name === 'donation_item') {
            setState(_prevState => ({
                ..._prevState,
                DonationInfo: {
                    ..._prevState.DonationInfo,
                    donation_item: _.toNumber(e.target.value)
                }
            }))
        } else {
            setState(prevState => ({
                ...prevState,
                DonationInfo: {
                    ...prevState.DonationInfo,
                    [name]: value
                }
            }))
        }
    }

    const handleSearchDonatur = async (e) => {
        setState(_prevState => ({
            ..._prevState,
            search: e
        }))
    }

    const handleEmployeeQuery = async (query) => {
        setState(_prevState => ({
            ..._prevState,
            employeeQuery: query
        }))
    }


    const handleSelectedDonatur = async (e) => {
        const SelectedDonatur = state.donatur.filter(val => val.id === e.key)
        const provinceId = state.province.filter(val => val.name === SelectedDonatur[0].province_id)

        const city = await cityPresenter.loadData({
            filter: {
                province_id: provinceId[0].id
            }
        })

        const regencyId = city.filter(val => val.name === SelectedDonatur[0].regency_id)
        if (SelectedDonatur.length > 0 || SelectedDonatur !== null) {
            setState(_prevState => ({
                ..._prevState,
                DonaturInfo: {
                    ..._prevState.DonaturInfo,
                    ...SelectedDonatur[0],
                    province_id: provinceId[0].id,
                    regency_id: regencyId[0].id

                },
                DonationInfo: {
                    ..._prevState.DonationInfo,
                    donor_id: SelectedDonatur[0].id
                },
                regency: city
            }))
            setSelected(true)
        } else {
            return null
        }
    }

    const handleCashInput = (e) => {
        const name = e.target.name
        const value = e.target.value
       if (e.target.name === 'value') {
            setState(prevState => ({
                ...prevState,
                DonationInfo: {
                    ...prevState.DonationInfo,
                    cash: {
                        ...prevState.DonationInfo.cash,
                        [name]: _.toNumber(value)
                    }

                }
            }))
        } else if(e.target.name === 'type_id') {
            if(e.target.value === 0) {
                setState(_prevState => ({
                ..._prevState,
                DonationInfo: {
                    ..._prevState.DonationInfo,
                    cash: {
                        ..._prevState.DonationInfo.cash,
                        category_id: 1,
                        [name]: value
                    }
                }
            }))
            } else {
                setState(_prevState => ({
                ..._prevState,
                DonationInfo: {
                    ..._prevState.DonationInfo,
                    cash: {
                        ..._prevState.DonationInfo.cash,
                        [name]: value
                    }
                }
            }))
            }

        } else  {
            setState(_prevState => ({
                ..._prevState,
                DonationInfo: {
                    ..._prevState.DonationInfo,
                    cash: {
                        ..._prevState.DonationInfo.cash,
                        [name]: value
                    }
                }
            }))
        }
    }

    const handleGoodsInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (e.target.name === 'value' || e.target.name === 'quantity') {
            setState(prevState => ({
                ...prevState,
                DonationInfo: {
                    ...prevState.DonationInfo,
                    goods: {
                        ...prevState.DonationInfo.goods,
                        [name]: _.toNumber(value)
                    }

                }
            }))
        } else {
            setState(_prevState => ({
                ..._prevState,
                DonationInfo: {
                    ..._prevState.DonationInfo,
                    goods: {
                        ..._prevState.DonationInfo.goods,
                        [name]: value
                    }
                }
            }))
        }
    }

    const handleSelectedEmployee = (e) => {
        const selectedEmployee = employee.filter(val => val.id === e.key)
        if (selectedEmployee.length > 0) {
            setSelectedEmployee(selectedEmployee[0])
            setState(prevState => ({
                ...prevState,
                DonationInfo: {
                    ...prevState.DonationInfo,
                    employee_id: selectedEmployee[0].id
                }
            }))
        } else {
            return null
        }
    }

    const handleSubmit = (data, showComponent) => {
        const receipt_date = moment(data.receipt_date).format('DD-MM-YYYY')
        if (showComponent === 0) {
            history.push(`/dashboard/upz/donor?is_company=${false}&kwitansi=${data.kwitansi}&tanggal=${receipt_date}&employee_id=${selectedEmployee.id}`)
        } else {
            history.push(`/dashboard/upz/donor?is_company=${true}&kwitansi=${data.kwitansi}&tanggal=${receipt_date}&employee_id=${selectedEmployee.id}`)
        }
    }

    const handleExportPdf = async () => {
        const pdfRef = process.env.REACT_APP_API_KEY + '/transaction/export-kwitansi/' + transaction_id
        window.open(pdfRef, '_blank')
    }


    return (
        <CorporateProvider value={{
            ...state,
            category: category,
            setState,
            handleInput,
            postData,
            handleInputDonation,
            handleSearchDonatur,
            handleSelectedDonatur,
            handlePostDonation,
            handleCashInput,
            handleGoodsInput,
            handleEmployeeQuery,
            employeeOptions,
            employee,
            handleSelectedEmployee,
            selectedEmployee,
            transaction: state.transaction,
            selected,
            handleSubmit,
            handleExportPdf,
            postUpdateData,
            setSelected
        }}>
            {children}
        </CorporateProvider>
    )
}

