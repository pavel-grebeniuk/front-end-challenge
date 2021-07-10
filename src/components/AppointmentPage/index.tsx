import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';
import { compareAsc } from 'date-fns';

import { Appointment, GroupBy } from '../../shared/types/appointment';
import { DropDown } from './DropDown';
import { AddAppointment } from './AddAppointment/AddAppointment';
import { AppointmentTable } from './AppointmentTable';

import data from '../../../data.json';

import { useStyles } from './style';

export const AppointmentPage: React.FC = () => {
  const classes = useStyles();

  const [initData, setInitData] = useState<Appointment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [groupedBy, setGroupedBy] = useState<GroupBy>(GroupBy.none);

  const sortAppointments = (arr: Appointment[]) => {
    return [...arr].sort(((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate))))
  }

  const addAppointment = (item: Appointment) => {
    setInitData((data) => [...data, item])
  }

  const removeAppointment = (id: string) => {
    setInitData((data) => {
      const filtered = data.filter(item => item.id !== id);
      return filtered;
    });
  }

  const groupByHandler = (type: GroupBy) => {
    setGroupedBy(type);
  }

  useEffect(() => {
    setInitData(data as Appointment[]);
  }, [])

  useEffect(() => {
    const sortedData = sortAppointments(initData) as Appointment[];
    switch (groupedBy) {
      case GroupBy.clinicial: {
        const appointments = sortedData.sort((a, b) => a.clinicianName.localeCompare(b.clinicianName));
        setAppointments(appointments);
        break;
      }
      case GroupBy.day:
      default: {
        setAppointments(sortedData);
      }
    }
  }, [initData, groupedBy])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <AddAppointment addHandler={addAppointment}/>
        </Grid>
        <Grid item md={9}>
          <DropDown
            groupedBy={groupedBy}
            setGroupedBy={groupByHandler}
          />
          <AppointmentTable data={appointments} remove={removeAppointment} groupedBy={groupedBy}/>
        </Grid>
      </Grid>
    </Container>)
}
