import React from "react";
import styles from "../../styles/Landingr.module.css";
const Section4 = () => {
  return (
    <div className={`${styles.sec_4}`}>
      <img src="dff.svg" width="322" className={styles.image_11} />
      <div className={styles.card_container}>
        <div className={styles.skills_card}>
          <div className={styles.div_img}>
            <img src="laptop.svg" className={styles.image_12} />
          </div>
          <div className={styles.div_head}>Problem Solving</div>
          <div className={styles.div_para}>
            You know the quest, but do you know the path? Let your skill and
            spirit lead your way, and help you identify your problem, define it.
            With your team, find alternatives, prioritize what’s important and
            implement the solution in the best possible way.
          </div>
        </div>
        <div className={styles.skills_card}>
          <div className={styles.div_img}>
            <img src="man-min.png" className={styles.image_13} />
          </div>
          <div className={`${styles.div_head}`}>Skill Testing</div>
          <div className={`${styles.div_para}`}>
            Can you brainstorm your way through the impediments, test the bows
            in your arch and assess your skills in an unbiased manner when you
            face the obstacle field, that is, futurepreneurs.
          </div>
        </div>
        <div className={styles.skills_card}>
          <div className={styles.div_img}>
            <img src="marketing-min.png" className={styles.image_14} />
          </div>
          <div className={styles.div_head}>Test your mettle</div>
          <div className={styles.div_para}>
            Analyze where you stand in the buzzing world of great
            entrepreneurial minds. With an effective mindset you can find the
            key to produce the most enchanting solution for every problem.
            Competing with your peers, find out if your ship prevails the storm
            that the event brings on the table.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
