import React from "react";
import { memo } from "react";

import styles from "../../styles/Img.module.css";

function DescriptiveQuestions({ question, setUserAnswer, imageSrc ,userAnswer}) {
  console.log(imageSrc);
  return (
    <>
      <div className={styles.round_instruction}>
        {imageSrc !== undefined && (
          <div className={styles.img_cont}>
            <img
              src={imageSrc}
              sizes="(max-width: 479px) 100vw, 600px"
              className={styles.qimg}
            />
          </div>
        )}

        <div className={styles.para} style={{ whiteSpace: "pre-line" }}>
          {question}
        </div>
        {/* Answers */}
        <div>
          <textarea
            className={`${styles.inp} ${styles.div_block}`}
            placeholder="Answer"
            onChange={(e) => setUserAnswer(e.target.value)}
            value={userAnswer}
          />
          {/* <div className={styles.text_block_2}>Ans.</div> */}
        </div>
      </div>
    </>
  );
}

export default memo(DescriptiveQuestions);
