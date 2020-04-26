import React from 'react'

const Pagination = () => {
    return (
        <div className="row" style={{
            paddingRight: '30px'
        }}>
            <div className="col s12 x6">
                <div className="row right valign-wrapper center-align">
                    <div className="col s1">
                        <div><span><i className="material-icons prefix">keyboard_arrow_left</i></span></div>
                    </div>
                    <div className="col">
                        <ul className="pagination">
                            <li className="disabled"><a href="#!"><i className="mdi-navigation-chevron-left"></i></a></li>
                            <li className="active"><a href="#!">1</a></li>
                            <li className="waves-effect"><a href="#!">2</a></li>
                            <li className="waves-effect"><a href="#!">3</a></li>
                            <li className="waves-effect"><a href="#!">4</a></li>
                            <li className="waves-effect"><a href="#!">5</a></li>
                            <li className="waves-effect"><a href="#!"><i className="mdi-navigation-chevron-right"></i></a></li>
                        </ul>
                    </div>
                    <div className="col s1" style={{
                        marginLeft: '-30px'
                    }}>
                        <div><span><i className="material-icons prefix">keyboard_arrow_right</i></span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pagination