import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
/**
 * Component showing all submitted data
 */
const Data = () => {
  const [rows, setRows] = useState([])

  // fetch data at loading
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)
      .then(res => res.json())
      .then(json => {
        setRows(json)
      })
  }, [])

  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      {/* --------- Table heading ----------- */}
      <TableHead>
        <TableRow>
          <TableCell>id</TableCell>
          <TableCell align="right">Date and Time</TableCell>
          <TableCell align="right">Location</TableCell>
          <TableCell align="right">Number of Ducks</TableCell>
          <TableCell align="right">Food Weight (kg)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* --------- Table content --------- */}
        {rows.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.time}</TableCell>
            <TableCell align="right">{row.location}</TableCell>
            <TableCell align="right">{row.quantity}</TableCell>
            <TableCell align="right">{row.quality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

export default Data