// SymptomForm.js
import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, Box, Typography } from '@mui/material';
import { symptomsToSpecialties, specialties } from './data';

const SymptomForm = ({ onSelectSpecialty }) => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleSymptomChange = (event) => {
    setSymptoms(event.target.value);
  };

  const handleSpecialtyChange = (event) => {
    setSelectedSpecialty(event.target.value);
    onSelectSpecialty(event.target.value);
  };

  const handleFindDoctor = () => {
    const specialty = symptomsToSpecialties[symptoms.toLowerCase()] || 'General';
    onSelectSpecialty(specialty);
  };

  return (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" gutterBottom>Enter Your Symptoms</Typography>
      <TextField
        label="Symptoms"
        variant="outlined"
        value={symptoms}
        onChange={handleSymptomChange}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleFindDoctor} sx={{ mb: 2 }}>
        Find Doctor
      </Button>
      <Typography variant="h6" gutterBottom>Or Select a Specialty</Typography>
      <Select
        value={selectedSpecialty}
        onChange={handleSpecialtyChange}
        displayEmpty
        fullWidth
        sx={{ mb: 2 }}
      >
        <MenuItem value="" disabled>Select Specialty</MenuItem>
        {specialties.map((specialty) => (
          <MenuItem key={specialty} value={specialty}>{specialty}</MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SymptomForm;
