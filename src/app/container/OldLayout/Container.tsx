import React from 'react'

const Container = ({ children }) => {
    return (
        <div id="main">
            <div className="row">
                <div className="col s12">
                    <div className="container">
                        <div className="section">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Container
