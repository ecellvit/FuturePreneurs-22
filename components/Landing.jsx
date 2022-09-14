import React from "react";
import Box from "@mui/material/Box";

/*Components*/
// import { Nav } from "../../components/nav";
import {
  Section1,
  Section2,
  Timeline,
  Section3,
  Section4,
  Section5,
  Section6,
} from "./landingComponents";

export function Landing() {
  return (
    <Box>
      {/* <Nav item1="About" item2="Timeline" item3="Sponsors" item4="Get In" /> */}
      <Section1 />
      <Section2 />
      <Timeline />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
    </Box>
  );
}
