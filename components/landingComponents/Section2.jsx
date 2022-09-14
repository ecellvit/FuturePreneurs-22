import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import "./landingComponents.css";
import styles from "../../styles/Landing.module.css";

import illus2 from "../../resources/images/illus2.svg";
import Image from "next/image";

export function Section2() {
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
      <Box
        className="illusContainer1"
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image src={illus2} alt={"illustration"}></Image>
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
          Business Simulation Game
        </Grid>
        <Grid item className={styles.section1_text} alignSelf="center">
          <p>
            A 15-minute eliminator quiz to get you into your problem-solving
            self. The results of the quiz will make way for the best and
            eliminate the rest.
          </p>
          <p>
            To dominate the market, one needs to describe it very slowly. With
            the shortlisted participants competing against one another for the
            optimum solution, the simulation round demands the participants to
            leverage their thinking skills and put themselves into the shoes of
            entrepreneurs.
          </p>
          <p>
            So put your thinking hats on and work through the real-world
            business problems to make way for the adequate riposte. The first
            round tests your technical knowledge while the second round calls
            for prompt and instinctive entrepreneurial abilities to make
            technically sound decisions.
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}
