import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';
import compareAsc from 'date-fns/compareAsc';
import { format } from 'date-fns';

import { Appointment } from '../../shared/types/appointment';
import data from '../../../data.json';
import { DropDown } from './DropDown';
import { AddAppointment } from './AddAppointment/AddAppointment';
import { AppointmentTable } from './AppointmentTable';

import { useStyles } from './style';

export const Appointments: React.FC = () => {
  const classes = useStyles();

  const [selectedClinician, setSelectedClinician] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [initData, setInitData] = useState<Appointment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [clinicians, setClinicians] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);

  const sortAppointments = (arr: Appointment[]) => {
    return [...arr].sort(((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate))))
  }

  const addAppointment = (item: Appointment) => {
    setAppointments((data) => sortAppointments([...data, item]));
  }

  const removeAppointment = (id: string) => {
    setAppointments((data) => data.filter(item => item.id !== id));
  }

  const clinicianHandler = (name: string) => {
    setSelectedClinician(name);
  }

  const selectedDayHandler = (day: string) => {
    setSelectedDay(day);
  }

  useEffect(() => {
    setInitData(data as Appointment[]);
    const uniqClinicians = Array.from(new Set(data.map((item) => item.clinicianName)));
    const uniqDays = Array.from(new Set(sortAppointments(data as Appointment[])
    .map((item) => format(new Date(item.startDate), 'dd/MM/yyyy'))));
    setDays(uniqDays);
    setClinicians(uniqClinicians);
  }, [])

  useEffect(() => {
    const sortedData = sortAppointments(initData);
    if (selectedClinician) {
      const appointments = sortedData.filter(item => item.clinicianName === selectedClinician);
      setAppointments(appointments as Appointment[]);
      return;
    }
    if (selectedDay) {
      const appointments = sortedData.filter(item => format(new Date(item.startDate), 'dd/MM/yyyy') === selectedDay);
      setAppointments(appointments as Appointment[]);
      return;
    }
    setAppointments(sortedData as Appointment[]);
  }, [initData, selectedClinician, selectedDay])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <AddAppointment addHandler={addAppointment}/>
        </Grid>
        <Grid item md={9}>
          <DropDown
            clinicianHandler={clinicianHandler}
            selectedDayHandler={selectedDayHandler}
            clinicians={clinicians}
            selectedClinician={selectedClinician}
            selectedDay={selectedDay}
            days={days}
          />
          <AppointmentTable data={appointments} remove={removeAppointment}/>
        </Grid>
      </Grid>
    </Container>)
}
