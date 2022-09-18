import React from "react";
import styles from "../../styles/Landingr.module.css";
const Section3 = () => {
  return (
    <div className={`${styles.sec_3}`}>
      <img src="g_1.svg" width="297" className={styles.grad_3_l} />
      <img src="gradent.svg" width="321" className={styles.grad_3_r} />
      <div className={styles.rectangle}>
        <img src="circle-min.png" width="38" className={styles.round_img} />
        <img src="circle-min.png" width="38" className={styles.round_img} />
        <img src="circle-min.png" width="38" className={styles.round_img} />
        <img src="circle-min.png" width="38" className={styles.round_img} />
      </div>
      <div className={styles.line_container}>
        <div className={styles.line_team}></div>
        <div className={styles.line_team}></div>
        <div className={styles.line_team}></div>
        <div className={styles.line_team}></div>
      </div>
      <div className={styles.round_imgparts_container}>
        <div className={styles.img_container}>
          <div className={styles.round_text}>Round-0</div>
          <img
            src="box_web-min.png"
            width="177.5"
            className={styles.round_imgparts}
          />
        </div>
        <div className={styles.img_container}>
          <div className={styles.round_text}>Round-1</div>
          <img
            src="box_web-min.png"
            width="177.5"
            className={styles.round_imgparts}
          />
        </div>
        <div className={styles.img_container}>
          <div className={styles.round_text}>Round-2</div>
          <img
            src="box_web-min.png"
            width="177.5"
            className={styles.round_imgparts}
          />
        </div>
        <div className={styles.img_container}>
          <div className={styles.round_text}>Round-3</div>
          <img
            src="box_web-min.png"
            width="177.5"
            className={styles.round_imgparts}
          />
        </div>
      </div>
    </div>
  );
};

export default Section3;
