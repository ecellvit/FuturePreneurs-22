import React, { useEffect, useState } from "react";
import styles from "../../styles/QuestionsMatch.module.css";
import dynamic from "next/dynamic";
import zIndex from "@mui/material/styles/zIndex";

const LineTo = dynamic(() => import("react-lineto"), {
  ssr: false,
});

function MatchingType({ question, answers, setUserAnswer }) {
  // console.log(answers);
  // const [question, setQuestion] = useState(["xyz", "abc", "def", "hef"]);
  // const [answers, setAnswers] = useState(["gufguef", "yegfue", "fuefu", "ueu"]);
  // const [counter, setCounter] = useState(0);
  const [answerByUser, setAnswerByUser] = useState([]);
  const [toSendAnswer, setToSendAnswer] = useState([]);
  const ulStyle = {
    width: "230px",
    background: "aliceblue",
    border: "1px solid #84c5fe",
    borderRadius: "5px",
    padding: "8px 15px",
    fontSize: "17px",
    marginBottom: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    /* display: inline-flex; */
    alignItems: "left",
    justifyContent: "space-between",
  };
  const [userQuestion, setUserQuestion] = useState([]);
  const [position, setPosition] = useState([]);
  const [lengthy, setLengthy] = useState();
  const [testArray, settestArray] = useState([]);

  function handleQuestionClick(number) {
    console.log("called");
    console.log(userQuestion.indexOf(number));
    if (userQuestion.indexOf(number) !== -1) {
      HandleDoubleClick(userQuestion.indexOf(number));
    } else {
      if (userQuestion.length === answerByUser.length) {
        setUserQuestion((prevUserQuestion) => [...prevUserQuestion, number]);
        console.log(answerByUser);
        console.log(userQuestion);
      }
    }
  }

  function handleAnswerClick(number) {
    if (answerByUser.length === question.length) {
      if (answerByUser.indexOf(number) === -1) {
        setAnswerByUser((prevAnswerByUser) => {
          prevAnswerByUser.splice(-1, 1, number);
          return prevAnswerByUser;
        });
      }
    } else {
      if (answerByUser.indexOf(number) !== -1) {
        // HandleDoubleClick(answerByUser.indexOf(number));
        return;
      }
      if (answerByUser.length + 1 === userQuestion.length) {
        setAnswerByUser((prevAnswerByUser) => [...prevAnswerByUser, number]);
        console.log(answerByUser);
        console.log(userQuestion);
      }
    }
  }

  function HandleDoubleClick(positioner) {
    answerByUser.splice(positioner, 1);
    userQuestion.splice(positioner, 1);
    testArray.pop();
  }

  useEffect(() => {
    if (
      answerByUser.length === userQuestion.length &&
      answerByUser.length > 0 &&
      userQuestion.length > 0
    ) {
      setLengthy(userQuestion.length);
      if (answerByUser.length === question.length) {
        setToSendAnswer([]);

        for (let i = 0; i < question.length; i++) {
          position[i] = userQuestion.indexOf(i);
          setToSendAnswer((prevToSendAnswer) => {
            {
              return [...prevToSendAnswer, answerByUser[position[i]]];
            }
            // return prevToSendAnswer;
          });
        }

        console.log("Meow Meow");

        console.log(toSendAnswer);
        setUserAnswer(toSendAnswer);
      } else {
        setToSendAnswer([]);
        setUserAnswer(toSendAnswer);
      }
      // console.log(lengthy);
    }

    // //console.log(length);
    // //console.log(answerByUser);
    // //console.log(userQuestion);

    if (lengthy != undefined && testArray.indexOf(lengthy - 1) === -1) {
      settestArray((prevArray) => [...prevArray, lengthy - 1]);
    }
    //console.log(testArray);
  }, [answerByUser, userQuestion, lengthy]);

  console.log(question);

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.match_list}>
          {question.map((ques) => {
            return (
              <div>
                <div
                  className={styles.quesans}
                  onClick={() => {
                    console.log("clicked");
                    console.log(question.indexOf(ques));

                    handleQuestionClick(question.indexOf(ques));
                    console.log(userQuestion.indexOf(ques));
                  }}
                >
                  <span className={styles.quest}>{ques}</span>
                  <div
                    className={
                      styles[
                        `dot${userQuestion.indexOf(question.indexOf(ques))}`
                      ]
                    }
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.option_list}>
          {answers.map((ans) => {
            return (
              <div
                className={styles.quesans}
                onClick={() => {
                  console.log("clicked");
                  handleAnswerClick(answers.indexOf(ans));
                }}
              >
                <span className={styles.answ}>{ans}</span>
                <div
                  className={
                    styles[`dot${answerByUser.indexOf(answers.indexOf(ans))}`]
                  }
                ></div>
              </div>
            );
          })}
        </div>{" "}
      </section>{" "}
    </div>
  );
}

export default MatchingType;
