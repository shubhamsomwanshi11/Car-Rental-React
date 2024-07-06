import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

const Loader = () => {
    const loaderWrapperStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100vw', 
    }

    return (
        <div style={loaderWrapperStyle}>
            <MutatingDots
                visible={true}
                height="100"
                width="100"
                color="#4fa94d"
                secondaryColor="#4fa94d"
                radius="12.5"
                ariaLabel="mutating-dots-loading"
            />
        </div>
    )
}

export default Loader
