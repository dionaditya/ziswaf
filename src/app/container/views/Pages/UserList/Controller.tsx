import { useReducer, useEffect } from 'react'
import React from 'react'
import { UserDataColumnsTable } from '@/domain/entities/AllOptions'
import { UserPresenter } from '@/app/infrastructures/Presenter/User/Presenter'
import { container } from 'tsyringe'
import { SchoolPresenter } from '@/app/infrastructures/Presenter/School/Presenter'
import { UpdateUserPasswordApiRequest, UpdateUserStatusApiRequest, UpdateUserApiRequest } from '@/data/payload/api/UserApiRequest'
import _ from 'lodash'
import { getUserInfo } from '@/app/infrastructures/misc/Cookies'
import { createContainer } from 'react-tracked' 

export enum ActionType {
    handleModalChangePassword = 'HANDLEMODALCHANGEPASSWORD',
    handleModalFilters = 'HANDLEMODALFILTER',
    handleInput = 'HANDLEINPUT',
    handleSearchUser = 'HANDLESEARCHUSER',
    setLoading = 'HANDLESETLOADING',
    setError = 'HANDLESETERROR',
    handleInputChangePassword = 'HANDLEINPUTCHANGEPASSWORD',
    setData = 'SETDATA',
    setSchool = 'SETSCHOOL',
    resetFilter = 'RESETFILTER',
    resetPassword = 'RESETPASSWORD',
    handleCTAFilter = 'HANDLECTAFILTER',
    handleCTAChangePassword = 'HANDLECTACHANGEPASSWORD',
    actionDeactivated = 'ACTIONDEACTIVATED'
}


interface ChangePasswordInput {
    name: string,
    old_password: string,
    new_password: string,
    confirm_password: string,
}

export interface IAction {
    type: string,
    payload?: any
}


export interface IState {
    statusModalFilters: boolean,
    statusModalChangePassword: boolean,
    searchUserQuery: string,
    data: any,
    filterStatus: any,
    changePasswordInput: ChangePasswordInput,
    loading: boolean,
    error: boolean,
    school: Array<object>,
    displayColumns: Array<object>,
    handleModalFilters: Function,
    handleModalChangePassword: Function,
    handleSearchUserQuery: Function,
    handleInput: Function,
    handleInputChangePassword: Function,
    dispatch: Function,
    handleSearch: Function,
    handleCTAFilter: Function,
    handleResetFilter: Function,
    handleCTAChnagePassword: Function,
    optionsTable: object,
    handleDelete: Function,
    tabIndex: any
    isAdmin: any
    selectedUser: any
    schoolId: any
    handleDeactivated: Function,

}

const initialState: IState = {
    statusModalFilters: false,
    statusModalChangePassword: false,
    searchUserQuery: '',
    filterStatus: {
        paging: {
            page: 1,
            limit: 10
        },
        search: '',
        filter: {
            role: 0,
            school_id: 0,
            created_at_start: new Date(),
            created_at_end: new Date(),
            last_login_start: new Date(),
            last_login_end: new Date()
        }
    },
    data: [],
    school: [],
    changePasswordInput: {
        name: '',
        old_password: '',
        new_password: '',
        confirm_password: '',
    },
    loading: false,
    error: false,
    displayColumns: UserDataColumnsTable.map((val, i) => {
        return {
            name: val[0],
            label: val[1]
        }
    }),
    handleModalFilters: () => { },
    handleModalChangePassword: () => { },
    handleSearchUserQuery: () => { },
    handleInput: () => { },
    handleInputChangePassword: () => { },
    dispatch: () => { },
    handleSearch: () => { },
    handleCTAFilter: () => { },
    handleResetFilter: () => { },
    handleCTAChnagePassword: () => { },
    optionsTable: {},
    handleDelete: () => { },
    tabIndex: 0,
    isAdmin: 1,
    selectedUser: {},
    schoolId: 1,
    handleDeactivated: () => {}
}



const reducer: React.Reducer<IState, IAction> = (state, action) => {
    switch (action.type) {
        case ActionType.handleModalChangePassword:
            return { ...state, statusModalChangePassword: !state.statusModalChangePassword }

        case ActionType.handleModalFilters:
            return { ...state, statusModalFilters: !state.statusModalFilters }

        case ActionType.handleInput:
            return {
                ...state, filterStatus: {
                    ...state.filterStatus, filter: {
                        ...state.filterStatus.filter,
                        [action.payload.name]: action.payload.value
                    }
                }
            }

        case ActionType.handleInputChangePassword:
            return { ...state, changePasswordInput: { ...state.changePasswordInput, [action.payload.name]: action.payload.value } }

        case ActionType.handleSearchUser:
            return { ...state, searchUserQuery: action.payload }

        case ActionType.setLoading:
            return { ...state, loading: action.payload }

        case ActionType.setSchool:
            return { ...state, school: action.payload }

        case ActionType.setError:
            return { ...state, error: action.payload }

        case ActionType.resetFilter:
            return { ...state, filterStatus: { ...state.filterStatus, filter: initialState.filterStatus.filter } }

        case ActionType.resetPassword:
            return { ...state, changePasswordInput: initialState.changePasswordInput }

        case ActionType.setData:
            return { ...state, data: action.payload }

        default:
            return state
    }
}


export const UserListContext = React.createContext<IState>(initialState);

export const { Provider: UserListProvider } = UserListContext;

const useValue = ({ reducer, initialState }) => useReducer(reducer, initialState);

const {
  Provider,
  useTracked,
} = createContainer(() => useReducer(reducer, initialState));


export const UserListController = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [tableIndex, setTableIndex] = React.useState(0)
    const userPresenter: UserPresenter = container.resolve(UserPresenter)
    const schoolPresenter: SchoolPresenter = container.resolve(SchoolPresenter)
    const [isAdmin, setAdmin] = React.useState(1)
    const [schoolId, setSchoolId] = React.useState(0)
    const [pagination, setPagintion] = React.useState<any>({
        total: 0,
        page: 0,
        rowsPerPage: 0,
    })
    const [selectedUser, setSelectedUser] = React.useState({})
    const [filterStatus, setFilterStatus] = React.useState<any>({
        paging: {
            page: 1,
            limit: 10
        },
        search: '',
        filter: {
            role: '',
            school_id: '',
            created_at_start: '',
            created_at_end: '',
            last_login_start: '',
            last_login_end: ''
        }
    })

    let userAccess = getUserInfo()

    useEffect(() => {
        const getData = async () => {
            dispatch({ type: ActionType.setLoading, payload: true })
            const listUser = await userPresenter.loadData({
                paging: {
                    page: 1,
                    limit: 10
                }
            })
            setPagintion({
                total: listUser.data.pagination.total,
                page: listUser.data.pagination.current_page,
                rowsPerPage: listUser.data.pagination.page_size
            })
            setAdmin(userAccess.role)
            setSchoolId(userAccess.school)
            dispatch({ type: ActionType.setData, payload: listUser.data.data })
            dispatch({ type: ActionType.setLoading, payload: false })
        }
        getData()
    }, [])

    const optionsTable = {
        filterType: "dropdown",
        responsive: "scroll",
        sort: true,
        pagination: true,
        page: pagination.pages,
        count: pagination.total,
        selectableRowsHeader: false,
        search: false,
        filter: false,
        elevation: 0,
        print: false,
        download: false,
        textLabels: {
            body: {
              noMatch: state.loading ? 'loading...' : "Maaf tidak ada data",
            },
        },
        viewColumns: false,
        selectableRowsOnClick: true,
        fixedHeaderOptions: { yAxis: true },
        onCellClick: (colData, celMeta: { colIndex, rowIndex, dataIndex }) => {
            const idData = state.data[celMeta.dataIndex]['id']
            setTableIndex(idData)
        },
        setCellHeaderProps: () => ({ align: 'center' }),
        setCellProps: () => ({ align: 'center' }),
        onTableChange: async (action, tableState) => {
            switch (action) {
                case 'sort':
                    if (tableState.announceText.slice(tableState.announceText.length - 9, tableState.announceText.length) === 'ascending') {
                        let userSortByColumn = await userPresenter.loadData({
                            ...filterStatus,
                            sort: {
                                [state.displayColumns[tableState.activeColumn]['name']]: 'ASC'
                            }
                        })
                        setFilterStatus({
                            ...filterStatus,
                            sort: {
                                [state.displayColumns[tableState.activeColumn]['name']]: 'ASC'
                            }
                        })
                        if (userSortByColumn !== null) {
                            dispatch({ type: ActionType.setData, payload: userSortByColumn.data.data })
                        }
                    } else {
                        const userSortByColumn = await userPresenter.loadData({
                            ...filterStatus,
                            sort: {
                                [state.displayColumns[tableState.activeColumn]['name']]: 'DESC'
                            }
                        })
                        setFilterStatus({
                            ...filterStatus,
                            sort: {
                                [state.displayColumns[tableState.activeColumn]['name']]: 'DESC'
                            }
                        })

                        if (userSortByColumn !== null) {
                            dispatch({ type: ActionType.setData, payload: userSortByColumn.data.data })
                        }
                    }
                    break;

                case 'changePage':
                    const userSortByColumn = await userPresenter.loadData({
                        ...filterStatus,
                        paging: {
                            page: tableState.page+1,
                            limit: tableState.rowsPerPage
                        },
                    })
                    setPagintion(prevState => ({
                        ...prevState,
                        rowsPerPage: tableState.page,
                    }))
                    if (userSortByColumn !== null) {
                        dispatch({ type: ActionType.setData, payload: userSortByColumn.data.data })
                    }
                    break;

                case 'changeRowsPerPage':
                    const userSortedByRows = await userPresenter.loadData({
                        ...filterStatus,
                        paging: {
                            page: tableState.page+1,
                            limit: tableState.rowsPerPage
                        },
                    })
                    setPagintion(prevState => ({
                        ...prevState,
                        rowsPerPage: tableState.rowsPerPage,
                    }))
                    if (userSortedByRows !== null) {
                        dispatch({ type: ActionType.setData, payload: userSortedByRows.data.data })
                    }
                    break;

            }
        },
        disableToolbarSelect: true,
        serverSide: true
    };

    const handleModalFilters = (e) => {
        return dispatch => async actiontype => {
            dispatch({ type: actiontype })
            dispatch({ type: ActionType.setLoading, payload: true })
            let schoolList = await schoolPresenter.loadData()
            dispatch({ type: ActionType.setSchool, payload: schoolList?.data?.data })
            dispatch({ type: ActionType.setLoading, payload: false })
        }
    }

    const handleModalChangePassword = (e) => {
        return dispatch => actiontype => {
            dispatch({ type: actiontype })
            const selectedUser = state.data.filter(val => val.id === tableIndex)
            setSelectedUser(selectedUser[0])
        }
    }

    const handleSearchUserQuery = (e) => {
        return dispatch => actiontype => {
            e.persist()
            setFilterStatus({
                ...filterStatus,
                search: e.target.value
            })
        }
    }

    const handleInput = (e) => dispatch =>{
        return actiontype => {
            // e.persist()
            setFilterStatus(prevState => ({
                ...prevState,
                filter: {
                    ...prevState.filter,
                    [e.target.name]: e.target.value
                }
            }))
        }
    }


    const handleInputChangePassword = (e) => dispatch =>
        actiontype => dispatch({
            type: actiontype, payload: {
                name: e.target.name,
                value: e.target.value
            }
        })

    const handleSearch = (e) => dispatch =>
        async actiontype => {
            dispatch({ type: ActionType.setLoading, payload: true })
            const listUser = await userPresenter.loadData({ ...filterStatus })
            dispatch({ type: ActionType.setData, payload: listUser.data.data })
            dispatch({ type: ActionType.setLoading, payload: false })
        }

    const handleCTAFilter = (e) => dispatch =>
        async actiontype => {
            dispatch({ type: ActionType.setLoading, payload: true })
            const listUser = await userPresenter.loadData({
                ...filterStatus
            })
            dispatch({ type: ActionType.setData, payload: listUser.data.data })
            
              setPagintion({
                total: listUser.data.pagination.total,
                page: listUser.data.pagination.current_page-1,
                rowsPerPage: listUser.data.pagination.page_size
            })
            

            dispatch({ type: ActionType.setLoading, payload: false })
            dispatch({ type: ActionType.handleModalFilters })
        }

    const handleResetFilter = (dispatch) => actiontype => {
        if (actiontype === ActionType.resetFilter) {
            setFilterStatus({
                ...filterStatus,
                filter: initialState.filterStatus
            })
        } else {
            dispatch({ type: ActionType.resetPassword })
        }
    }


    const handleCTAChangePassword = (e, type) => dispatch => {
        return async actiontype => {
            try {
                dispatch({ type: ActionType.setLoading, payload: true })
                const updateUser = await userPresenter.updatePassword(
                    new UpdateUserPasswordApiRequest(
                        state.changePasswordInput.old_password,
                        state.changePasswordInput.new_password,
                        state.changePasswordInput.confirm_password),
                    tableIndex,
                    type
                )
                if (updateUser.status === 200) {
                    dispatch({type: ActionType.handleModalChangePassword, payload: false});
                    const listUser = await userPresenter.loadData()
                    dispatch({ type: ActionType.setData, payload: listUser.data.data })
                    dispatch({ type: ActionType.setLoading, payload: false })
                    return updateUser
                } else {
                    return updateUser
                }
            } catch (error) {
                dispatch({ type: ActionType.setLoading, payload: false })
                return error.response
            }

        }
    }

    const handleDelete = async (e) => {
        try {
            const deleteUser = await userPresenter.deleteUserData(tableIndex)
            if (deleteUser.status === 200) {
                dispatch({
                    type: ActionType.setLoading,
                    payload: true
                })
                const listUser = await userPresenter.loadData({ filter: state.filterStatus })
                  setPagintion({
                total: listUser.data.pagination.total,
                page: listUser.data.pagination.current_page-1,
                rowsPerPage: listUser.data.pagination.page_size
            })
                dispatch({
                    type: ActionType.setData,
                    payload: listUser.data.data
                })

                dispatch({
                    type: ActionType.setLoading,
                    payload: false
                })
                return true
            }
        } catch {
            return false
        }
    }

    const actionDeactivated = async (e) => {
        dispatch({ type: ActionType.setLoading, payload: true })
        try {
            const updateUser = await userPresenter.updateStatusUser(
                new UpdateUserStatusApiRequest(
                    2
                ),
                tableIndex
            )
            if(updateUser.status === 200) {
                const listUser = await userPresenter.loadData()
                dispatch({ type: ActionType.setData, payload: listUser.data.data })
                dispatch({ type: ActionType.setLoading, payload: false })
                return updateUser
            } else {
                dispatch({ type: ActionType.setLoading, payload: false })
                return updateUser
            }
        } catch(error) {
            dispatch({ type: ActionType.setLoading, payload: false })
            return error.response
        }
    }

    return (
        <UserListProvider
            value={{
                statusModalFilters: state.statusModalFilters,
                statusModalChangePassword: state.statusModalChangePassword,
                searchUserQuery: state.searchUserQuery,
                filterStatus: filterStatus,
                data: state.data,
                loading: state.loading,
                error: state.error,
                changePasswordInput: state.changePasswordInput,
                dispatch: dispatch,
                displayColumns: state.displayColumns,
                school: state.school,
                handleSearch: handleSearch,
                handleInput: handleInput,
                handleModalFilters: handleModalFilters,
                handleSearchUserQuery: handleSearchUserQuery,
                handleModalChangePassword: handleModalChangePassword,
                handleInputChangePassword: handleInputChangePassword,
                handleResetFilter: handleResetFilter,
                handleCTAFilter: handleCTAFilter,
                handleCTAChnagePassword: handleCTAChangePassword,
                optionsTable: optionsTable,
                handleDelete: handleDelete,
                tabIndex: tableIndex,
                isAdmin,
                selectedUser,
                schoolId,
                handleDeactivated: actionDeactivated,
            }}>
            {children}
        </UserListProvider>
    )
}


export const AppProvider = ({children}) => {
    return(
      <Provider>
         <UserListController>
             {children}
         </UserListController>
      </Provider>
      )
}