import React from "react";
import { memo } from "react";

import styles from "../../styles/Thankyou.module.css";
import Footer from "../landing_main/Footer";
const Thankyou = () => {
  return (
    <>
      <div className={styles.thank_div}>
        <div className={styles.main_cont}>
          <div className={styles.img1}>
            <img src="/wom.png" loading="lazy" width="244" alt="" />
          </div>
          <div className={styles.main_text}>
            <div className={styles.spon}>Thank you!</div>
            <div className={styles.paralink}>
              <div className={styles.para}>
                Your quiz has been successfully submitted
              </div>
            </div>
            <div className={styles.paralink}>
              <div className={styles.para}>
                <a
                  href="https://www.instagram.com/ecell_vit/"
                  className={styles.link}
                >
                  Stay tuned on our{" "}
                  <span className={styles.ins}>Instagram</span> page for the
                  results
                  <br />‍
                </a>
              </div>
            </div>
          </div>
          <div className={styles.img2}>
            <img src="/men.png" loading="lazy" width="236" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(Thankyou);
