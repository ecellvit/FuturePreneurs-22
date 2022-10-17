import React from "react";
import styles from "../../styles/Landingr.module.css";
import Image from "next/image";
import MG from "./MG.jpeg";
import ELM from "./ELM.jpeg";
import WF from "./WF.png";
import WSS from "./WSS.jpg";
import TIIM from "./TIIM.JPG";
import BN from "./BN.png";
import ES from "./ES.png";
import IDP from "./IDP.jpg";
import OFW from "./OFW.jpeg";
import VESIT from "./VESIT.jpg";

import { Rotating } from "../animationComponents/Rotating";

const Section6 = () => {
  return (
    <div className={styles.sec_6}>
      <div className={styles.sponsors_h1}> Sponsors</div>
      <img src="dffj.svg" width="288.5" className={styles.spon_grad_r} />
      <img src="gs.svg" width="303.5" className={styles.spon_grad_l} />
      <div className={styles.Sponsors}>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href="https://www.instagram.com/magizham_gardens/" target="_blank" rel="noreferrer">
            <Image src={MG} />
          </a>
        </div>

        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href="https://www.elearnmarkets.com/" target="_blank" rel="noreferrer">
            <Image src={ELM} />
          </a>
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href="https://www.wolfram.com/" target="_blank" rel="noreferrer">
            <Image src={WF} />
          </a>
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a href="https://wharfstreetstudios.com/" target="_blank" rel="noreferrer">
            <Image src={WSS} />
          </a>
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://www.barbequenation.com/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src={BN} />
          </a>
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://www.eatsure.com/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image src={ES} />
          </a>
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={IDP} />
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image src={OFW} />
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href="https://online.2iim.com/cat-exam-preparation-online-cat-coaching.shtml"
            target="_blank"
            rel="noreferrer"
          >
            <Image src={TIIM} />
          </a>
        </div>
        <div
          className={styles.Cards}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <a href="https://instagram.com/ve_sit_restaurant" target="_blank" rel="noreferrer">
            <Image src={VESIT} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Section6;
