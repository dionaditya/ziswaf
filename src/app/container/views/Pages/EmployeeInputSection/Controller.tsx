import { useReducer, useEffect } from 'react'
import React from 'react'
import moment from 'moment'
import { container } from "tsyringe";
import { ProvincePresenter } from '@/app/infrastructures/Presenter/Province/Presenter';
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter';
import { CityPresenter } from '@/app/infrastructures/Presenter/City/Presenter';
import _ from 'lodash'
import { EmployeePresenter } from '@/app/infrastructures/Presenter/Employee/Presenter';
import { EmployeeApiRequest, EmployeeApiRequestWithoutImage } from '@/data/payload/api/EmployeeApiRequest';
import { useParams, useLocation } from 'react-router-dom'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies';
import qs from 'qs';


export enum ActionType {
    handleEmployeeInputData = 'HANDLESTUDENTEMPLOYEEINPUTDATA',
    handleImageUpload = 'HANDLEIMAGEUPLOAD',
    setLoading = 'SETLOADING',
    setError = 'SETERROR',
    handleSubmit = 'HANDLESUBMIT',
    setProvinceSchool = 'SETPROVINCESCHOOL',
    setCity = 'SETCITY',
    setImagePreview = 'SETIMAGEPREVIEW',
    setEmployeeData = 'SETEMPLOYEEDATA',
    setSchoolId = "SETSCHOOLID",
    setSchoolExisting = "SETSCHOOLEXISTING"
}


export interface IAction {
    type: string,
    payload: any
}

export interface IState {
    statusModal: boolean,
    searchSiswaQuery: string,
    loading: boolean,
    error: boolean,
    data: [],
    province: any,
    school: any,
    city: any,
    ImagePreview: string,
    employeeInput: any,
    handleSubmit: Function,
    handleInput: Function,
    handleImageUpload: Function,
    dispatch: Function,
    userInfo: any
    isUpdateSession: boolean
}

export const initialState: IState = {
    statusModal: false,
    searchSiswaQuery: '',
    loading: false,
    data: [],
    error: false,
    province: [],
    school: [],
    city: [],
    ImagePreview: '',
    employeeInput: {
        school_id: '',
        name: '',
        place_of_birth: '',
        birth_of_date: null,
        phone: '',
        email: '',
        address: '',
        status: '',
        registered_year: null,
        identity_number: '',
        pos_code: '',
        province_id: '',
        regency_id: '',
        image: [],
        id: 0
    },
    handleSubmit: () => { },
    handleImageUpload: () => { },
    handleInput: () => { },
    dispatch: () => { },
    userInfo: {},
    isUpdateSession: false
}


const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.handleEmployeeInputData:
            const listEmployeeData = { ...state.employeeInput, [action.payload.name]: action.payload.value }
            return { ...state, employeeInput: listEmployeeData }

        case ActionType.handleImageUpload:
            return { ...state, employeeInput: { ...state.employeeInput, image: action.payload } }

        case ActionType.setProvinceSchool:
            return { ...state, province: action.payload.province, school: action.payload.school }

        case ActionType.setCity:
            return { ...state, city: action.payload }

        case ActionType.setLoading:
            return { ...state, loading: action.payload }

        case ActionType.setEmployeeData:
            return {
                ...state,
                ImagePreview: action.payload.image,
                employeeInput: {
                    ...state.employeeInput,
                    school_id: action.payload.school_name,
                    name: action.payload.name,
                    place_of_birth: action.payload.place_of_birth,
                    birth_of_date: moment(action.payload.birth_of_date).format('YYYY-MM-DD'),
                    phone: action.payload.phone,
                    email: action.payload.email,
                    address: action.payload.address,
                    status: action.payload.status,
                    registered_year: action.payload.registered_year,
                    id: action.payload.id,
                    pos_code: action.payload.pos_code,
                    province_id: action.payload.province_name,
                    regency_id: action.payload.regency_name,
                }
            }

        case ActionType.setImagePreview:
            return { ...state, ImagePreview: action.payload }

        case ActionType.setSchoolId:
            return {
                ...state, employeeInput: {
                    ...state.employeeInput,
                    school_id: action.payload
                }
            }

        case ActionType.setSchoolExisting:
            return {
                ...state, employeeInput: {
                    ...state.employeeInput,
                    school_id: action.payload
                }
            }

        default:
            return state
    }
}


export const EmployeeInputContext = React.createContext<IState>(initialState);

export const { Provider: EmployeeInputProvider } = EmployeeInputContext;


export const EmployeeInputController = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState)
    let provincePresenter: ProvincePresenter = container.resolve(ProvincePresenter);
    let schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
    let cityPresenter: CityPresenter = container.resolve(CityPresenter)
    let employeePresenter: EmployeePresenter = container.resolve(EmployeePresenter)
    let [isUpdateSession, setUpdateSession] = React.useState(false)

    const location = useLocation();
    const queryString: number = qs.parse(location.search);    
    const { id } = useParams()
    let userAccess = getUserInfo()

    useEffect(() => {
        const getData = async () => {
            if( queryString['?detail'] !== undefined){
                dispatch({ type: ActionType.setLoading, payload: true })
                let employeeData = await employeePresenter.loadDataDetail(_.toNumber(queryString['?detail']))
                let listProvincePresenter = await provincePresenter.loadData()
                let listSchoolPresenter = await schoolPresenter.loadData()
                console.log(employeeData.data.data)
                let provinceId = listProvincePresenter.filter(val => val.name === employeeData.data.data.province_name)
                let city = await cityPresenter.loadData({
                    filter: {
                        province_id: provinceId[0].id
                    }
                })
                let schoolId: any = listSchoolPresenter.data.data.filter(val => val.name === employeeData.data.data.school_name)
                let regencyId = city.filter(val => val.name === employeeData.data.data.regency_name)
                if (_.isNil(schoolId) === false) {
                    const employeeTransformData = {
                        ...employeeData.data.data,
                        province_name: provinceId[0].id,
                        regency_name: regencyId[0].id,
                        school_name: schoolId[0].id
                    }
                    dispatch({
                        type: ActionType.setEmployeeData,
                        payload: employeeTransformData
                    })

                    dispatch({
                        type: ActionType.setCity,
                        payload: city
                    })

                    dispatch({
                        type: ActionType.setProvinceSchool, payload: {
                            province: listProvincePresenter,
                            school: listSchoolPresenter.data.data
                        }
                    })
                    dispatch({ type: ActionType.setLoading, payload: false })
                }
                dispatch({ type: ActionType.setLoading, payload: false })
                setUpdateSession(true)
            }else if (id !== undefined) {
                dispatch({ type: ActionType.setLoading, payload: true })
                let employeeData = await employeePresenter.loadDataDetail(_.toNumber(id))
                let listProvincePresenter = await provincePresenter.loadData()
                let listSchoolPresenter = await schoolPresenter.loadData()
                let provinceId = listProvincePresenter.filter(val => val.name === employeeData.data.data.province_name)
                let city = await cityPresenter.loadData({
                    filter: {
                        province_id: provinceId[0].id
                    }
                })
                let schoolId: any = listSchoolPresenter.data.data.filter(val => val.name === employeeData.data.data.school_name)
                let regencyId = city.filter(val => val.name === employeeData.data.data.regency_name)
                if (_.isNil(schoolId) === false) {
                    const employeeTransformData = {
                        ...employeeData.data.data,
                        province_name: provinceId[0].id,
                        regency_name: regencyId[0].id,
                        school_name: schoolId[0].id
                    }
                    dispatch({
                        type: ActionType.setEmployeeData,
                        payload: employeeTransformData
                    })

                    dispatch({
                        type: ActionType.setCity,
                        payload: city
                    })

                    dispatch({
                        type: ActionType.setProvinceSchool, payload: {
                            province: listProvincePresenter,
                            school: listSchoolPresenter.data.data
                        }
                    })
                    dispatch({ type: ActionType.setLoading, payload: false })
                }
                dispatch({ type: ActionType.setLoading, payload: false })
                setUpdateSession(true)
            } else {

                dispatch({ type: ActionType.setLoading, payload: true })
                let listProvincePresenter = await provincePresenter.loadData()
                let listSchoolPresenter = await schoolPresenter.loadData()
                dispatch({
                    type: ActionType.setSchoolExisting,
                    payload: queryString["?school_id"] !== undefined ? queryString["?school_id"] : userAccess.school.id
                })
                dispatch({
                    type: ActionType.setProvinceSchool, payload: {
                        province: listProvincePresenter,
                        school: listSchoolPresenter.data.data
                    }
                })
                dispatch({ type: ActionType.setLoading, payload: false })
            }
        }

        getData()
    }, [])

    const handleSubmit = controller => async dispatch => {

        if (id !== undefined) {
            try {
                if (state.employeeInput.image !== [] && state.employeeInput.image.length > 0) {
                    const postEmployee = await employeePresenter.updateEmployeeData(new EmployeeApiRequest(
                        state.employeeInput.school_id,
                        state.employeeInput.name,
                        state.employeeInput.place_of_birth,
                        moment(state.employeeInput.birth_of_date).toISOString(),
                        state.employeeInput.phone,
                        state.employeeInput.email,
                        state.employeeInput.address,
                        state.employeeInput.status,
                        moment(state.employeeInput.registered_year).year(),
                        state.employeeInput.pos_code,
                        state.employeeInput.province_id,
                        state.employeeInput.regency_id,
                        state.employeeInput.image,
                    ), _.toNumber(id))
                    return postEmployee
                } else {
                    const postEmployee = await employeePresenter.updateEmployeeData(new EmployeeApiRequestWithoutImage(
                        state.employeeInput.school_id,
                        state.employeeInput.name,
                        state.employeeInput.place_of_birth,
                        moment(state.employeeInput.birth_of_date).toISOString(),
                        state.employeeInput.phone,
                        state.employeeInput.email,
                        state.employeeInput.address,
                        state.employeeInput.status,
                        moment(state.employeeInput.registered_year).year(),
                        state.employeeInput.pos_code,
                        state.employeeInput.province_id,
                        state.employeeInput.regency_id,
                    ), _.toNumber(id))
                    return postEmployee
                }


            } catch (error) {
                return error.response
            }

        } else {
            try {
                if (state.employeeInput.image !== [] && state.employeeInput.image.length > 0) {
                    const postEmployee = await employeePresenter.postNewEmployeeData(new EmployeeApiRequest(
                        state.employeeInput.school_id,
                        state.employeeInput.name,
                        state.employeeInput.place_of_birth,
                        moment(state.employeeInput.birth_of_date).toISOString(),
                        state.employeeInput.phone,
                        state.employeeInput.email,
                        state.employeeInput.address,
                        state.employeeInput.status,
                        moment(state.employeeInput.registered_year).year(),
                        state.employeeInput.pos_code,
                        state.employeeInput.province_id,
                        state.employeeInput.regency_id,
                        state.employeeInput.image,
                        
                    ))
                    return postEmployee
                }else{
                    const postEmployee = await employeePresenter.postNewEmployeeData(new EmployeeApiRequestWithoutImage(
                        state.employeeInput.school_id,
                        state.employeeInput.name,
                        state.employeeInput.place_of_birth,
                        moment(state.employeeInput.birth_of_date).toISOString(),
                        state.employeeInput.phone,
                        state.employeeInput.email,
                        state.employeeInput.address,
                        state.employeeInput.status,
                        moment(state.employeeInput.registered_year).year(),
                        state.employeeInput.pos_code,
                        state.employeeInput.province_id,
                        state.employeeInput.regency_id,                        
                    ))
                    return postEmployee
                }
            } catch (e) {
                return e.response
            }
        }
    }

    const handleInput = (e) =>
        dispatch => async actiontype => {
            if (e.target.name === 'province_id') {
                dispatch({
                    type: actiontype, payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
                let city = await cityPresenter.loadData({
                    filter: {
                        province_id: e.target.value
                    }
                })
                dispatch({
                    type: ActionType.setCity,
                    payload: city
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

    const handleImageUpload = (e) =>
        dispatch => actiontype => {
            dispatch({ type: actiontype, payload: [e.target.files[0], e.target.files[0].name] })
        }
        

    return (
        <EmployeeInputProvider value={{
            ...state,
            handleSubmit: handleSubmit,
            handleInput: handleInput,
            handleImageUpload: handleImageUpload,
            dispatch: dispatch,
            userInfo: userAccess,
            isUpdateSession
        }}>
            {children}
        </EmployeeInputProvider>
    )
}

