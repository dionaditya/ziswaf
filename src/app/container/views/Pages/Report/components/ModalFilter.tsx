import React, { useState, useContext } from 'react';
import DatePicker from "react-datepicker";
import { ReportContext } from '../Controller';
import UnitSelect from '@/app/container/components/UnitSelect';


const ModalFilter = () => {
    const controller = useContext(ReportContext)

    const handleFilterRegency = (val) => {
        controller.setFilterRegency(prevState => ({
            ...prevState,
            search: val
        }))
        controller.setFilterParamAdmin(prevState => ({
            ...prevState,
            filter: {
                ...prevState.filter,
                regency: val
            }
        }))
    }

    const handleFilterSchool = (val) => {
        controller.setFilterSchool(prevState => ({
            ...prevState,
            search: val
        }))
        controller.setFilterParamAdmin(prevState => ({
            ...prevState,
            filter: {
                ...prevState.filter,
                school_id: val
            }
        }))
    }

    // 
    const handleSearchData = (value) => {
        controller.getRegencyData(value)
    }

    const handleSearchSchool = (value) => {
        controller.getSchoolData(value)
    }

    const defaultValueSchool = { label: controller.filterSchool.school_name, value: controller.filterSchool.school_id }
    const startDateAdmin = controller.filterParamAdmin.filter.start_date;

    return (
        <div className="rows-filter-modal-container">
            <div className="rows-filter-modal-container">
                <div className="row">
                    <div className="col s6">
                        <p>Mulai</p>
                        <div>
                            <DatePicker
                                selected={startDateAdmin}
                                onChange={date => controller.setFilterParamAdmin(prevState => ({
                                    ...prevState,
                                    filter: {
                                        ...prevState.filter,
                                        start_date: date,
                                    }
                                }))}
                                selectsStart
                                startDate={controller.filterParamAdmin.filter.start_date}
                                endDate={controller.filterParamAdmin.filter.end_date}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                            />
                        </div>
                    </div>
                    <div className="col s6">
                        <p>Hingga</p>
                        <div>
                            <DatePicker
                                selected={controller.filterParamAdmin.filter.end_date}
                                onChange={date => controller.setFilterParamAdmin(prevState => ({
                                    ...prevState,
                                    filter: {
                                        ...prevState.filter,
                                        end_date: date,
                                    }
                                }))}
                                selectsStart
                                minDate={startDateAdmin}
                                startDate={controller.filterParamAdmin.filter.start_date}
                                endDate={controller.filterParamAdmin.filter.end_date}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <p>Unit</p>
                        <div>
                            <UnitSelect
                                valState={controller.labelSearch}
                                inputLabel="Semua Unit"
                                handleSearch={handleSearchSchool}
                                options={controller.filterDataSchool}
                                isDisabled={controller.role === 2}
                                defaultValue={controller.labelSearch}
                                handleChange={(value) => {
                                    handleFilterSchool(value.value)
                                    controller.setLabelSearch(value.label)
                                }}
                            />
                        </div>
                    </div>
                    <div className="col s6">
                        <p>Kota</p>
                        <div>
                            <UnitSelect
                                valState={controller.labelSearchRegency}
                                inputLabel="Kota"
                                handleSearch={handleSearchData}
                                options={controller.filterDataRegency}
                                isDisabled={controller.role === 2}
                                defaultValue={controller.labelSearchRegency}
                                handleChange={(value) => {
                                    handleFilterRegency(value.value)
                                    controller.setLabelSearchRegency(value.label)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalFilter