import React from 'react'
import { EmployeeInputController } from './Controller'
import EmployeeInputScreen from './components'



const EmployeeInput = () => {
    return (
        <EmployeeInputController>
            <div className="daftar-siswa-container">
                <EmployeeInputScreen />       
            </div>
        </EmployeeInputController>
    )
}

export default EmployeeInput