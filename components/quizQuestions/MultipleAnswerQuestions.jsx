import React from "react";
import styles from "../../styles/Questions.module.css";
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
      <div className={styles.que_text}>
        <span> {question} </span>
      </div>
      <div className={styles.option_list}>
        {answers.map((val, ind)=>{
          return (
            <label className={styles.option} key={ind}>
              <span>{val}</span>
              <input type="checkbox" onClick={() => addOrRemove(ind)} />
            </label>
          )
        })}
      </div>
    </>
  );
};

export default MultipleAnswerQuestions;
