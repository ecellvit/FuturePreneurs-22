import React, { useState, useRef } from "react";

import styles from "../../styles/Img.module.css";

function DescriptiveQuestions({ question, userAnswer, setUserAnswer }) {
  if (userAnswer.length == 0) {
    setUserAnswer("User Has Not Yet Answered The Question");
  }
  
  return (
    <>
      <div className={styles.round_instruction}>
        <div className={styles.para}>{question}</div>
        {/* Answers */}
        <div>
          <textarea
            className={`${styles.inp} ${styles.div_block}`}
            placeholder="Answer"
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          {/* <div className={styles.text_block_2}>Ans.</div> */}
        </div>
      </div>
    </>
  );
}

export default DescriptiveQuestions;
