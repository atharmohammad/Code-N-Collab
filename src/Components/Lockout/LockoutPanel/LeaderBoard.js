import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


function createData(name, score,) {
  return { name, score};
}

const rows = [
  createData('Tourist', 237),
  createData('Benq', 230),
  createData('Kickass', 200),
  createData('umnik', 164),
  createData('Ginger',102),
];

const DenseTable =() =>{
 

  return (
    <TableContainer component={Paper} style={{width:'100%',height:'35vh'}}>
      <Table size="small" aria-label="a dense table" >
        <TableHead>
          <TableRow>
            <TableCell><em><b>Name</b></em></TableCell>
            <TableCell align="right"><em><b>Score</b></em></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default DenseTable