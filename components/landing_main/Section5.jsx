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
            To shed light upon the unforeseen and brainstorm for the ideation of
            pragmatic remedies for technical problems, E-Cell, VIT brings to you
            its business ideation event- Futurepreneurs. During this event,
            participants will brainstorm for pragmatic solutions to the problems
            faced by startups.They will also test their knowledge in real-time
            through business simulations, made to test the trading knowledge
            besides market understanding for a precise apprehension about the
            functionality of startups.
            <br />
            Scrutinizing and authenticating the maneuvered schemes into an
            effective plan of action remains the end goal of the event.
            Futurepreneurs not only gets the participants in terms with the
            requisites for a startup but also accentuate their road map to
            success.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5;
