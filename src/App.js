import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { Grid, TextField, Card, CardActions, CardContent, Typography, CardMedia, Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { doctors, symptomsToSpecialties } from './data';
import DoctorProfile from './DoctorProfile';
import Calendar from './Calendar';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  spotlight: {
    borderRadius: '8px',
    border: '2px solid #00a2ff', // Changed border style
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      '& fieldset': {
        borderColor: 'transparent',
      },
      '&:hover fieldset': {
        borderColor: '#ddd',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00a2ff',
      },
    },
  },
  gridContainer: {
    marginTop: '40px',
  },
  card: {
    maxWidth: 345,
    margin: 'auto',
    borderRadius: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  },
  cardMedia: {
    height: 150,
  },
  cardContent: {
    textAlign: 'center',
  },
}));



const DoctorList = () => {
  const classes = useStyles();
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [suggestedDoctors, setSuggestedDoctors] = useState([]);
  const navigate = useNavigate();

  const handleSymptomChange = (event, value) => {
    setSelectedSymptoms(value);
    const specialties = value.map(symptom => symptomsToSpecialties[symptom]);
    const uniqueSpecialties = [...new Set(specialties)];
    const filteredDoctors = doctors.filter(doctor => uniqueSpecialties.includes(doctor.specialty));
    setSuggestedDoctors(filteredDoctors);
  };

  const handleDoctorClick = (doctorId) => {
    navigate(`/doctor/${doctorId}`);
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={Object.keys(symptomsToSpecialties)}
            getOptionLabel={(option) => option}
            value={selectedSymptoms}
            style={{ margin: 'auto', width: '60%' }}
            onChange={handleSymptomChange}
            renderInput={(params) => (
              <TextField {...params} label="Select Symptoms" variant="outlined" fullWidth />
            )}
          />
        </Grid>
        {suggestedDoctors.map(doctor => (
          <Grid item xs={12} sm={6} md={4} key={doctor.id}>
            <Card className={classes.card}>
              <CardMedia
                component="img"
                alt={doctor.name}
                height="150"
                image={doctor.imageUrl}
                title={doctor.name}
                className={classes.cardMedia}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Specialty: {doctor.specialty}
                </Typography>
              </CardContent>
              <CardActions>
              <Button onClick={() => handleDoctorClick(doctor.id)} color="primary">
                View Profile
              </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/doctor/:doctorId" element={<DoctorProfile />} />
        <Route path="/doctor/:doctorId/calendar" element={<Calendar />} />
      </Routes>
    </Router>
  );
};

export default App;
