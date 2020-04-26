import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import formatPrice from '@/app/infrastructures/misc/Utils';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#3D5770',
        color: theme.palette.common.white,
        alignSelf: 'center'
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        maxWidth: 400,
    },
});

const CustomizedTables = ({ show, rowsData, total }) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Jenis Dana</StyledTableCell>
                        <StyledTableCell align="center">Jumlah</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsData.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.data}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    {
                        show && <TableRow style={{ backgroundColor: '#00923F' }}>
                            <TableCell colSpan={1} style={{ color: '#FFFFFF' }}>Total</TableCell>
                            <TableCell align="center" style={{ color: '#FFFFFF' }}>{formatPrice(total)}</TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default CustomizedTables