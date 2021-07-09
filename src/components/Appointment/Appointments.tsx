import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';
import compareAsc from 'date-fns/compareAsc'

import { Appointment, GroupType } from '../../shared/types/appointment';
import data from '../../../data.json';
import { DropDown } from './DropDown';
import { AddAppointment } from './AddAppointment/AddAppointment';
import { AppointmentTable } from './AppointmentTable';

import { useStyles } from './style';

export const Appointments: React.FC = () => {
  const classes = useStyles();
  const [groupType, setGroupType] = useState(GroupType.day);
  const [initData, setInitData] = useState<Appointment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (item: Appointment) => {
    setAppointments((data) => [...data, item]);
  }

  const removeAppointment = (id: string) => {
    setAppointments((data) => data.filter(item => item.id !== id));
  }

  const groupByHandler = (type: GroupType) => {
    setGroupType(type);
  }

  useEffect(() => {
    setInitData(data as Appointment[])
  }, [])

  useEffect(() => {
    switch (groupType) {
      case GroupType.clinician: {
        const sortedAppointments = [...initData].sort(((a, b) => a.clinicianName.localeCompare(b.clinicianName)));
        setAppointments(sortedAppointments as Appointment[]);
      }
        break;
      case GroupType.day:
      default: {
        const sortedAppointments = [...initData].sort(((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate))));
        setAppointments(sortedAppointments as Appointment[]);
      }
        break;
    }
  }, [groupType, initData])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <AddAppointment addHandler={addAppointment}/>
        </Grid>
        <Grid item md={9}>
          <DropDown groupHandler={groupByHandler} type={groupType}/>
          <AppointmentTable data={appointments} remove={removeAppointment}/>
        </Grid>
      </Grid>
    </Container>)
}
