import React from 'react'
import HalamanDaftarUserDashboard from './components/UserListDashboard'
import { UserListController } from './Controller'
import { ToastProvider } from 'react-toast-notifications'

const DaftarUser = () => {
   
    return (
        <ToastProvider>
            <UserListController>
                <HalamanDaftarUserDashboard />
            </UserListController>
        </ToastProvider>
    )
}

export default DaftarUser