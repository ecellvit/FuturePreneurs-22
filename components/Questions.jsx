import React, { useEffect, useState } from "react";
import styles from "../styles/Questions.module.css";

function Questions(props) {
  const [question, setQuestion] = useState("1+1?");
  const [answers, setAnswers] = useState([
    "0",
    "2",
    "Me",
    "who know?",
  ]);
  const [userAnswer, setUserAnswer] = useState();

  const [infoBoxThere, setInfoBoxThere] = useState();
  const [quizBoxThere, setQuizBoxThere] = useState();

  // test team id-631785e70d683d0db6c8204e

  const questionsLength = 5;
  const curQuestionIndex = 1;

  function ansSelect(ind){
    console.log(ind)
  }

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/team/quiz/631785e70d683d0db6c8204e`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NGE4NmU1YTI2NDJlZjc1YzYxMmYiLCJpYXQiOjE2NjI1NTk5NzcsImV4cCI6MTY2MjY0NjM3N30.Y3-O55tgGGc_NgHVwG-ehIZ2UpIhpW22V14F3-R04v4`,
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // setQuestion((}prevQuestion) => [...prevQuestion, data.questions[0]]);
        console.log(data);
      })
      .catch((err) => {
        console.log("errrr", err);
      });

    // const start_btn = document.querySelector(".start_btn button");
    // const info_box = document.querySelector(".info_box");
    // console.log(start_btn);
    // const exit_btn = info_box.querySelector(".buttons .quit");
    // const continue_btn = info_box.querySelector(".buttons .restart");
    // const quiz_box = document.querySelector(".quiz_box");
    // const result_box = document.querySelector(".result_box");
    // const option_list = document.querySelector(".option_list");
    // const time_line = document.querySelector("header .time_line");
    // const timeText = document.querySelector(".timer .time_left_txt");
    // const timeCount = document.querySelector(".timer .timer_sec");

    // start_btn.onclick = ()=>{
    //   info_box.classList.add("activeInfo"); //show info box
    // }
  }, []);

  return (
    <div className={styles.quizContainer}>
      <div className={styles.start_btn}>
        <button onClick={()=>{setInfoBoxThere(styles.activeInfo)}}>Start Quiz</button>
      </div>

      <div className={`${styles.info_box} ${infoBoxThere}`}>
        <div className={styles.info_title}>
          <span>Some Rules of this Quiz</span>
        </div>
        <div className={styles.info_list}>
          <div className={styles.info}>
            {"1. You will have only <span>15 seconds</span> per each question."}
          </div>
          <div className={styles.info}>
            {"2. Once you select your answer, it can't be undone."}
          </div>
          <div className={styles.info}>
            {"3. You can't select any option once time goes off."}
          </div>
          <div className={styles.info}>
            {"4. You can't exit from the Quiz while you're playing."}
          </div>
          <div className={styles.info}>
            {"5. You'll get points on the basis of your correct answers."}
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={()=>{setInfoBoxThere()}} className={styles.quit}>Exit Quiz</button>
          <button onClick={()=>{
            setInfoBoxThere();
            setQuizBoxThere(styles.activeQuiz)
            }} className={styles.restart}>Continue</button>
        </div>
      </div>

      <div className={`${styles.quiz_box} ${quizBoxThere}`}>
        <header>
          <div className={styles.title}>Awesome Quiz Application</div>
          <div className={styles.timer}>
            <div className={styles.time_left_txt}>Time Left</div>
            <div className={styles.timer_sec}>15</div>
          </div>
          <div className={styles.time_line}></div>
        </header>
        <section className={styles.section}>
          <div className={styles.que_text}>
            <span> {question} </span>
          </div>
          <div className={styles.option_list}>
            <div onClick={()=>{ansSelect(0)}} className={styles.option}><span>{answers[0]}</span></div>
            <div onClick={()=>{ansSelect(1)}} className={styles.option}><span>{answers[1]}</span></div>
            <div onClick={()=>{ansSelect(2)}} className={styles.option}><span>{answers[2]}</span></div>
            <div onClick={()=>{ansSelect(3)}} className={styles.option}><span>{answers[3]}</span></div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.total_que}>
            <span style={{display: 'flex', userSelect: 'none'}}>
            <p style={{fontWeight: '500', padding: "0 5px"}}>{curQuestionIndex}</p> of 
            <p style={{paddingLeft: '0px'}}> {questionsLength} </p> Questions</span>
          </div>
          <button className={styles.next_btn}>Next Question</button>
        </footer>
      </div>

      <div className={styles.result_box}>
        {/* <div className={styles.icon}>
                <i className={styles.fas fa_crown}></i>
            </div> */}
        <div className={styles.complete_text}>
          {"You've completed the Quiz!"}
        </div>
        <div className={styles.score_text}></div>
        <div className={styles.buttons}>
          <button className={styles.restart}>Replay Quiz</button>
          <button className={styles.quit}>Quit Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
