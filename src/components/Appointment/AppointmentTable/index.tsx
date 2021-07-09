import React from 'react';

import Table from '@material-ui/core/Table';
import { Box, Typography } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete';
import { format, differenceInMinutes } from 'date-fns'

import { Appointment } from '../../../shared/types/appointment';

import { useStyles } from './style';

interface Props {
  data: Appointment[];
  remove: (id: string) => void
}

export const AppointmentTable: React.FC<Props> = ({data, remove}) => {
  const classes = useStyles();

  if (!data.length) {
    return (
      <Box className={classes.centerBox}>
        <Typography variant="h4">
          No appointments yet
        </Typography>
      </Box>
    )
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient</TableCell>
            <TableCell align="right">Start date</TableCell>
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Clinicial Name</TableCell>
            <TableCell/>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => {
            const diff = differenceInMinutes(new Date(item.endDate), new Date(item.startDate));
            return (
              <TableRow
                key={item.id}
                className={diff > 60 ? classes.highlightedRow : ''}>
                <TableCell component="th" scope="row">
                  {item.patient.name}
                </TableCell>
                <TableCell align="right">{format(new Date(item.startDate), 'dd/MM/yyyy')}</TableCell>
                <TableCell align="right">{format(new Date(item.startDate), 'hh:mm')}</TableCell>
                <TableCell align="right">{diff}</TableCell>
                <TableCell align="right">{item.clinicianName}</TableCell>
                <TableCell align="right">
                  <DeleteIcon onClick={remove.bind(null, item.id)} cursor='pointer'/>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
