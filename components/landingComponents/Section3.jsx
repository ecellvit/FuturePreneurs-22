import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// import "./landingComponents.css";
import problemSolvingIcon from "../../resources/images/problemSolvingIcon.svg";
import skillTestingIcon from "../../resources/images/skillTestingIcon.svg";
import selfAnalysisIcon from "../../resources/images/selfAnalysisIcon.svg";

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
    <Grid container direction="column" className="section3-items">
      <Grid item className="section3-Item1">
        <img src={icon} alt={head} />
      </Grid>

      <Grid item className="section3-Item2">
        {head}
      </Grid>

      <Grid item className="section3-Item3">
        {content}
      </Grid>
    </Grid>
  );
}

export function Section3() {
  return (
    <Box className="section3-MainContainer">
      <Box
        display="flex"
        justifyContent="space-between"
        className={"section3-ItemsContainer"}
        sx={{
          flexFlow: {
            xs: "column",
            sm: "row wrap",
            md: "row wrap",
          },
        }}
      >
        {itemsData.map((data) => (
          <Item icon={data.icon} head={data.head} content={data.content} />
        ))}
      </Box>
    </Box>
  );
}
