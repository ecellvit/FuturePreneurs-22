import React from "react";
import styles from "../styles/Questions.module.css";
import { useEffect, useState } from "react";

const MultipleAnswerQuestions = ({ question, answers }) => {
  //Tab has focus logic -----------------
  const [tabHasFocus, setTabHasFocus] = useState(true);
  useEffect(() => {
    const handleFocus = () => {
      console.log("Tab has focus");
      setTabHasFocus(true);
    };

    const handleBlur = () => {
      console.log("Tab lost focus");
      setTabHasFocus(false);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);
  //-------------------------------------

  const [multians, setMultians] = useState([]);
  const addOrRemove = (id) => {
    const newmultians = [...multians];
    // console.log(newmultians);
    const index = newmultians.indexOf(id);
    // console.log(index);
    if (index === -1) {
      newmultians.push(id);
    } else {
      newmultians.splice(index, 1);
    }
    setMultians(newmultians);
  };
  console.log(multians);

  return (
    <>
      <div>
        {tabHasFocus ? (
          <h2>Tab has focus ✅</h2>
        ) : (
          <h2>Tab does not have focus ⛔️</h2>
        )}
      </div>
      <section className={styles.section}>
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
      </section>{" "}
    </>
  );
};

export default MultipleAnswerQuestions;
