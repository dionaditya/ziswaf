import React from 'react'
import Dropdown from '../Dropdown'

const collection = [1, 2, 3, 5, 6, 7, 8, 9, 10]
const columns = [1,2,3,4,5,6,7,8, 9]

const TableDataUser = ({ column, data }) => {
    return (
        <table id="page-length-option" className="display striped">
            <thead>
                <tr>
                    {
                        columns.map((column, i) => {
                            return(
                            <th key={i}>Column {i}</th>
                            )
                        })
                    }
                     <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'grid',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '0px'
                    }} className="row valign-wrapper center-align">
                        <div className="btn-flat" data-target='dropdown3'>
                            <span>
                                <i className="material-icons">more_horiz</i>
                            </span>
                        </div>
                    </div>
                </tr>
            </thead>
            <tbody>
                {
                    collection.map((value, i) => {
                        return (
                            <tr>

                                <td>NIS</td>
                                <td>Nama</td>
                                <td>Tempat lahir</td>
                                <td>NIS</td>
                                <td>Nama</td>
                                <td>Tempat lahir</td>
                                <td>NIS</td>
                                <td>Nama</td>
                                <td>Tempat lahir</td>
                                <td style={{
                                    maxWidth: '60px'
                                }}>
                                    <div style={{
                                        border: '2px solid transparent',
                                        background: 'rgba(0,0,0,0)',
                                    }}>
                                        <button className="btn-flat dropdown-trigger" data-target='dropdown3'>
                                            <span>
                                                <i className="material-icons">more_horiz</i>
                                            </span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot>
                <tr>
                {
                        columns.map((column, i) => {
                            return(
                            <th key={i}>Column {i}</th>
                            )
                        })
                    }
                </tr>
            </tfoot>
            <Dropdown id="dropdown3">
                <li style={{
                    padding: '2px 5px'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '0.5fr 1fr',
                        gridGap: '2px'
                    }}>
                        <i className="material-icons">edit</i>
                        <span>Edit</span>
                    </div>

                </li>
                <li style={{
                    padding: '2px 5px'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '0.5fr 1fr',
                        gridGap: '2px'
                    }}>
                        <i className="material-icons">edit</i>
                        <span>Ganti password</span>
                    </div>
                </li>
                <li style={{
                    padding: '2px 5px'
                }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '0.5fr 1fr',
                        gridGap: '2px'
                    }}>
                        <i className="material-icons">delete</i>
                        <span>Delete</span>
                    </div>
                </li>
            </Dropdown>
        </table>
    )
}

export default TableDataUser