import React from 'react'
import InlineCss from 'react-inline-css'

const FilterReport = () => {
    return(
        <InlineCss stylesheet={
        `
            .filter-report-container {
                display: grid;
                place-items: center center;
            }
        `
        }>
            <div className="filter-report-container">
                filterreport
            </div>
        </InlineCss>
    )
}

export default FilterReport