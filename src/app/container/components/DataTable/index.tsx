import React from 'react'
import MUIDataTable from "mui-datatables";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CircularProgress  } from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
        MuiTableRow: {
            root: {
                '&:nth-of-type(even)': {
                    backgroundColor: '#EFF2F5',
                }
            },
        },
    }
});



const TableDataSiswa = ({ loading, data, column, children, options}) => {
    const columns = [...column, {
        label: '',
        name: '',
        options: {
            filter: true,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => (
                <tr>
                    {children}
                </tr>
            )
         }   
        }
    ]


    return (
        <MuiThemeProvider theme={theme}>
            <MUIDataTable
                data={data}
                columns={columns}
                options={options}
                    title={<div>
                    {loading && <CircularProgress size={24} style={{marginLeft: 15, position: 'relative', top: 4}} />}
                    </div>
                    }
                viewColumns={false}
            />

        </MuiThemeProvider>
    )


}

export default TableDataSiswa