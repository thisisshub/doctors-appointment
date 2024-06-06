import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

const DoctorCard = ({ doctor, onSelect }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardActionArea onClick={() => onSelect(doctor)}>
      <CardMedia
        component="img"
        height="140"
        image={doctor.imageUrl}
        alt={doctor.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {doctor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctor.specialty}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctor.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {doctor.about}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default DoctorCard;


