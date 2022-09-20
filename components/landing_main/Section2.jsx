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
          <div className={styles.about_heading}>Business Simulation Event</div>
          <div className={styles.about_para}>
            Futurepreneurs 8.0 brings back the zeal of scrutinizing business
            strategies in its 8th edition. Challenging ideas and situations
            resembling real-life conundrums are brought into the picture, to
            test the management and decision-making skills of the participants.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
