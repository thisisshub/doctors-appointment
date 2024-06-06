import React from 'react';
import { Grid } from '@mui/material';
import DoctorCard from './DoctorCard';

const DoctorList = ({ doctors, onSelect }) => (
  <Grid container spacing={2}>
    {doctors.map((doctor) => (
      <Grid item key={doctor.id} xs={12} sm={6} md={4}>
        <DoctorCard doctor={doctor} onSelect={onSelect} />
      </Grid>
    ))}
  </Grid>
);

export default DoctorList;
