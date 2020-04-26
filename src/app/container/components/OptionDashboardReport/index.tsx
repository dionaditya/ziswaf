import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OptionDashboardReport = ({ startDate, endDate, onChange }) => {

    return (
        <div className="col valign-wrapper center-align ">
            <div className="col">
                <span>from</span>
            </div>
            <div className="col">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => onChange(date)}
                    dateFormat="MMMM yyyy"
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
            <div className="col">
                to
              </div>
            <div className="col">
                <DatePicker
                    selected={endDate}
                    onChange={(date) => onChange(date)}
                    dateFormat="MMMM yyyy"
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        </div>
    )
}

export default OptionDashboardReport