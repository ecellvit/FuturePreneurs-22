import React from "react";
import styles from "../../styles/Img.module.css";
import { useEffect, useState } from "react";

const CaseStudyMulti = ({
  question,
  answers,
  userAnswer,
  setUserAnswer,
  text,
}) => {
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

  useEffect(() => {
    if (userAnswer.length === 0) {
      setMultiAns(userAnswer);
    }
  }, [userAnswer]);

  return (
    <>
      <div className={styles.round_instruction}>
        <div className={styles.para}>{text}</div>
        <div className={styles.para} style={{ whiteSpace: "pre-line" }}>
          {question}
        </div>
        {answers.map((val, ind) => {
          return (
            <label
              className={styles.div_block}
              key={ind}
              onClick={() => addOrRemove(ind)}
              style={{
                backgroundColor: multiAns.includes(ind) ? "#8a2be2" : "",
              }}
            >
              <div className={styles.text_block_3}>
                <strong className={styles.bold_text}>{val}</strong>
              </div>
              {/* <input
                type="checkbox"
                className={styles.text_block_2}
                onClick={() => addOrRemove(ind)}
              /> */}
            </label>
          );
        })}
      </div>
    </>
  );
};

export default CaseStudyMulti;
