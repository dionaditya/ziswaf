import React from 'react'
import MadrasahInputSection from './components/MadrasahInputSection'
import {UserListInputController} from './Controller'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const MadrasahInputPage = () => {
    return (
        <UserListInputController>
            <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="daftar-siswa-container">
                <MadrasahInputSection />
            </div>
            </MuiPickersUtilsProvider>
        </UserListInputController>
    )
}

export default MadrasahInputPage