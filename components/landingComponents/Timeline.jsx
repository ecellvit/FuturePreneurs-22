import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

// import "./landingComponents.css";
import styles from "../../styles/Landing.module.css";

// import HorizontalTimeline from "../../resources/images/TimelineSection.svg";
import HorizontalTimeline from "../../resources/images/TimelineNew.svg";


// import VerticalTimeline from "../../resources/images/TimelineSectionPhone.svg";
import VerticalTimeline from "../../resources/images/NewTimelinePhone.svg";
import Image from "next/image";


export function Timeline() {
  const [TimelineImage, settimelineImage] = useState(VerticalTimeline);

  useEffect(() => {
    window.addEventListener("load", () => {
      if (window.innerWidth < 1000) {
        settimelineImage(VerticalTimeline);
      } else {
        settimelineImage(HorizontalTimeline);
      }
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1000) {
        settimelineImage(VerticalTimeline);
      } else {
        settimelineImage(HorizontalTimeline);
      }
    });
    return () => {
      window.addEventListener("load", () => {
        if (window.innerWidth < 1000) {
          settimelineImage(VerticalTimeline);
        } else {
          settimelineImage(HorizontalTimeline);
        }
      });
      window.addEventListener("resize", () => {
        if (window.innerWidth < 1000) {
          settimelineImage(VerticalTimeline);
        } else {
          settimelineImage(HorizontalTimeline);
        }
      });
    };
  }, []);

  return (
    <Box className={styles.timelineContainer}>
      <Box className={styles.sectionHead}>Timeline</Box>
      <Box className={styles.timelineImageContainer}>
        <Image src={TimelineImage} alt={"Timeline"} />
      </Box>
    </Box>
  );
}
