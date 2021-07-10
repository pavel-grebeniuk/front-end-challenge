import * as React from 'react';

import { Field, Form, Formik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@material-ui/core';
import { TextField } from 'formik-material-ui';
import { DateTimePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import add from 'date-fns/add'
import Box from '@material-ui/core/Box';
import { object, string } from 'yup';

import { Appointment, AppointmentStatus, RawAppointment } from '../../../shared/types/appointment';

interface Props {
  addHandler: (data: Appointment) => void;
}

const ValidationSchema = object().shape({
  clinicianName: string()
  .required('Required'),
  patientName: string()
  .required('Required'),
});

const initialValues = {
  clinicianName: '',
  patientName: '',
  startDate: new Date(),
  endDate: add(new Date(), {hours: 1}),
}

export const AddAppointment: React.FC<Props> = ({addHandler}) => {
  const addAppointment = ({clinicianName, patientName, startDate, endDate}: RawAppointment) => {
    const newAppointment: Appointment = {
      id: uuidv4(),
      clinicianName,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      patient: {
        id: uuidv4(),
        name: patientName,
      },
      status: AppointmentStatus.active
    }
    addHandler(newAppointment);
  }
  return (
    <Formik
      validationSchema={ValidationSchema}
      initialValues={initialValues}
      onSubmit={(values, {resetForm}) => {
        addAppointment(values);
        resetForm({values: initialValues});
      }}
    >
      {({submitForm}) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Form>
            <Box margin={1}>
              <Field
                component={TextField}
                name="clinicianName"
                type="text"
                label="Clinician Name"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={TextField}
                type="text"
                label="Patient Name"
                name="patientName"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={DateTimePicker}
                name="startDate"
                label="Start Date"
              />
            </Box>
            <Box margin={1}>
              <Field
                component={DateTimePicker}
                name="endDate"
                label="End Date"
              />
            </Box>
            <Box margin={1}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitForm}
              >
                Save
              </Button>
            </Box>
          </Form>
        </MuiPickersUtilsProvider>
      )}
    </Formik>
  )
}

