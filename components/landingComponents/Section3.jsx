import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import "./landingComponents.css";
import styles from "../../styles/Landing.module.css";

import problemSolvingIcon from "../../resources/images/problemSolvingIcon.svg";
import skillTestingIcon from "../../resources/images/skillTestingIcon.svg";
import selfAnalysisIcon from "../../resources/images/selfAnalysisIcon.svg";
import Image from "next/image";

const itemsData = [
  {
    icon: problemSolvingIcon,
    head: "Problem Solving",
    content:
      "The three rounds of business simulation not only test the capabilities of the qualifying team for managing an entire business but also require them to come up with coherent plans of action about restocking and consumer psychology.",
  },
  {
    icon: skillTestingIcon,
    head: "Skill Testing",
    content:
      "It also requires an acute understanding of finances and business modelling providing them with opportunities to exhibit their business acumen, setting themselves apart from the rest.",
  },
  {
    icon: selfAnalysisIcon,
    head: "Self Analysis",
    content:
      "In addition to the quick-witted and savvy ideas, it also tests your real-time knowledge about the goods as well as the consumers",
  },
];

function Item({ icon, head, content }) {
  return (
    <Grid container direction="column" className={styles.section3_items}>
      <Grid item className={styles.section3_Item1}>
        <Image src={icon} alt={head} />
      </Grid>

      <Grid item className={styles.section3_Item2}>
        {head}
      </Grid>

      <Grid item className={styles.section3_Item3}>
        {content}
      </Grid>
    </Grid>
  );
}

export function Section3() {
  return (
    <Box className={styles.section3_MainContainer}>
      <Box
        display="flex"
        justifyContent="space-between"
        className={styles.section3_ItemsContainer}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row wrap",
            md: "row",
          },
        }}
      >
        {itemsData.map((data, ind) => (
          <Item key={ind} icon={data.icon} head={data.head} content={data.content} />
        ))}
      </Box>
    </Box>
  );
}
