import React from 'react'
import BackNavigation from "@/app/container/components/BackNav";
import SubNavTitle from '@/app/container/components/SubNavTitle'
import TabNav from '@/app/container/components/TabNav'
import InputDataSiswaSection from '../InputStudentListSection'
import InputDataPendidikanSection from '../InputEducationDataSection'
import InputDataOrangTuaSection from '../InputParentsDataSection'
import { ToastProvider } from 'react-toast-notifications'
import qs from 'qs'
import {useLocation, useParams} from 'react-router-dom'
import TabNavDisable from '@/app/container/components/TabNavDisable';

const tabs = [
    {
        name: 'Data Siswa',
    },
    {
        name: 'Data Pendidikan',
    },
    {
        name: 'Data Orang Tua / Wali',
    },
]


const TabContent = ({ value, setValue }) => {
    return (
        <div>
            {value === 0 && <InputDataSiswaSection value={0} setValues={setValue} />}
            {value === 1 && <InputDataPendidikanSection value={1} setValues={setValue} />}
            {value === 2 && <InputDataOrangTuaSection value={2} setValues={setValue} />}
        </div>
    )
}

const HalamanInputDataSiswa = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (e, i) => {
        setValue(i)
    }
    
    const location = useLocation()
    const {id} = useParams()

    const query = qs.parse(location.search)

    const title = {
        input: 'Input Daftar Siswa',
        detail: 'Info Detail Siswa'
    }

    return (
        <ToastProvider>
            <React.Fragment>
                <BackNavigation title={query['?is_detail'] !== undefined ? title.detail : title.input} />
                {
                    query['?is_detail'] !== undefined || id !== undefined ? (
                        <TabNav
                        link={false}
                        value={value}
                        handleChange={handleChange}
                        tabs={tabs}
                        render={(render) =>
                            <TabContent value={value} setValue={setValue} />} />
                    ) : (
                        <TabNavDisable
                        link={false}
                        value={value}
                        handleChange={handleChange}
                        tabs={tabs}
                        render={(render) =>
                            <TabContent value={value} setValue={setValue} />} />
                    )
                }
              
            </React.Fragment>
        </ToastProvider>
    )
}

export default HalamanInputDataSiswa