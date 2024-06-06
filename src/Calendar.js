// Calendar.js
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { generateUnavailableDates, generateUnavailableTimes } from './utils';
import { Container, Box, Typography, MenuItem, Select, Button } from '@mui/material';

const Calendar = ({ onBook, doctorId, doctorName }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [unavailableTimes, setUnavailableTimes] = useState([]);


  const convertDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Convert time string to 'HH:mm:ss' format
  const convertTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}:00`;
  };
  
  // Convert date and time to 'YYYY-MM-DDTHH:mm:ss.000Z' format
  const convertDateTime = (dateString, timeString) => {
    const formattedDate = convertDate(dateString);
    const formattedTime = convertTime(timeString);
    return new Date(`${formattedDate}T${formattedTime}`).toISOString();
  };

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 30); // Next 30 days

    setUnavailableDates(generateUnavailableDates(startDate, endDate, 10));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setUnavailableTimes(generateUnavailableTimes());
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleBook = async () => {
    if (selectedDate && selectedTime) {
      const appointment = { date: selectedDate, time: selectedTime };
      try {
        const response = await fetch('https://api.cal.com/v1/bookings?apiKey=cal_live_557ebf0f2dd1001bee33a42e28da14d4', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            responses: {
              email: "attendee@example.com",
              name: "attendee",
              notes: "testing",
              location: {
                  optionValue: "",
                  value: "integrations:daily"
              }
          },
          user: "pro+free",
          start: convertDateTime(appointment.date, appointment.time),
          end: convertDateTime(appointment.date, appointment.time),
          eventTypeId: 0,
          eventTypeSlug: "60",
          timeZone: "America/Mazatlan",
          language: "en",
          metadata: {},
          hasHashedBookingLink: false
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        alert(`Appointment booked on ${appointment.date} at ${appointment.time} with Dr. ${doctorName}`);
        onBook(appointment);
      } catch (error) {
        alert(`There was a problem booking the appointment: ${error.message}`);
      }
    }
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          excludeDates={unavailableDates}
          inline
        />
        {selectedDate && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Select Time</Typography>
            <Select
              value={selectedTime}
              onChange={handleTimeChange}
              displayEmpty
              sx={{ minWidth: 120, mt: 1 }}
            >
              <MenuItem value="" disabled>Select Time</MenuItem>
              {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']
                .filter((time) => !unavailableTimes.includes(time))
                .map((time) => (
                  <MenuItem key={time} value={time}>{time}</MenuItem>
                ))}
            </Select>
          </Box>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime}
          sx={{ mt: 2 }}
        >
          Book Appointment
        </Button>
      </Box>
    </Container>
  );
};

export default Calendar;
