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
  const [questionId, setQuestionId] = useState();

  const [infoBoxThere, setInfoBoxThere] = useState();
  const [quizBoxThere, setQuizBoxThere] = useState();

  const [endTime, setEndTime] = useState();
  const [curTime, setCurTime] = useState([]);

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NGE4NmU1YTI2NDJlZjc1YzYxMmYiLCJpYXQiOjE2NjI3Mzk1MzUsImV4cCI6MTY2MjgyNTkzNX0.LCN_Y0IYsEW5oFJV9nupO7_u7hPS3quXbK768adNsa8";
  const TEAM_ID = "631785e70d683d0db6c8204e";

  const questionsLength = 5;
  const curQuestionIndex = 1;
  function handleQuestionClick(number) {
    console.log("called");
    console.log(userQuestion.indexOf(number));
    if (userQuestion.indexOf(number) != -1) {
      HandleDoubleClick(userQuestion.indexOf(number));
    }
    setUserQuestion((prevUserQuestion) => {
      {
        return [...userQuestion, number];
      }
      return prevUserQuestion;
    });
    console.log(answerByUser);
    console.log(userQuestion);
  }

  function handleAnswerClick(number) {
    if (answerByUser.indexOf(number) != -1) {
      HandleDoubleClick(answerByUser.indexOf(number));
    }

    setAnswerByUser((prevUserAnswer) => {
      {
        return [...answerByUser, number];
      }
      return prevUserAnswer;
    });
    console.log(answerByUser);
    console.log(userQuestion);
  }

  function HandleDoubleClick(positioner) {
    answerByUser.splice(positioner, 1);
    userQuestion.splice(positioner, 1);
    testArray.pop();
  }

  function ansSelect(ind) {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}api/team/quiz/${TEAM_ID}`, {
      method: "POST",
      // cors:'no-cors',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        questionId: "631787ecdd37bfa43c48b7db",
        submittedIdx: ind,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
      })
      .catch((err) => {});
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
        // position[0] = userQuestion.indexOf(0);
        // position[1] = userQuestion.indexOf(1);
        // position[2] = userQuestion.indexOf(2);
        // position[3] = userQuestion.indexOf(3);
        // toSendAnswer[position[0]] = answerByUser[position[0]];
        // toSendAnswer[position[1]] = answerByUser[position[1]];
        // toSendAnswer[position[2]] = answerByUser[position[2]];
        // toSendAnswer[position[3]] = answerByUser[position[3]];
        console.log("Meow Meow");

        console.log(toSendAnswer);
      } else {
        setToSendAnswer([]);
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

  function startQuiz() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/quiz/${TEAM_ID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == "Maximum Questions capacity reached") {
        } else if (data.message == "get question successfull") {
          //console.log(data);

          setQuestion(data.question.question);
          setAnswers(data.question.answers);
          setQuestionId(data.question._id);
          const Timer = setInterval(() => {
            const now = Date.now();
            const end = Date.parse(data.endTime);
            let minutes = Math.floor((end - now) / 1000 / 60);
            let seconds = Math.floor((end - now) / 1000) % 60;
            if (minutes.toString().length < 2) {
              minutes = "0" + minutes.toString();
            }
            if (seconds.toString().length < 2) {
              seconds = "0" + seconds.toString();
            }
            setCurTime([minutes, seconds]);
          }, 1000);
        }
      })
      .catch((err) => {});
  }

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.match_list}>
          {/* <div
            className={styles.match0}
            onClick={() => {
              handleQuestionClick(0);
            }}
          >
            <span> {question[0]} </span>{" "}
          </div>{" "}
          <div
            className={styles.match1}
            onClick={() => {
              handleQuestionClick(1);
            }}
          >
            <span> {question[1]} </span>{" "}
          </div>{" "}
          <div
            className={styles.match2}
            onClick={() => {
              handleQuestionClick(2);
            }}
          >
            <span> {question[2]} </span>{" "}
          </div>{" "}
          <div
            className={styles.match3}
            onClick={() => {
              handleQuestionClick(3);
            }}
          >
            <span> {question[3]} </span>{" "}
          </div>{" "} */}
          {question.map((ques) => {
            // console.log(styles[`match${question.indexOf(ques)}`]);
            return (
              <div>
                <div
                  className={styles[`match${question.indexOf(ques)}`]}
                  //style={ulStyle}
                  onClick={() => {
                    console.log("clicked");
                    console.log(question.indexOf(ques));

                    handleQuestionClick(question.indexOf(ques));
                    console.log(userQuestion.indexOf(ques));
                  }}
                >
                  <span>{ques}</span>
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
          {/* <div
            onClick={() => {
              handleAnswerClick(0);
            }}
            className={styles.option0}
          >
            <span> {answers[0]} </span>{" "}
          </div>{" "}
          <div
            onClick={() => {
              handleAnswerClick(1);
            }}
            className={styles.option1}
          >
            <span> {answers[1]} </span>{" "}
          </div>{" "}
          <div
            onClick={() => {
              handleAnswerClick(2);
            }}
            className={styles.option2}
          >
            <span> {answers[2]} </span>{" "}
          </div>{" "}
          <div
            onClick={() => {
              handleAnswerClick(3);
            }}
            className={styles.option3}
          >
            <span> {answers[3]} </span>{" "}
          </div>{" "} */}
          {answers.map((ans) => {
            // console.log(styles[`option${answers.indexOf(ans)}`]);
            return (
              <div
                className={styles[`option${answers.indexOf(ans)}`]}
                //style={ulStyle}
                onClick={() => {
                  console.log("clicked");
                  handleAnswerClick(answers.indexOf(ans));
                }}
              >
                <span>{ans}</span>
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
