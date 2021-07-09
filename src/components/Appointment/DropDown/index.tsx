import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { GroupType } from '../../../shared/types/appointment';

import { useStyles } from './style';

interface Props {
  groupHandler: (type: string) => void;
  type: GroupType;
}

export const DropDown: React.FC<Props> = ({groupHandler, type}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    groupHandler(event.target.value as string);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-label">Group by</InputLabel>
      <Select
        labelId="select-label"
        id="dropdown"
        value={type}
        onChange={handleChange}
      >
        <MenuItem value={GroupType.day}>Appointment day</MenuItem>
        <MenuItem value={GroupType.clinician}>Clinican name</MenuItem>
      </Select>
    </FormControl>)
}
