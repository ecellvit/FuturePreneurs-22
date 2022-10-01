import React from "react";
import styles from "../../styles/Img.module.css";
import { useEffect, useState } from "react";

const MultipleAnswerQuestions = ({ question, answers, setUserAnswer }) => {
  const [multiAns, setMultiAns] = useState([]);
  const addOrRemove = (id) => {
    const newMultiAns = [...multiAns];
    const index = newMultiAns.indexOf(id);
    if (index === -1) {
      newMultiAns.push(id);
    } else {
      newMultiAns.splice(index, 1);
    }
    setMultiAns(newMultiAns);
    setUserAnswer(newMultiAns);
  };

  return (
    <>
      <div className={styles.round_instruction}>
        <div className={styles.para}>{question}</div>
        {answers.map((val, ind) => {
          return (
            <label
              className={styles.div_block}
              key={ind}
              onClick={() => addOrRemove(ind)}
              style={{
                backgroundColor: multiAns.includes(ind) ? "#2cb908" : "",
              }}
            >
              <div className={styles.text_block_2}>{ind + 1}.</div>
              <div className={styles.text_block_3}>
                <strong className={styles.bold_text}>{val}</strong>
              </div>
              {/* <input
                type="checkbox"
                className={styles.text_block_2}
               
              /> */}
            </label>
          );
        })}
      </div>
    </>
  );
};

export default MultipleAnswerQuestions;
