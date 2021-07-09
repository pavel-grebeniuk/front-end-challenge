import React, { useEffect, useState } from 'react';

import { Container, Grid } from '@material-ui/core';
import { format, compareAsc } from 'date-fns';

import { Appointment } from '../../shared/types/appointment';
import { DropDown } from './DropDown';
import { AddAppointment } from './AddAppointment/AddAppointment';
import { AppointmentTable } from './AppointmentTable';

import data from '../../../data.json';

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

  const setUniqClinicians = (arr: Appointment[]) => {
    const uniqClinicians = Array.from(new Set(arr.map((item) => item.clinicianName)));
    setClinicians(uniqClinicians);
  }

  const setUniqDays = (arr: Appointment[]) => {
    const uniqDays = Array.from(new Set(sortAppointments(arr)
    .map((item) => format(new Date(item.startDate), 'dd/MM/yyyy'))));
    setDays(uniqDays);
  }

  const addAppointment = (item: Appointment) => {
    setInitData((data) => {
        const sorted = sortAppointments([...data, item]);
        setUniqClinicians(sorted);
        setUniqDays(sorted);
        return sorted;
      }
    )
  }

  const removeAppointment = (id: string) => {
    setInitData((data) => {
      const filtered = data.filter(item => item.id !== id);
      setUniqClinicians(filtered);
      setUniqDays(filtered);
      return filtered;
    });
  }

  const clinicianHandler = (name: string) => {
    setSelectedClinician(name);
  }

  const selectedDayHandler = (day: string) => {
    setSelectedDay(day);
  }

  useEffect(() => {
    setInitData(data as Appointment[]);
    setUniqClinicians(data as Appointment[]);
    setUniqDays(data as Appointment[]);
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
