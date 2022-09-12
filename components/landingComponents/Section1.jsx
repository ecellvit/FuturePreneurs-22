import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
// import { Link } from "react-router-dom";

// import "./landingComponents.css";
import illus1 from "../../resources/images/illus1.jpg";
import eventDate from "../../resources/images/eventDate.svg";

function EventDate() {
  return (
    <>
      <img src={eventDate} alt={"December 4th"} />
    </>
  );
}

function DaysLeft() {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const [today, setToday] = useState(new Date());
  const secondDate = new Date(2021, 11, 2);
  const [daysLeft, setDaysLeft] = useState(2);
  // console.log(today, secondDate);
  useEffect(() => {
    setDaysLeft((prevDaysLeft) =>
      Math.round(Math.abs((today - secondDate) / oneDay))
    );
  }, [today]);
  return (
    <>
      <Grid item container className="section1-text" xs>
        Registrations closed
        {/* <div class="daysLeftDate1">{daysLeft}</div> */}
        {/* <div class="daysLeftDate2">DAYS</div> */}
      </Grid>
    </>
  );
}

export function Section1() {
  return (
    <Box
      display="flex"
      className="section1-MainContainer"
      sx={{
        flexFlow: {
          xs: "column-reverse",
          sm: "row-reverse",
          md: "row",
        },
      }}
    >
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{
          width: {
            xs: "100%",
            sm: "50%",
            md: "50%",
          },
        }}
      >
        <Grid item className="section1-head">
          FuturePreneurs
        </Grid>
        <Grid item className="section1-text">
          <Typography>
            Entrepreneurship Cell, VIT brings to you Futurepreneurs 7.0, its
            business simulation competition. The event is designed to test your
            analytical thinking. Glaze up your business skills with the added
            knowledge about consumers and the trends they tend to follow. Touch
            it all up with a study of financial products and their marketing
            strategies.
          </Typography>
        </Grid>

        <Grid
          item
          container
          flexFlow="row"
          xs
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
        >
          <Grid item className="eventDate" xs={3}>
            <EventDate />
          </Grid>

          <Grid item>
            <div
              style={{
                height: "100px",
                width: "3px",
                backgroundColor: "#2D3A3A",
                borderRadius: "10px",
              }}
            />
          </Grid>

          <Grid item container xs={2}>
            <DaysLeft />
          </Grid>
        </Grid>

        <Grid item container xs justifyContent="flex-end" width="80%">
          <Grid item>
            <Box className="registerButton">
              {/* <Link */}
                {/* to="/Login"
                style={{ color: "white", textDecoration: "none" }}
              >
                Get In */}
              {/* </Link> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Box
        class="illusContainer"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={illus1} alt={"illustration"} />
      </Box>
    </Box>
  );
}
