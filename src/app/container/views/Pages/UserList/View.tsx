import React from 'react'
import HalamanDaftarUserDashboard from './components/UserListDashboard'
import { AppProvider } from './Controller'
import { ToastProvider } from 'react-toast-notifications'

const DaftarUser = () => {
   
    return (
        <ToastProvider>
            <AppProvider>
                <HalamanDaftarUserDashboard />
            </AppProvider>
        </ToastProvider>
    )
}

export default DaftarUser