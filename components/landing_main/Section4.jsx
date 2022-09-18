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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className={styles.skills_card}>
          <div className={styles.div_img}>
            <img src="man-min.png" className={styles.image_13} />
          </div>
          <div className={styles.div_head}>Skill Testing</div>
          <div className={styles.div_para}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
        <div className={styles.skills_card}>
          <div className={styles.div_img}>
            <img src="marketing-min.png" className={styles.image_14} />
          </div>
          <div className={styles.div_head}>Self Analysis</div>
          <div className={styles.div_para}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section4;
