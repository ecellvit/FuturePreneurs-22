import React from "react";
import styles from "../../styles/Landingr.module.css";
import Image from "next/image";
import MG from "./MG.jpeg";
import ELM from "./ELM.jpeg";
import WF from "./WF.png";
import { Rotating } from "../animationComponents/Rotating";
import { AnimationOnScroll } from "react-animation-on-scroll";

const Section6 = () => {
  return (
    <div className={styles.sec_6}>
      <div className={styles.sponsors_h1}> Sponsors</div>
      <img src="dffj.svg" width="288.5" className={styles.spon_grad_r} />
      <img src="gs.svg" width="303.5" className={styles.spon_grad_l} />
      <div className={styles.Sponsors}>
        <div className={styles.Cards}>
          <Image src={MG} />
        </div>

        <div className={styles.Cards}>
          <Image src={ELM} />
        </div>
        <div className={styles.Cards}>
          <Image src={WF} />
        </div>
      </div>
    </div>
  );
};

export default Section6;
