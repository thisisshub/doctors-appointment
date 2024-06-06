import React from "react";
import { PopupButton } from "react-calendly";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { doctors } from "./data"; // Ensure this path is correct

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "40px 20px",
  },
  card: {
    display: "flex",
    flexDirection: "row",
    borderRadius: "20px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    backgroundColor: "#fff",
    maxWidth: "80%",
    margin: "auto",
  },
  cardMedia: {
    flex: "auto",
    width: "200px",
    height: "300px",
  },
  cardContent: {
    flex: "1 1 50%",
    padding: "30px",
  },
  profileHeader: {
    marginBottom: "20px",
    fontWeight: "bold",
  },
  profileDetail: {
    marginBottom: "10px",
    fontSize: "16px",
  },
  profileDescription: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#555",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    margin: "0 10px",
    backgroundColor: "#00a2ff",
    color: "#ffffff",
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: "#008dd1",
    },
  },
}));

const DoctorProfile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const doctor = doctors.find((doc) => doc.id === parseInt(doctorId, 10));

  if (!doctor) {
    return <Typography variant="h6">Doctor not found</Typography>;
  }

  const handleBookAppointment = () => {
    navigate(`/doctor/${doctorId}/calendar`);
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h4"
            component="h2"
            className={classes.profileHeader}
          >
            {doctor.name}
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.profileDetail}
          >
            <strong>Specialty:</strong> {doctor.specialty}
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.profileDetail}
          >
            <strong>Experience:</strong> {doctor.experience} years
          </Typography>

          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.profileDetail}
          >
            <strong>Age:</strong> {doctor.age}
          </Typography>
          <br />
          <Typography
            variant="body1"
            color="textSecondary"
            className={classes.profileDescription}
          >
            <strong>About:</strong>
            <br />
            {doctor.about}
          </Typography>

          <div className={classes.buttonContainer}>
            <Button
              color="primary"
              variant="contained"
              style={{
                backgroundColor: "#000000",
                color: "#fff",
                margin: "0px 10px",
                borderRadius: "20px",
              }}
            >
              <PopupButton
                url="https://calendly.com/thisisshub/30min"
                rootElement={document.getElementById("root")}
                text="Calendly"
              />
            </Button>
            <Button
              onClick={handleBookAppointment}
              color="primary"
              variant="contained"
              style={{
                backgroundColor: "#A9A9A9",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "20px",
              }}
            >
              Cal.com
            </Button>
          </div>
        </CardContent>
        <CardMedia
          component="img"
          alt={doctor.name}
          image={doctor.imageUrl}
          title={doctor.name}
          className={classes.cardMedia}
        />
      </Card>
    </Container>
  );
};

export default DoctorProfile;
