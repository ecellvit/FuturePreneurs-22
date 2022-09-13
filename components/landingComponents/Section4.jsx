import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import "./landingComponents.css";
import styles from "../../styles/Landing.module.css";

import illus4 from "../../resources/images/illus4.jpg";
import Image from "next/image";

export function Section4() {
  return (
    <Box
      display="flex"
      className={styles.section1_MainContainer}
      sx={{
        flexFlow: {
          xs: "column-reverse",
          sm: "row-reverse",
          md: "row",
        },
      }}
    >
      <Box className={styles.illusContainer}>
        <Image src={illus4} alt={"illustration"}></Image>
      </Box>

      <Grid
        container
        direction="column"
        spacing={2}
        sx={{
          width: {
            xs: "100%",
            sm: "60%",
            md: "60%",
          },
        }}
      >
        <Grid item className={styles.section2_head}>
          Story Behind...
        </Grid>
        <Grid item className={styles.section1_text} alignSelf="center">
          <p>
            To shed light upon the unforeseen and brainstorm for the ideation of
            pragmatic remedies for technical problems, E-Cell, VIT brings to you
            its business ideation event- Futurepreneurs. During this event,
            participants will brainstorm for pragmatic solutions to the problems
            faced by startups.They will also test their knowledge in real-time
            through business simulations, made to test the trading knowledge
            besides market understanding for a precise apprehension about the
            functionality of startups.
          </p>
          <br />
          <p>
            Scrutinizing and authenticating the maneuvered schemes into an
            effective plan of action remains the end goal of the event.
            Futurepreneurs not only gets the participants in terms with the
            requisites for a startup but also accentuate their road map to
            success.
          </p>

          <br />
        </Grid>
      </Grid>
    </Box>
  );
}
