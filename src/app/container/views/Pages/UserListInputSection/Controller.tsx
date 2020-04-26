import { useReducer, useEffect } from 'react'
import React from 'react'
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter'
import { container } from 'tsyringe'
import { UserPresenter } from '@/app/infrastructures/Presenter/User/Presenter'
import { CreateUserApiRequest, UpdateUserApiRequest } from '@/data/payload/api/UserApiRequest'
import { EmployeePresenter } from '@/app/infrastructures/Presenter/Employee/Presenter'
import { useDebounce } from 'use-lodash-debounce'
import {useParams} from 'react-router-dom'
import _ from 'lodash'
import history from '@/app/infrastructures/misc/BrowserHistory'

export enum ActionType {
    handleInput = 'HANDLEINPUT',
    handleSearchUser = 'HANDLESEARCHUSER',
    setLoading = 'HANDLESETLOADING',
    setError = 'HANDLESETERROR',
    setSchool = 'SETDATA',
    setEmployee = 'SETEMPLOYEE',
    setSelectedEmployee = 'SETSELECTEDEMPLOYEE',
    setOptions = '',
    setDataUser = 'SETDATAUSER'
}


export interface InputUserData {
    id: string,
    name: string,
    employee_id: string,
    email: string,
    school: number,
    username: string,
    password: string,
    confirm_password: string,
    role: number,
    user_status: number,
}

export interface IAction {
    type: string,
    payload: any
}


export interface IState {
    searchUserQuery: string,
    data: Array<object>,
    school: Array<object>,
    loading: boolean,
    error: boolean,
    selectedEmployee: any,
    employee: any,
    inputUserData: InputUserData,
    options: any,
    handleSearchUserQuery: Function,
    handleInput: Function,
    dispatch: Function,
    handleSubmit: Function,
    handleOnSelect: Function
}

const initialState: IState = {
    searchUserQuery: '',
    data: [],
    school: [],
    loading: false,
    error: false,
    options: [],
    inputUserData: {
        id: '',
        name: '',
        employee_id: '',
        email: '',
        school: 0,
        username: '',
        password: '',
        confirm_password: '',
        role: 0,
        user_status: 1,
    },
    selectedEmployee: {
        id: '',
        school_name: '',
        name: '',
        email: '',
        status: ''
    },
    employee: [],
    handleSearchUserQuery: () => { },
    handleInput: () => { },
    dispatch: () => { },
    handleSubmit: () => { },
    handleOnSelect: () => { },
    
}



const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.handleInput:
            return { ...state, inputUserData: { ...state.inputUserData, [action.payload.name]: action.payload.value } }

        case ActionType.handleSearchUser:
            return { ...state, searchUserQuery: action.payload }

        case ActionType.setLoading:
            return { ...state, loading: action.payload }

        case ActionType.setError:
            return { ...state, error: action.payload }

        case ActionType.setSchool:
            return { ...state, school: action.payload }

        case ActionType.setOptions: 
            return {...state, options: action.payload}

        case ActionType.setEmployee:
            return { ...state, employee: action.payload }

        case ActionType.setSelectedEmployee:
            return { ...state, selectedEmployee: action.payload}

        case ActionType.setDataUser: 
            const  {
                id, 
                name,
                username,
                school,
                role,
                status,
                email,
                employee_id
            } = action.payload

            return {...state, inputUserData: {
                ...state.inputUserData,
                role,
                user_status: status,
                id,
                username
            }, selectedEmployee: {
                ...state.selectedEmployee,
                id: id,
                name: name,
                username: username,
                school: school,
                employee_id:employee_id,
                email: email
            }}
        default:
            return state
    }
}


export const UserInputContext = React.createContext<IState>(initialState);

export const { Provider: UserListInputSectionProvider } = UserInputContext;

export const UserListInputController = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<IState, IAction>>(reducer, initialState)
    const [onSearch, setSearch] = React.useState('')
    const debouncedValue = useDebounce(onSearch, 200)
    const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
    const userPresenter: UserPresenter = container.resolve(UserPresenter)
    const employeePresenter: EmployeePresenter = container.resolve(EmployeePresenter)

    const {id} = useParams()
    useEffect(() => {
        if(id !== null && id !== undefined && _.isNil(id) === false && id !== "undefined")  {
            (async() => {
                const dataUser = await userPresenter.loadDataDetail(_.toNumber(id))
                if(dataUser) {
                    const data = {
                        ...dataUser?.data?.data,
                        school_name: dataUser?.data?.data?.school
                    }
                    dispatch({ type: ActionType.setSelectedEmployee, payload: data })
                    dispatch({type: ActionType.setDataUser, payload: dataUser?.data?.data})
                }
            })()
        }
    }, [])

    useEffect(() => {
        if (debouncedValue !== '') {
            (async () => {
                const employeeQueryResult = await employeePresenter.loadData({ search: debouncedValue })
                if (employeeQueryResult.data.data !== null) {
                    const transformedEmployeeQuery = employeeQueryResult.data.data.map(val => {
                        return {
                            value: val.name,
                            key: val.id
                        }
                    })
                    dispatch({ type: ActionType.setOptions, payload: transformedEmployeeQuery })
                    dispatch({type: ActionType.setEmployee, payload: employeeQueryResult.data.data })
                }
            })()

        }
    }, [debouncedValue])

    const handleSearchUserQuery = (e) =>
        dispatch => {
            setSearch(e)
            dispatch({ type: ActionType.handleSearchUser, payload: e })
        }


    const handleInput = (e) => dispatch =>
        actiontype => {
            if(e.target.name === 'user_status') {
                if(e.target.checked === true) {
                    dispatch({
                        type: actiontype, payload: {
                            name: e.target.name,
                            value: 1
                        }
                    })
                } else {
                    dispatch({
                        type: actiontype, payload: {
                            name: e.target.name,
                            value: 2
                        }
                    })
                }
              
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

        if(_.isNil(id) || id === undefined ) {
            try {
                dispatch({
                    type: ActionType.setLoading, payload: true
                })
                
                const postUser = await userPresenter.postNewUserData(new CreateUserApiRequest(
                    state.selectedEmployee.name,
                    state.inputUserData.username,
                    state.inputUserData.password,
                    state.inputUserData.user_status,
                    state.inputUserData.role,
                    state.selectedEmployee.id
                ))
                return postUser
            } catch(e) {
                return e.response
            }
            
        } else {
            try {
                dispatch({
                    type: ActionType.setLoading, payload: true
                })
                const updateUser = await userPresenter.updateUserData(new UpdateUserApiRequest(
                    state.selectedEmployee.name,
                    state.inputUserData.username,
                    state.inputUserData.password,
                    state.inputUserData.user_status,
                    state.inputUserData.role,
                ), _.toNumber(id))
                return updateUser
            } catch(error) {
                return error.response
            }
        }
        
    }

    const handleOnSelectSearch = (e) => (dispatch) => {
        const selectedEmployee = state.employee.filter(val => val.id === e.key)
        if (selectedEmployee.length > 0) {
            const {id, name, school_id, email,  } = selectedEmployee[0]
            const data = {
                id: id,
                name: name,
                employe_id: id,
                status: 1,
                role: 2,
                email: email,
                school_id: '',
                school_name: school_id
            }
            dispatch({type: ActionType.setDataUser, payload: data})
            dispatch({ type: ActionType.setSelectedEmployee, payload: data })
        } else {
            return null
        }
    }

    return (
        <UserListInputSectionProvider
            value={{
                searchUserQuery: state.searchUserQuery,
                data: state.data,
                loading: state.loading,
                error: state.error,
                inputUserData: state.inputUserData,
                handleSearchUserQuery: handleSearchUserQuery,
                handleInput: handleInput,
                dispatch: dispatch,
                employee: state.employee,
                school: state.school,
                handleSubmit: handleSubmit,
                options: state.options,
                handleOnSelect: handleOnSelectSearch,
                selectedEmployee: state.selectedEmployee
            }}>
            {children}
        </UserListInputSectionProvider>
    )
}



