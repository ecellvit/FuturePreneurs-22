import React from "react";
import styles from "../../styles/Questions.module.css";
import { useEffect, useState } from "react";

const MultipleAnswerQuestions = ({ question, answers, setUserAnswer }) => {
  const [multiAns, setMultiAns] = useState([]);
  const addOrRemove = (id) => {
    const newMultiAns = [...multiAns];
    // console.log(newMultiAns);
    const index = newMultiAns.indexOf(id);
    // console.log(index);
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
      <div className={styles.que_text}>
        <span> {question} </span>{" "}
      </div>{" "}
      <div className={styles.option_list}>
        <label className={styles.option}>
          <span>{answers[0]}</span>{" "}
          <input type="checkbox" onClick={() => addOrRemove(0)} />
        </label>

        <label className={styles.option}>
          <span>{answers[1]}</span>{" "}
          <input type="checkbox" onClick={() => addOrRemove(1)} />
        </label>

        <label className={styles.option}>
          <span>{answers[2]}</span>{" "}
          <input type="checkbox" onClick={() => addOrRemove(2)} />
        </label>

        <label className={styles.option}>
          <span>{answers[3]}</span>{" "}
          <input type="checkbox" onClick={() => addOrRemove(3)} />
        </label>
      </div>{" "}
    </>
  );
};

export default MultipleAnswerQuestions;
