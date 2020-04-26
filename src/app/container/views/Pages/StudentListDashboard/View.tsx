import React from 'react'
import StudentListDashboardPage from './components/HalamanDaftarSiswaDashboard'
import { AppProvider } from './Controller'


const StudentLishDasboard = () => {

    return (
        <AppProvider>
            <div className="daftar-siswa-container">
                <StudentListDashboardPage />
            </div>
        </AppProvider>
    )
}

export default StudentLishDasboard