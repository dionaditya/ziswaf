import React, { useState, useEffect } from 'react';

export const Button = ({ type = 'primary', size = 'small', children, ...props }) => {
    const typesColor: any = [
        {
            type: 'primary',
            color: 'blue'
        },
        {
            type: 'danger',
            color: 'red'
        },
        {
            type: 'secondary',
            color: 'gray'
        },
        {
            type: 'success',
            color: 'green'
        },
        {
            type: 'warning',
            color: 'yellow'
        },
        {
            type: 'info',
            color: 'indigo'
        },
    ]
    const [items, setItems] = useState<any>('')
    useEffect(() => {
        setItems(typesColor.find(x => x.type === type).color)
    }, [])
    return (
        <button {...props} className={`btn btn-${size} bg-${items}-500 hover:bg-${items}-600 text-white py-2 px-4 mx-1 rounded`}>
            {children}
        </button>
    )
}