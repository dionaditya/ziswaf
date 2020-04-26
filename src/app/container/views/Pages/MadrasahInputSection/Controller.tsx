import { useReducer, useEffect, useContext } from 'react'
import React from 'react'
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter'
import { container } from 'tsyringe'
import moment from 'moment'
import { ProvincePresenter } from '@/app/infrastructures/Presenter/Province/Presenter'
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter'
import { SchoolApiRequest } from '@/data/payload/api/SchoolApiRequest'
import { AppContext } from '@/App'
import { useParams } from 'react-router-dom'
import _ from 'lodash'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';

export enum ActionType {
    handleInput = 'HANDLEINPUT',
    handleSearchUser = 'HANDLESEARCHUSER',
    setLoading = 'HANDLESETLOADING',
    setError = 'HANDLESETERROR',
    setProvince = 'SETPROVNCE',
    setCity = 'SETCITY',
    setMadrasahData = 'SETMADRASAHDATA'
}


export interface InputSchoolData {
    name: string;
    phone: string;
    email: string;
    pos_code: string;
    description: string;
    user_id: number;
    province_id: number;
    regency_id: number;
    opened_at: any;
    address: string;
    id: string
}

export interface IAction {
    type: string,
    payload: any
}


export interface IState {
    data: Array<object>,
    city: Array<object>,
    province: Array<object>,
    loading: boolean,
    error: boolean,
    inputSchoolData: any,
    options: any,
    handleInput: Function,
    dispatch: Function,
    handleSubmit: Function,
}

const initialState: IState = {
    data: [],
    city: [{}],
    province: [{}],
    loading: false,
    error: false,
    options: [],
    inputSchoolData: {
        name: '',
        phone: '',
        email: '',
        pos_code: '',
        description: '',
        user_id: 0,
        province_id: 0,
        regency_id: 0,
        opened_at: '',
        address: '',
        id: ''
    },
    handleInput: () => { },
    dispatch: () => { },
    handleSubmit: () => { },
}



const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.handleInput:
            return { ...state, inputSchoolData: { ...state.inputSchoolData, [action.payload.name]: action.payload.value } }

        case ActionType.handleSearchUser:
            return { ...state, searchUserQuery: action.payload }

        case ActionType.setLoading:
            return { ...state, loading: action.payload }


        case ActionType.setError:
            return { ...state, error: action.payload }

        case ActionType.setProvince:
            return { ...state, province: action.payload }

        case ActionType.setCity:
            return { ...state, city: action.payload }

        case ActionType.setMadrasahData:
            return { ...state, inputSchoolData: action.payload }

        default:
            return state
    }
}


export const UserInputContext = React.createContext<IState>(initialState);

export const { Provider: UserListInputSectionProvider } = UserInputContext;

export const UserListInputController = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState)
    const [onSearch, setSearch] = React.useState('')
    const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
    const provincePresenter: ProvincePresenter = container.resolve(ProvincePresenter)
    const cityPresenter: CityPresenter = container.resolve(CityPresenter)
    const { id } = useParams()
    
    let userAccess = getUserInfo()



    useEffect(() => {
        if (id !== undefined) {
            (async () => {
                dispatch({ type: ActionType.setLoading, payload: true })
                let schoolData: any = await schoolPresenter.loadDataDetail(_.toNumber(id))
                let listProvincePresenter = await provincePresenter.loadData()
                let provinceId: any = listProvincePresenter.filter(val => val.name === schoolData.province_name)
                let listCityPresenter = await cityPresenter.loadData({
                    filter: {
                        province_id: provinceId[0].id
                    }
                })
                let cityId: any = listCityPresenter.filter(val => val.name === schoolData.regency_name)
                const transformData = {
                    ...schoolData,
                    province_id: provinceId[0].id,
                    regency_id: cityId[0].id
                }
                dispatch({
                    type: ActionType.setMadrasahData, payload: transformData
                })
                dispatch({
                    type: ActionType.setCity, payload: listCityPresenter
                })
                dispatch({
                    type: ActionType.setProvince, payload: listProvincePresenter
                })
                dispatch({ type: ActionType.setLoading, payload: false })
            })()
        }

        (async () => {
            dispatch({ type: ActionType.setLoading, payload: true })
            const listProvince = await provincePresenter.loadData()
            dispatch({ type: ActionType.setProvince, payload: listProvince })
            dispatch({ type: ActionType.setLoading, payload: false })
        })()

    }, [])

    const handleInput = (e) => dispatch =>
        async actiontype => {
            if (e.target.name === 'province_id') {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
                const listCity = await cityPresenter.loadData({
                    filter: {
                        province_id: e.target.value
                    }
                })
                dispatch({
                    type: ActionType.setCity, payload: listCity
                })

            } else if (e.target.name === "pos_code") {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
            } else {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
            }
        }

    const handleSubmit = (e) => async dispatch => {
        if(id !== undefined) {
            const updateUser = await schoolPresenter.updateSchoolData(new SchoolApiRequest(
                state.inputSchoolData.name,
                state.inputSchoolData.phone,
                state.inputSchoolData.email,
                _.toNumber(state.inputSchoolData.pos_code),
                state.inputSchoolData.description,
                userAccess.user_id,
                state.inputSchoolData.province_id,
                state.inputSchoolData.regency_id,
                moment(state.inputSchoolData.opened_at).toISOString(),
                state.inputSchoolData.address
            ), _.toNumber(id))

            const [status, response] = updateUser
            if(status === 'success') {
                return ['success', response]
            } else {
                return ['error', response]
            }
        } else {
            dispatch({
                type: ActionType.setLoading, payload: true
            })
            const postUser = await schoolPresenter.postNewSchoolData(new SchoolApiRequest(
                state.inputSchoolData.name,
                state.inputSchoolData.phone,
                state.inputSchoolData.email,
                _.toNumber(state.inputSchoolData.pos_code),
                state.inputSchoolData.description,
                userAccess.user_id,
                state.inputSchoolData.province_id,
                state.inputSchoolData.regency_id,
                moment(state.inputSchoolData.opened_at).toISOString(),
                state.inputSchoolData.address
            ))
            dispatch({
                type: ActionType.setLoading, payload: true
            })
            const [status, response] = postUser
            if(status === 'success') {
                return ['success', response]
            } else {
                return ['error', response]
            }

        }
    }

    return (
        <UserListInputSectionProvider
            value={{
                data: state.data,
                loading: state.loading,
                error: state.error,
                inputSchoolData: state.inputSchoolData,
                handleInput: handleInput,
                dispatch: dispatch,
                city: state.city,
                province: state.province,
                handleSubmit: handleSubmit,
                options: state.options,
            }}>
            {children}
        </UserListInputSectionProvider>
    )
}


