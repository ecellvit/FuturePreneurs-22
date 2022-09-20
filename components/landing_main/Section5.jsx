import React from "react";
import styles from "../../styles/Landingr.module.css";
const Section5 = () => {
  return (
    <div className={`${styles.sec_5}`}>
      <img src="story_left.svg" width="300" className={styles.story_gradient} />
      <div className={styles.story_error}>
        <div className={styles.story_img_div}>
          <img src="girl_book.svg" width="262" className={styles.story_img} />
        </div>
        <div className={styles.story_text_cont}>
          <div className={styles.story_h1}>Story Behind...</div>
          <div className={styles.story_p}>
            Intending to test and invest the entrepreneurial skills of the
            participants, Futurepreneurs gives them a taste of the dilemmas
            faced in the working world, and an opportunity to challenge their
            analytical and problem solving skills amongst their peers. This
            event was built up from the scratch at the E-Cell office with the
            sole purpose of bringing real time experiences to the participant&apos;s
            desk. We have had countless participants from various colleges and
            countries including some from Ivy league colleges defining the
            success and legacy of the event.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
