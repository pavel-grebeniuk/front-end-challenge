export interface Appointment {
  id: string;
  startDate: string;
  endDate: string;
  clinicianName: string;
  patient: Patient;
  status: AppointmentStatus;
}

export interface Patient {
  id: string;
  name: string;
}

export enum AppointmentStatus {
  active = 'ACTIVE',
  canceled = 'CANCELLED'
}

export interface RawAppointment {
  clinicianName: string;
  patientName: string;
  startDate: Date;
  endDate: Date;
}

export enum GroupBy {
  clinicial = 'CLINICIAL',
  day = 'DAY',
  none = '',
}
