import React, { useState } from 'react'
import { container } from 'tsyringe'
import { DonorPresenter } from '@/app/infrastructures/Presenter/Donor/Presenter'
import { DonationPresenter } from '@/app/infrastructures/Presenter/Donation/Presenter'
import { CreateDonorApiRequest } from '@/data/payload/api/DonorApiRequest'
import { ProvincePresenter } from '@/app/infrastructures/Presenter/Province/Presenter'
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter'
import { EmployeePresenter } from '@/app/infrastructures/Presenter/Employee/Presenter'
import { useDebounce } from 'use-lodash-debounce'
import { CategoryPresenter } from '@/app/infrastructures/Presenter/Category/Presenter'
import _ from 'lodash'
import { CreateDonationApiRequest } from '@/data/payload/api/DonationApiRequest'
import { useLocalStorage } from '@rehooks/local-storage'
import { UserPresenter } from '@/app/infrastructures/Presenter/User/Presenter'
import { useHistory, useRouteMatch, useParams, useLocation } from 'react-router-dom'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies'
import qs from 'qs'


export interface Cash {
    type_id: number;
    category_id: number;
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
    employee_id: any;
    cash: Cash;
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
    donor: any
    selected: boolean
    handleExportPdf: Function
    postUpdateData: Function,
    setSelected: Function
}

const initialState: IState = {
    DonaturInfo: {
        name: '',
        company_name: '',
        is_company: true,
        position: '',
        email: '',
        address: '',
        phone: '',
        status: 1,
        npwp: '',
        pos_code: '',
        info: '',
        province_id: '',
        regency_id: '',
    },
    DonationInfo: {
        donor_id: 0,
        division_id: 2,
        category_id: 0,
        statement_category_id: 0,
        description: '',
        donation_item: 1,
        employee_id: '',
        cash: {
            type_id: 0,
            category_id: 0,
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
    donor: {},
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
    selected: false,
    handleExportPdf: () => { },
    postUpdateData: () => { },
    setSelected: () => {}
}

export const RetailContext = React.createContext<IState>(initialState)
export const { Provider: RetailProvider, Consumer: RetailConsumer } = RetailContext

export const RetailController = ({ children }) => {
    const [state, setState] = useState<IState>(initialState)
    const [index, setIndex] = useState(0)
    const [category, setCategory] = useState<any>([{}])
    const debouncedValue = useDebounce(state.search, 100)
    const retailPresenter: DonorPresenter = container.resolve(DonorPresenter)
    const donationPresenter: DonationPresenter = container.resolve(DonationPresenter)
    const provincePresenter: ProvincePresenter = container.resolve(ProvincePresenter)
    const employeePresenter: EmployeePresenter = container.resolve(EmployeePresenter)
    const cityPresenter: CityPresenter = container.resolve(CityPresenter)
    const [selected, setSelected] = useState(false)
    const categoryPresenter: CategoryPresenter = container.resolve(CategoryPresenter)
    const { user_id, role } = getUserInfo()
    const userPresenter: UserPresenter = container.resolve(UserPresenter)
    const history = useHistory()
    const donationParams: any = useParams()
    const { transaction_id } = useParams()
    let isReceipt: any = useRouteMatch({
        path: '/dashboard/retail-tanda-terima/:transaction_id',
        strict: false,
        sensitive: true
    })

    let isDonation: any = useRouteMatch({
        path: '/dashboard/retail-input/:id',
        strict: false,
        sensitive: true
    })

    function useQuery() {
        const location = useLocation()
        return qs.parse(location.search)
    }

    let query = useQuery();


    React.useEffect(() => {
        if (isReceipt && isReceipt.path === '/dashboard/retail-tanda-terima/:transaction_id') {
            (async () => {
                const donationDetail: any = await donationPresenter.getById(_.toNumber(transaction_id))
                setState(prevState => ({
                    ...prevState,
                    transaction: donationDetail,
                }))
            })()
        }

        if (isDonation && isDonation.path === '/dashboard/retail-input/:id') {
            (async () => {
                const donorDetail: any = await retailPresenter.getById(_.toNumber(donationParams.id))
                setState(prevState => ({
                    ...prevState,
                    DonationInfo: {
                        ...state.DonationInfo,
                        donor_id: donorDetail.id,
                    },
                    donor: donorDetail
                }))
            })()
        }


        (async () => {
            const listProvince = await provincePresenter.loadData()
            const categoryList = role !== 2 ? await categoryPresenter.getAll() : await categoryPresenter.getAllOperator()
            setCategory(_prevState => categoryList)
            setState(_prevState => ({
                ..._prevState,
                province: listProvince
            }))
        })();

    }, [])

    React.useEffect(() => {
        if (debouncedValue !== '') {
            (async () => {
                const donaturQueryResult = await retailPresenter.getAll({ search: debouncedValue, filter: { division_id: 2, donor_category: 0 } })

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
            })()

        }
    }, [debouncedValue])

    const postData = async () => {
        const res = await retailPresenter.store(new CreateDonorApiRequest(
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
        return res
    }

    const postUpdateData = async () => {
        try {
            const res = await retailPresenter.storeNewData(new CreateDonorApiRequest(
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
            if (res) {
                return res
            } else {
                return false
            }
        } catch (error) {
            alert(error)
            return false
        }
    }

    const handlePostDonation = async (e, indexTab, setIndexTab) => {
        try {
            e.preventDefault()
            const postDontation = await donationPresenter.store(new CreateDonationApiRequest(
                state.DonationInfo.donor_id,
                state.DonationInfo.division_id,
                state.DonationInfo.category_id,
                state.DonationInfo.statement_category_id,
                state.DonationInfo.description,
                state.DonationInfo.donation_item,
                state.DonationInfo.employee_id,
                state.DonationInfo.cash,
                state.DonationInfo.goods
            ))
            const transactionDetail = await donationPresenter.getById(postDontation.id)
            setState(prevState => ({
                ...prevState,
                transaction: transactionDetail
            }))
            history.push(`/dashboard/retail-tanda-terima/${transactionDetail.id}`)
            return postDontation
        } catch (e) {
            return false
        }

    }

    const handleInput = async (e) => {
        const value = e.target.value
        const name = e.target.name
        if (name === 'province_id') {
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
                    province_id: e.target.value
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
        const value = e.target.value
        const name = e.target.name
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
    }

    const handleGoodsInput = (e) => {
        const value = e.target.value
        const name = e.target.name
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

    const handleExportPdf = async () => {
        const pdfRef = process.env.REACT_APP_API_KEY + '/transaction/export-kwitansi/' + transaction_id
        window.open(pdfRef, '_blank')
    }


    return (
        <RetailProvider value={{
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
            transaction: state.transaction,
            donor: state.donor,
            selected,
            handleExportPdf,
            postUpdateData,
            setSelected
        }}>
            {children}
        </RetailProvider>
    )
}