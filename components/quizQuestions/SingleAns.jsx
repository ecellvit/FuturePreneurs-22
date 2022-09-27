import React from "react";
import styles from "../../styles/Questions.module.css";
import { useEffect, useState } from "react";

const SingleAns = ({ question, answers, setUserAnswer }) => {
  const [ans, setAns] = useState([]);
  
  const ansSelect = (ind) => {
    setAns(ind);
    setUserAnswer(ind);
  };

  return (
    <>
      <div className={styles.que_text}>
        <span> {question} </span>
      </div>
      <div className={styles.option_list}>
        <div
          onClick={() => {
            ansSelect(0);
          }}
          className={styles.option}
        >
          <span> {answers?answers[0]:0} </span>
        </div>
        <div
          onClick={() => {
            ansSelect(1);
          }}
          className={styles.option}
        >
          <span> {answers?answers[1]:1} </span>
        </div>
        <div
          onClick={() => {
            ansSelect(2);
          }}
          className={styles.option}
        >
          <span> {answers?answers[2]:2} </span>
        </div>
        <div
          onClick={() => {
            ansSelect(3);
          }}
          className={styles.option}
        >
          <span> {answers?answers[3]:3} </span>
        </div>
      </div>
    </>
  );
};

export default SingleAns;