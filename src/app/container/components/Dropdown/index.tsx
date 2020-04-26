import React from 'react'

const Dropdown = ({children, id}) => {
    return (
        <div>
            <ul id={id} className='dropdown-content'>
                {children}
            </ul>
        </div>
    )
}

export default Dropdown