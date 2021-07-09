import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useStyles } from './style';

interface Props {
  clinicianHandler: (name: string) => void;
  selectedDayHandler: (day: string) => void;
  clinicians: string[];
  selectedClinician: string;
  days: string[];
  selectedDay: string;
}

export const DropDown: React.FC<Props> = ({clinicianHandler, clinicians, selectedClinician, days, selectedDayHandler, selectedDay}) => {
  const classes = useStyles();

  const handleClinicianChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    clinicianHandler(event.target.value as string);
    selectedDayHandler('');
  };
  const handleDayChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    selectedDayHandler(event.target.value as string);
    clinicianHandler('');
  };
  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-clinician">Clinician</InputLabel>
        <Select
          labelId="select-clinician"
          id="dropdown-clinician"
          value={selectedClinician}
          onChange={handleClinicianChange}
        >
          <MenuItem value={''}><em>NONE</em></MenuItem>
          {
            clinicians.map((clinicName) => (
              <MenuItem value={clinicName} key={clinicName}>{clinicName}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-day">Days</InputLabel>
        <Select
          labelId="select-day"
          id="dropdown-day"
          value={selectedDay}
          onChange={handleDayChange}
        >
          <MenuItem value={''}><em>NONE</em></MenuItem>
          {
            days.map((day) => (
              <MenuItem value={day} key={day}>{day}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>)
}
