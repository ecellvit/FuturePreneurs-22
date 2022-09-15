import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

// import "./landingComponents.css";
import styles from "../../styles/Landing.module.css";

// import HorizontalTimeline from "../../resources/images/TimelineSection.svg";
import HorizontalTimeline from "../../resources/images/TimelineNew.svg";

// import VerticalTimeline from "../../resources/images/TimelineSectionPhone.svg";
import VerticalTimeline from "../../resources/images/NewTimelinePhone.svg";
import Image from "next/image";
import useWindowSize from "../../store/useWIndowSize";

export function Timeline() {
  const [TimelineImage, settimelineImage] = useState(HorizontalTimeline);

  const size = useWindowSize();

  useEffect(() => {
    if (size?.width < 1000) {
      settimelineImage(VerticalTimeline);
    } else {
      settimelineImage(HorizontalTimeline);
    }
  }, [size]);

  return (
    <Box className={styles.timelineContainer}>
      <Box className={styles.sectionHead}>Timeline</Box>
      <Box className={styles.timelineImageContainer}>
        <Image src={TimelineImage} alt={"Timeline"} />
      </Box>
    </Box>
  );
}
