import React from 'react'
import EmployeeDashboardPage from './components/EmployeeDashboardPage'
import { AppProvider} from './Controller'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/date-fns';

const EmployeeDashboard = () => {
    return (
        <AppProvider>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className="daftar-siswa-container">
                    <EmployeeDashboardPage />
                </div>
            </MuiPickersUtilsProvider>
        </AppProvider>
    )
}

export default EmployeeDashboard