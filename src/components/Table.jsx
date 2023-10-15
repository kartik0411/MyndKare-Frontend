import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, father, admissionNo, school, schoolClass, section, examKey, actions) {
  return { name, father, admissionNo, school, schoolClass, section, examKey, actions };
}

const rows = [
  createData('Abhishek Kumar', "Abhishek's Father", 2021, "Gyan Bharti Public School", 'X', 'A', "addfe21", "edit"),
  createData('Abhishek Kumar', "Abhishek's Father", 2021, "Gyan Bharti Public School", 'X', 'A', "addfe21", "edit"),
  createData('Abhishek Kumar', "Abhishek's Father", 2021, "Gyan Bharti Public School", 'X', 'A', "addfe21", "edit"),
  createData('Abhishek Kumar', "Abhishek's Father", 2021, "Gyan Bharti Public School", 'X', 'A', "addfe21", "edit"),
  createData('Abhishek Kumar', "Abhishek's Father", 2021, "Gyan Bharti Public School", 'X', 'A', "addfe21", "edit"),
];

export default function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Father</StyledTableCell>
            <StyledTableCell align="right">Admission No</StyledTableCell>
            <StyledTableCell align="right">School</StyledTableCell>
            <StyledTableCell align="right">School Class</StyledTableCell>
            <StyledTableCell align="right">Section</StyledTableCell>
            <StyledTableCell align="right">Exam Key</StyledTableCell>
            <StyledTableCell align="right">Actons</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.father}</StyledTableCell>
              <StyledTableCell align="right">{row.admissionNo}</StyledTableCell>
              <StyledTableCell align="right">{row.school}</StyledTableCell>
              <StyledTableCell align="right">{row.schoolClass}</StyledTableCell>
              <StyledTableCell align="right">{row.section}</StyledTableCell>
              <StyledTableCell align="right">{row.examKey}</StyledTableCell>
              <StyledTableCell align="right">{row.actions}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}