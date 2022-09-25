git import React from "react";
import styles from "../styles/Questions.module.css";
import { useEffect, useState } from "react";

const MultipleAnswerQuestions = ({ ansSelect, question, answers }) => {
  const [tabHasFocus, setTabHasFocus] = useState(true);
  const [checked, setChecked] = useState(false);
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

  const [multians, setMultians] = useState([]);
  useEffect(() => {
    const newmultians = [...multians];
    const index = newmultians.indexOf(idx);
    if (index === -1) {
      newmultians.push(idx);
    } else {
      newmultians.splice(index, 1);
    }
    setMultians(newmultians);
    console.log(multians);

    function ansMultipleSelect(ind) {
      // setMultimcq([...multimcq,ind])
      multimcq?.map((currenTeam) => {
        if (Requests.findIndex((x) => x._id === currenTeam._id) === -1) {
          setRequests((prevTeamData) => {
            return [...prevTeamData, currenTeam];
          });
        }
      });
    }
  });

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
          <label class="container">
            One
            <input type="checkbox" onClick={() => addOrRemove(0)} />
            <span class="checkmark"></span>
          </label>

          <label class="container">
            Two
            <input type="checkbox" onClick={() => addOrRemove(1)} />
            <span class="checkmark"></span>
          </label>

          <label class="container">
            Three
            <input type="checkbox" onClick={() => addOrRemove(2)} />
            <span class="checkmark"></span>
          </label>

          <label class="container">
            Four
            <input type="checkbox" onClick={() => addOrRemove(3)} />
            <span class="checkmark"></span>
          </label>
          {/* <div
            onClick={() => {
              ansMultipleSelect(0);
            }}
            className={styles.option}
          >
            <span> {answers[0]} </span>{" "}
          </div>{" "}
          <div
            onClick={() => {
              ansMultipleSelect(1);
            }}
            className={styles.option}
          >
            <span> {answers[1]} </span>{" "}
          </div>{" "}
          <div
            onClick={() => {
              ansMultipleSelect(2);
            }}
            className={styles.option}
          >
            <span> {answers[2]} </span>{" "}
          </div>{" "}
          <div
            onClick={() => {
              ansMultipleSelect(3);
            }}
            className={styles.option}
          >
            <span> {answers[3]} </span>{" "}
          </div>{" "} */}
        </div>{" "}
      </section>{" "}
    </>
  );
};

export default MultipleAnswerQuestions;
