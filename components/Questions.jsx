import React, { useEffect, useState } from "react";
import styles from "../styles/Questions.module.css";
import MultipleAnswerQuestions from "./MultipleAnswerQuestions";

function Questions(props) {
  const [question, setQuestion] = useState("1+1?");
  const [answers, setAnswers] = useState(["0", "2", "Me", "Who knows?"]);
  const [userAnswer, setUserAnswer] = useState();
  const [questionId, setQuestionId] = useState();

  const [infoBoxThere, setInfoBoxThere] = useState();
  const [quizBoxThere, setQuizBoxThere] = useState();

  const [endTime, setEndTime] = useState();
  const [curTime, setCurTime] = useState([]);

  // test team id-631785e70d683d0db6c8204e
  // error 412 means maximum questions reached

  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NGE4NmU1YTI2NDJlZjc1YzYxMmYiLCJpYXQiOjE2NjI3Mzk1MzUsImV4cCI6MTY2MjgyNTkzNX0.LCN_Y0IYsEW5oFJV9nupO7_u7hPS3quXbK768adNsa8";
  const TEAM_ID = "631785e70d683d0db6c8204e";

  const questionsLength = 5;
  const curQuestionIndex = 1;

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
        console.log(data)
      })
      .catch((err) => {});
  }

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

  useEffect(() => {
    return () => {
      clearInterval(Timer);
    };
  }, []);

  return (
    <div className={styles.quizContainer}>
      <div className={styles.start_btn}>
        <button
          onClick={() => {
            setInfoBoxThere(styles.activeInfo);
          }}
        >
          Start Quiz{" "}
        </button>{" "}
      </div>
      <div className={`${styles.info_box} ${infoBoxThere}`}>
        <div className={styles.info_title}>
          <span> Some Rules of this Quiz </span>{" "}
        </div>{" "}
        <div className={styles.info_list}>
          <div className={styles.info}>
            {" "}
            {
              "1. You will have only <span>15 seconds</span> per each question."
            }{" "}
          </div>{" "}
          <div className={styles.info}>
            {" "}
            {"2. Once you select your answer, it can't be undone."}{" "}
          </div>{" "}
          <div className={styles.info}>
            {" "}
            {"3. You can't select any option once time goes off."}{" "}
          </div>{" "}
          <div className={styles.info}>
            {" "}
            {"4. You can't exit from the Quiz while you're playing."}{" "}
          </div>{" "}
          <div className={styles.info}>
            {" "}
            {"5. You'll get points on the basis of your correct answers."}{" "}
          </div>{" "}
        </div>{" "}
        <div className={styles.buttons}>
          <button
            onClick={() => {
              setInfoBoxThere();
            }}
            className={styles.quit}
          >
            Exit Quiz{" "}
          </button>{" "}
          <button
            onClick={() => {
              startQuiz();
              setInfoBoxThere();
              setQuizBoxThere(styles.activeQuiz);
            }}
            className={styles.restart}
          >
            Continue{" "}
          </button>{" "}
        </div>{" "}
      </div>
      <div className={`${styles.quiz_box} ${quizBoxThere}`}>
        <header>
          <div className={styles.title}> Awesome Quiz Application </div>{" "}
          <div className={styles.timer}>
            <div className={styles.time_left_txt}> Time Left </div>{" "}
            <div className={styles.timer_sec}>
              {" "}
              {curTime[0]}:{curTime[1]}{" "}
            </div>{" "}
          </div>{" "}
          <div className={styles.time_line}> </div>{" "}
        </header>{" "}
        {/* <section className={styles.section}>
          <div className={styles.que_text}>
            <span> {question} </span>{" "}
          </div>{" "}
          <div className={styles.option_list}>
            <div
              onClick={() => {
                ansSelect(0);
              }}
              className={styles.option}
            >
              <span> {answers[0]} </span>{" "}
            </div>{" "}
            <div
              onClick={() => {
                ansSelect(1);
              }}
              className={styles.option}
            >
              <span> {answers[1]} </span>{" "}
            </div>{" "}
            <div
              onClick={() => {
                ansSelect(2);
              }}
              className={styles.option}
            >
              <span> {answers[2]} </span>{" "}
            </div>{" "}
            <div
              onClick={() => {
                ansSelect(3);
              }}
              className={styles.option}
            >
              <span> {answers[3]} </span>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "} */}
        <MultipleAnswerQuestions
          ansSelect={ansSelect}
          answers={answers}
          question={question}
        />
        <footer>
          <div className={styles.total_que}>
            <span
              style={{
                display: "flex",
                userSelect: "none",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontWeight: "500",
                  padding: "0 5px",
                }}
              >
                {" "}
                {curQuestionIndex}{" "}
              </p>{" "}
              of
              <p
                style={{
                  paddingLeft: "0px",
                }}
              >
                {" "}
                {questionsLength}{" "}
              </p>{" "}
              Questions{" "}
            </span>{" "}
          </div>{" "}
          <button className={styles.next_btn}> Next Question </button>{" "}
        </footer>{" "}
      </div>
      <div className={styles.result_box}>
        {" "}
        {/* <div className={styles.icon}>
                      <i className={styles.fas fa_crown}></i>
                  </div> */}{" "}
        <div className={styles.complete_text}>
          {" "}
          {"You've completed the Quiz!"}{" "}
        </div>{" "}
        <div className={styles.score_text}> </div>{" "}
        <div className={styles.buttons}>
          <button className={styles.restart}> Replay Quiz </button>{" "}
          <button className={styles.quit}> Quit Quiz </button>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Questions;
