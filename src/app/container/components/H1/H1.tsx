import React from 'react'

export const H1 = ({ children, ...props }) => {
    return (
        <h1 {...props} className={`m-auto antialiased font-sans font-bold text-center`}>
           {children} 
        </h1>
    )
}
