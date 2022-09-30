import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import myContext from "../../store/myContext";
import styles from "../../styles/Img.module.css";
import Loading from "../Loading";
import CaseStudyMulti from "./CaseStudyMulti";
import CaseStudy from "./CaseStudySingle";
import DescriptiveQuestions from "./DescriptiveQuestions";
import MainQuiz from "./MainQuiz";
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
  const [quizStart, setQuizStart] = useState(false);
  const [indexNum, setIndexNum] = useState(1);
  const [quizDone, setQuizDone] = useState(false);

  const [infoBoxThere, setInfoBoxThere] = useState();
  const [quizBoxThere, setQuizBoxThere] = useState();

  const [endTime, setEndTime] = useState();
  const [curTime, setCurTime] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [descText, setDescText] = useState();

  const myCtx = useContext(myContext);
  const { data: session } = useSession();

  const TEAM_ID = myCtx.teamId;

  const MAX_QUESTIONS = 26;

  let Timer;

  function getNextQuestion() {
    setIndexNum((prev) => prev + 1);
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
          console.log("Time Limit Reached");
          setQuizDone("Time Limit Reached");
        } else if (data.message == "Maximum Questions capacity reached") {
          setQuizDone("Maximum Questions capacity reached");
          router.push("/dashboard");
        } else {
          console.log(data.questionType, data);
          setQuestion(data.question);
          setAnswers(data.options);
          setQuestionType(data.questionType);
          setSetNum(data.setNum);
          setQuestionNum(data.questionNum);
        }
        if (data.questionNum === 21) {
          setDescText(data.caseStudy);
        } else if (data.questionNum === 26) {
          setDescText(null);
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
        console.log(data, "dfddfddfdf");
        if (data.message === "Time Limit Reached") {
          console.log("time exceeded");
        } else if (data.message === "Submitted Answer Successfully") {
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
        setQuizStart(true);
        if (data.message == "Time Limit Reached") {
          console.log("Time Limit Reached");
          setQuizDone("Time Limit Reached");
        } else if (data.message == "Maximum Questions capacity reached") {
          console.log("Maximum Questions capacity reached");
          setQuizDone("Maximum Questions capacity reached");
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
    <>
      {!quizStart ? (
        <MainQuiz min={curTime[0]} sec={curTime[1]} startQuiz={startQuiz} />
      ) : (
        <>
          <div className={styles.boy}>
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {quizDone ? (
                  quizDone
                ) : (
                  <>
                    <div className={styles.round_page}>
                      <div className={styles.instructions_div}>
                        <div className={styles.top}>
                          <div className={styles.round}>
                            <div className={styles.que_num}>Q{questionNum}</div>
                          </div>
                          <div className={styles.timer}>
                            <div className={styles.text_block}>Time Left</div>
                            <div className={styles.text_block}>
                              {" "}
                              {curTime[0]}:{curTime[1]}
                            </div>
                          </div>
                        </div>
                        {questionType == 0 && (
                          <SingleAns
                            question={question}
                            answers={answers}
                            setUserAnswer={setUserAnswer}
                          />
                        )}
                        {questionType == 1 && (
                          <MultipleAnswerQuestions
                            question={question}
                            answers={answers}
                            setUserAnswer={setUserAnswer}
                          />
                        )}
                        {questionType == 2 && (
                          <MatchingType
                            question={question}
                            answers={answers}
                            setUserAnswer={setUserAnswer}
                          />
                        )}
                        {questionType == 3 && (
                          <CaseStudy
                            text={descText}
                            question={question}
                            answers={answers}
                            setUserAnswer={setUserAnswer}
                          />
                        )}
                        {questionType == 4 && (
                          <CaseStudyMulti
                            text={descText}
                            question={question}
                            answers={answers}
                            setUserAnswer={setUserAnswer}
                          />
                        )}
                        {questionType == 5 && (
                          <DescriptiveQuestions
                            text={descText}
                            question={question}
                            answers={answers}
                            setUserAnswer={setUserAnswer}
                          />
                        )}

                        <div className={styles.type}>
                          <div className={styles.start_btn}>
                            <img
                              disabled={isLoading}
                              onClick={() => {
                                setIsLoading(true);
                                submitAnswer();
                              }}
                              src="https://uploads-ssl.webflow.com/63195bcc7d1a5fdd8154a6a2/6332133fc4bc2737d9b97a60_startbtn.png"
                              width="290px"
                              sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                              alt=""
                              className={styles.image}
                            />

                            <div
                              href="#"
                              className={`${styles.btn_txt} ${styles.w_button}`}
                            >
                              Next
                            </div>
                          </div>
                          <p className={styles.paragraph}>
                            Note: {questionType}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <footer>
            <button
              className={
                isLoading ? styles.next_btn_submitting : styles.next_btn
              }
              disabled={isLoading}
              onClick={() => {
                setIsLoading(true);
                submitAnswer();
              }}
            >
              {" "}
              Next Question{" "}
            </button>
          </footer>
        </>
      )}
      {/* 
      <div className={styles.result_box}>
        <div className={styles.complete_text}>
          {"You've completed the Quiz!"}
        </div>
        <div className={styles.score_text}> </div>
        <div className={styles.buttons}>
          <button className={styles.restart}> Replay Quiz </button>
          <button className={styles.quit}> Quit Quiz </button>
        </div>
      </div> */}
    </>
  );
}

export default Questions;
