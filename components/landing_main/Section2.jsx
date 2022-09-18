import React from "react";
import styles from "../../styles/Landingr.module.css";
const Section2 = () => {
  return (
    <div className={`${styles.sec_2}`}>
      <div className={styles.legs_wrapper}>
        <img src="gradient.svg" width="359" className={styles.gradient_r} />
        <img src="legs.svg" className={styles.legs} />
      </div>
      <img src="h.svg" width="300" className={styles.abt_img} />
      <div className={styles.about_wrapper}>
        <div className={styles.about_img}>
          <img src="laptop_boy.svg" width="360" className={styles.image_10} />
        </div>
        <div className={styles.about_text}>
          <div className={styles.about_heading}>Business Simulation Game</div>
          <div className={styles.about_para}>
            Business Simulation GameLorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
            <br />
            <br /> Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.
            <br />
            <br /> Excepteur sint occaecat cupidatat non proident, sunt in culpa
            qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
