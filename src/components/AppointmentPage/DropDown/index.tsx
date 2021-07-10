import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { GroupBy } from '../../../shared/types/appointment';

import { useStyles } from './style';

interface Props {
  setGroupedBy: (type: GroupBy) => void,
  groupedBy: GroupBy;
}

export const DropDown: React.FC<Props> = ({setGroupedBy, groupedBy}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: GroupBy }>) => {
    setGroupedBy(event.target.value);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-group-bn">Group by</InputLabel>
      <Select
        labelId="select-group-by"
        id="dropdown-group-by"
        value={groupedBy}
        onChange={handleChange}
      >
        <MenuItem value={GroupBy.none}><em>NONE</em></MenuItem>
        <MenuItem value={GroupBy.clinicial}>Clinicials</MenuItem>
        <MenuItem value={GroupBy.day}>Days</MenuItem>
      </Select>
    </FormControl>)
}
