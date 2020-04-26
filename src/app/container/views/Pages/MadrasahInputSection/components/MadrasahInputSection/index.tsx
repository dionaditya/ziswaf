import React from 'react'
import BackNavigation from "@/app/container/components/BackNav";
import SubNavTitle from '@/app/container/components/SubNavTitle'
import SectionInput from './InputSection'
import { ToastProvider } from 'react-toast-notifications'
import GridItem from '@/app/container/commons/Grid/GridItem'


const HalamanInputUser = () => {
    return (
        <React.Fragment>
            <ToastProvider>
                <GridItem xs={12} sm={12} md={12} className="daftar-siswa-container__sub-nav light-green">
                <BackNavigation title="Input Ma'had" />
                </GridItem>
                <SectionInput />
            </ToastProvider>
        </React.Fragment>
    )
}

export default HalamanInputUser