import React from 'react'
import HalamanDataSiswa from './components/StudentListInputDashboard'
import { StudentListInputController } from './Controller'


const DaftarSiswaInput = () => {
    return (
        <StudentListInputController>
                <HalamanDataSiswa />         
        </StudentListInputController>
    )
}

export default DaftarSiswaInput