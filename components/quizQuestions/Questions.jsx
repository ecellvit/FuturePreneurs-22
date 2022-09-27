import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import myContext from "../../store/myContext";
import styles from "../../styles/Questions.module.css";
import Loading from "../Loading";
import DescriptiveQuestions from "./DescriptiveQuestions";
import MatchingType from "./MathingType";
import MultipleAnswerQuestions from "./MultipleAnswerQuestions";
import SingleAns from "./SingleAns";

function Questions(props) {
  const [question, setQuestion] = useState("1+1?");
  const [answers, setAnswers] = useState(["0", "2", "Me", "Who knows?"]);
  const [userAnswer, setUserAnswer] = useState([]);
  const [setNum, setSetNum] = useState();
  const [questionNum, setQuestionNum] = useState();
  const [questionType, setQuestionType] = useState();

  const [indexNum, setIndexNum] = useState(1);
  const [quizDone, setQuizDone] = useState(false);

  const [infoBoxThere, setInfoBoxThere] = useState();
  const [quizBoxThere, setQuizBoxThere] = useState();

  const [endTime, setEndTime] = useState();
  const [curTime, setCurTime] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const myCtx = useContext(myContext);
  const { data: session } = useSession();

  const TEAM_ID = myCtx.teamId;

  const MAX_QUESTIONS = 26;

  let Timer;

  function getNextQuestion() {
    setIndexNum(prev=>prev+1)
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/quiz/${TEAM_ID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == "Time Limit Reached") {
          console.log("Time Limit Reached")
          setQuizDone("Time Limit Reached")
        } else if (data.message == "Maximum Questions capacity reached") {
          console.log("Maximum Questions capacity reached")
          setQuizDone("Maximum Questions capacity reached")
        } else {
          console.log(data.questionType, data);
          setQuestion(data.question);
          setAnswers(data.options);
          setQuestionType(data.questionType);
          setSetNum(data.setNum);
          setQuestionNum(data.questionNum);
        }
        setIsLoading(false);
      })
      .catch((err) => {});
  }

  function submitAnswer() {
    console.log(userAnswer);
    console.log(question);
    let respBody = {
      setNum: setNum,
      questionNum: questionNum,
    };
    if (questionType === 5) {
      respBody["descriptiveAnswer"] = userAnswer;
    } else {
      respBody["answerIdxs"] = userAnswer;
    }
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/quiz/${TEAM_ID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(respBody),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data,"dfddfddfdf");
        if (data.message==="Time Limit Reached") {
          console.log("time exceeded")
        } else if (data.message==="Submitted Answer Successfully"){
          setUserAnswer([]);
          getNextQuestion();
        }
      })
      .catch((err) => {});
  }

  function startQuiz() {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/quiz/${TEAM_ID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message == "Time Limit Reached") {
          console.log("Time Limit Reached")
          setQuizDone("Time Limit Reached")
        } else if (data.message == "Maximum Questions capacity reached") {
          console.log("Maximum Questions capacity reached")
          setQuizDone("Maximum Questions capacity reached")
        } else {
          console.log(data);
          setQuestion(data.question);
          setAnswers(data.options);
          setQuestionType(data.questionType);
          setSetNum(data.setNum);
          setQuestionNum(data.questionNum);
          Timer = setInterval(() => {
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
          Start Quiz
        </button>
      </div>
      <div className={`${styles.info_box} ${infoBoxThere}`}>
        <div className={styles.info_title}>
          <span> Some Rules of this Quiz </span>
        </div>
        <div className={styles.info_list}>
          <div className={styles.info}>
            {"1. You will have only 15 seconds per each question."}
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
          <button
            onClick={() => {
              setInfoBoxThere();
            }}
            className={styles.quit}
          >
            Exit Quiz
          </button>
          <button
            onClick={() => {
              startQuiz();
              setInfoBoxThere();
              setQuizBoxThere(styles.activeQuiz);
            }}
            className={styles.restart}
          >
            Continue
          </button>
        </div>
      </div>
      <div className={`${styles.quiz_box} ${quizBoxThere}`}>
        <header>
          <div className={styles.title}> Awesome Quiz Application </div>
          <div className={styles.timer}>
            <div className={styles.time_left_txt}> Time Left </div>
            <div className={styles.timer_sec}>
              {curTime[0]}:{curTime[1]}
            </div>
          </div>
          <div className={styles.time_line}> </div>
        </header>

          <section className={styles.section}>
            {isLoading ? <Loading/> :
              <>
            {quizDone ? quizDone : <>
              {questionType==0 && <SingleAns
                question={question}
                answers={answers}
                setUserAnswer={setUserAnswer}
              />}
              {questionType==1 && <MultipleAnswerQuestions
                question={question}
                answers={answers}
                setUserAnswer={setUserAnswer}
              />}
              {questionType==2 && <MatchingType
                question={question}
                answers={answers}
                setUserAnswer={setUserAnswer}
              />}
              {questionType==3 && <SingleAns
                question={question}
                answers={answers}
                setUserAnswer={setUserAnswer}
              />}
              {questionType==4 && <MultipleAnswerQuestions
                question={question}
                answers={answers}
                setUserAnswer={setUserAnswer}
              />}
              {questionType==5 && <DescriptiveQuestions
                question={question}
                answers={answers}
                setUserAnswer={setUserAnswer}
              />}
            </>}
              </>}
          </section>

        <footer>
          <div className={styles.total_que}>
            <span style={{
                display: "flex",
                userSelect: "none",
                alignItems: "center",
              }}>
              <p style={{
                  fontWeight: "500",
                  padding: "0 5px",
                }}
              > {questionNum}</p> of
              <p style={{
                  paddingLeft: "0px",
                }}> {MAX_QUESTIONS}
              </p> Questions
            </span>
          </div>
          <button
            className={isLoading ? styles.next_btn_submitting : styles.next_btn}
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true)
              submitAnswer();
            }}
          >
            {" "}
            Next Question{" "}
          </button>
        </footer>
      </div>
      <div className={styles.result_box}>
        {/* <div className={styles.icon}>
          <i className={styles.fas fa_crown}></i>
        </div> */}
        <div className={styles.complete_text}>
          {"You've completed the Quiz!"}
        </div>
        <div className={styles.score_text}> </div>
        <div className={styles.buttons}>
          <button className={styles.restart}> Replay Quiz </button>
          <button className={styles.quit}> Quit Quiz </button>
        </div>
      </div>
    </div>
  );
}

export default Questions;
