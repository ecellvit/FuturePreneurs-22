import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import myContext from "../../store/myContext";
import styles from "../../styles/Img.module.css";
import Loading from "../Loading";
import CaseStudyMulti from "./CaseStudyMulti";
import CaseStudy from "./CaseStudySingle";
import DescriptiveQuestions from "./DescriptiveQuestions";
import MainQuiz from "./MainQuiz";
import Matc from "./Matc";
import MatchingType from "./MathingType";
import MultipleAnswerQuestions from "./MultipleAnswerQuestions";
import SingleAns from "./SingleAns";

function Questions(props) {
  const router = useRouter();
  const [question, setQuestion] = useState("1+1?");
  const [answers, setAnswers] = useState(["0", "2", "Me", "Who knows?"]);
  const codes = [
    "SINGLE CORRECT ANSWER",
    "MULTIPLE ANSWER CORRECT",
    "MATCH THE FOLLOWING",
    "SINGLE CORRECT ANSWER",
    "MULTIPLE ANSWER CORRECT",
    "TYPE THE ANSWER",
  ];
  const [userAnswer, setUserAnswer] = useState([]);
  const [setNum, setSetNum] = useState();
  const [questionNum, setQuestionNum] = useState();
  const [questionType, setQuestionType] = useState();
  const [quizStart, setQuizStart] = useState();
  const [indexNum, setIndexNum] = useState(1);

  const [endTime, setEndTime] = useState();
  const [curTime, setCurTime] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [descText, setDescText] = useState(
    typeof window !== "undefined" && localStorage.getItem("casetext")
      ? localStorage.getItem("casetext")
      : null
  );

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
        if (data.message === "Time Limit Reached") {
          console.log("Time Limit Reached");
          router.push("/dashboard");
        } else if (data.message === "Maximum Questions capacity reached") {
          router.push("/dashboard");
        } else {
          console.log(data, "!!!!");
          setQuestion(data.question);
          setAnswers(data.options);
          setQuestionType(data.questionType);
          setSetNum(data.setNum);
          setQuestionNum(data.questionNum);
        }
        if (data.questionNum === 21) {
          setDescText(data.caseStudy);
          if (typeof window !== "undefined") {
            localStorage.setItem("casetext", data.caseStudy);
          }
        } else if (data.questionNum === 26) {
          setDescText(null);
          if (typeof window !== "undefined") {
            localStorage.setItem("casetext", null);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {});
  }

  function submitAnswer() {
    console.log(userAnswer);
    console.log(question);

    console.log(userAnswer);
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
    setIsLoading(true);
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
          toast("Time Limit Reached");
          router.push("/dashboard");
        } else if (data.message == "Maximum Questions capacity reached") {
          console.log("Maximum Questions capacity reached");
          router.push("/dashboard");
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
    setIsLoading(false);
  }

  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const END_TIME = new Date(2022, 10, 4, 17, 0, 0);

  useEffect(() => {
    let timer = setTimeout(() => {
      let a = Date.now();
      let d = END_TIME.getTime() - a;
      let dys = Math.floor(d / 1000 / 60 / 60 / 24) % 30;
      let hrs = Math.floor(d / 1000 / 60 / 60) % 24;
      let mins = Math.floor(d / 1000 / 60) % 60;
      let secs = Math.floor(d / 1000) % 60;

      setHours(hrs);
      setMinutes(mins);
      setSeconds(secs);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [END_TIME]);

  useEffect(() => {
    return () => {
      clearInterval(Timer);
    };
  }, [Timer]);

  return (
    <>
      {!quizStart ? (
        <MainQuiz
          hrs={hours}
          min={minutes}
          sec={seconds}
          startQuiz={startQuiz}
          TEAM_ID={TEAM_ID}
        />
      ) : (
        <>
          <div className={styles.boy}>
            {isLoading ? (
              <Loading />
            ) : (
              <div className={styles.round_page}>
                <div className={styles.instructions_div}>
                  <div className={styles.top}>
                    <div className={styles.round}>
                      <div className={styles.que_num}>{questionNum}</div>
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
                      userAnswer={userAnswer}
                      setUserAnswer={setUserAnswer}
                    />
                  )}

                  <div className={styles.type}>
                    <div className={styles.start_btn}>
                      <img
                        disabled={isLoading}
                        src="start.png"
                        width="290px"
                        sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                        alt=""
                        className={styles.image}
                        style={{ display: isLoading ? "none" : "block" }}
                        onClick={() => {
                          setIsLoading(true);
                          submitAnswer();
                        }}
                      />
                    </div>
                    <p className={styles.paragraph}>
                      Note: {codes[questionType]}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Questions;
