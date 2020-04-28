import React from 'react'
import AskarKauny from "@/app/container/assets/img/ziswaf/loginImage.png";

const LoadingPage = () => {

    React.useEffect(() => {
        setTimeout(() => {

        }, 500)
    }, [])

    return(
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',

            width: '100%',
            background: 'rgb(204, 228, 165)',
            minHeight: '100vh'
        }}>
            <img src={AskarKauny} width="300px" />
            <span>Loading...</span>
        </div>
    )
}

export default LoadingPage