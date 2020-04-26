import React from 'react'

export const Container = ({children, ...props}) => {
    return (
        <div {...props} className={`m-4`}>
            {children}
        </div>
    )
}
