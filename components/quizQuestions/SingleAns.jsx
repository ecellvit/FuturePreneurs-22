import React from "react";
import styles from "../../styles/Questions.module.css";
import { useEffect, useState } from "react";

const SingleAns = ({ question, answers, setUserAnswer }) => {
  const [ans, setAns] = useState([]);
  
  const ansSelect = (ind) => {
    setAns(ind);
    setUserAnswer([ind]);
  };

  return (
    <>
      <div className={styles.que_text}>
        <span> {question} </span>
      </div>
      <div className={styles.option_list}>
        {answers.map((val, ind)=>{
          return(<div onClick={() => {
              ansSelect(3);
            }}
            className={styles.option}
            key={ind}
          >
            <span> {answers?answers[ind]:ind} </span>
          </div>)
        })}
      </div>
    </>
  );
};

export default SingleAns;