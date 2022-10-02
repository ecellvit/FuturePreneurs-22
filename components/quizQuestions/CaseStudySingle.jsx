import React from "react";
import styles from "../../styles/Img.module.css";
import { useEffect, useState } from "react";

const CaseStudy = ({ question, answers, userAnswer, setUserAnswer, text }) => {
  const [ans, setAns] = useState([]);
  const [selected, setSelected] = useState();
  const ansSelect = (ind) => {
    setAns(ind);
    setUserAnswer([ind]);
    setSelected(ind);
  };

  useEffect(() => {
    if (userAnswer.length === 0) {
      setAns([]);
      setSelected();
    }
  }, [userAnswer]);

  return (
    <>
      <div className={styles.round_instruction}>
        <div className={styles.para}>
          <span> {text} </span>
        </div>
        <div className={styles.para}>{question}</div>
        {/* Answers */}
        <div>
          {answers.map((val, ind) => {
            return (
              <div
                className={styles.div_block}
                onClick={() => {
                  ansSelect(ind);
                }}
                key={ind}
                style={{ backgroundColor: ind === selected ? "#8a2be2" : "" }}
              >
                <div className={styles.text_block_2}>{ind + 1}.</div>
                <div className={styles.text_block_3}>
                  <strong className={styles.bold_text}>
                    {answers ? answers[ind] : ind}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CaseStudy;
