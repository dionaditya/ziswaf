import React, { useState } from "react";
import { container } from 'tsyringe';
import { LoginPresenter } from './Presenter'
import { LoginApiRequest } from "@/data/payload/api/AuthApiRequest"
import history from '@/app/infrastructures/misc/BrowserHistory'
import { setCredential, removeAuthCredential, setUserInfo, setRememberMe, getAccessRemember } from '@/app/infrastructures/misc/Cookies';
import { isEmpty } from 'lodash';

interface InitialState {
    data: any;
    loading: boolean;
    isLogin: boolean;
    getEmail: string;
    getPassword: string;
    _onPost: Function;
    _setEmail: Function;
    _setPassword: Function;
    logoutData: Function;
    checked: boolean;
    toggleChange: (event: any) => void;
    message: string
}

const initialState = {
    data: {},
    getEmail: '',
    getPassword: '',
    token: '',
    expired: 0,
    loading: false,
    isLogin: false,
    _onPost: () => { },
    _setEmail: () => { },
    _setPassword: () => { },
    logoutData: () => { },
    checked: false,
    toggleChange: () => { },
    message: ''
}

export const AuthContext = React.createContext<InitialState>(initialState);
export const { Provider: AuthProvider } = AuthContext

export const AuthController = ({ children }) => {
    const accessRememberMe = getAccessRemember();
    const [data, setData] = useState<any>({})
    const [getEmail, setEmail] = useState<string>(!isEmpty(accessRememberMe) ? accessRememberMe?.email : '')
    const [getPassword, setPassword] = useState<string>(!isEmpty(accessRememberMe) ? accessRememberMe?.password : '')
    const [loading, setLoading] = useState<boolean>(false)
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const loginPresenter: LoginPresenter = container.resolve(LoginPresenter)

    const _postData = async () => {
        setLoading(true)
        try {
            const res = await loginPresenter.postData(new LoginApiRequest(getEmail, getPassword));
            setData(res)
            await setCredential({ token: res.token, expired: res.expired_at })
            await setUserInfo({
                data: {
                    user_id: res.user_id,
                    username: res.username,
                    status: res.status,
                    role: res.role,
                    school: res.school,
                    employee: res.employee
                }
            })
            if (checked === true) {
                setRememberMe(getEmail, getPassword)
            }
            setLoading(false)
            setIsLogin(true)
            window.location.reload()
            return res
        } catch (error) {
            setLoading(false)
            let message = 'Something wrong, please try again!';
            const { status = 0, data } = error.response
            if (status === 422 || status === 400) {
                message = data.message
            }
            setMessage(message)
            return error
        }
    }

    // Set Email
    const _setDataEmail = async (email: string) => {
        setEmail(email)
    }



    // Set Password
    const _setDataPassword = async (password: string) => {
        setPassword(password)
    }

    const logoutData = () => {
        removeAuthCredential()
        history.push('/login')
    }

    const toggleChange = (e: any) => {
        setChecked(e.target.checked)
    }

    return (
        <AuthProvider value={{ data, loading, getEmail, getPassword, _onPost: _postData, _setEmail: _setDataEmail, _setPassword: _setDataPassword, logoutData, isLogin, toggleChange, checked, message }}>
            {children}
        </AuthProvider>
    )
}
