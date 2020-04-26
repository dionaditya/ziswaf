import React from 'react'
import BackNav from '@/app/container/components/BackNav'
import SectionInput from './InputSection'
import { ToastProvider } from 'react-toast-notifications'
import { useParams } from "react-router-dom";

const HalamanInputUser = () => {
    const { id } = useParams();
    console.log('view', id);


    return (
        <React.Fragment>
            <ToastProvider>
                {id !== undefined ?
                    <BackNav title="Input User" /> :
                    <BackNav title="Input User Baru" />}
                <SectionInput />
            </ToastProvider>
        </React.Fragment>
    )
}

export default HalamanInputUser