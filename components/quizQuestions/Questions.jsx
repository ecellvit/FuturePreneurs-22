import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
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
import ImageBased from "./ImageBased";

function Questions(props) {
  console.log(screen.width);
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
    "SINGLE CORRECT ANSWER",
  ];
  const [userAnswer, setUserAnswer] = useState([]);
  const [setNum, setSetNum] = useState();
  const [questionNum, setQuestionNum] = useState();
  const [currQuesBackend, setcurrQuesBackend] = useState();
  const [questionType, setQuestionType] = useState();
  const [quizStart, setQuizStart] = useState();
  const [indexNum, setIndexNum] = useState(1);
  const [imageSrc, setImageSrc] = useState();
  const [isLeader, setIsLeader] = useState(true);

  const [endTime, setEndTime] = useState();
  const [curTime, setCurTime] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [descText, setDescText] = useState();

  const myCtx = useContext(myContext);
  const { data: session } = useSession();

  const TEAM_ID = myCtx.teamId;

  const MAX_QUESTIONS = 26;

  let Timer;
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/quiz `, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.status, "!!!!!!!");
        if (data.status === 1) {
          setIsLoading(true);

          // setQuizStart(true);
          startQuiz();
        } else {
          setQuizStart(false);
        }

        setIsLoading(false);
      })

      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, []);

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
        setIsLoading(false);
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (data.message === "Time Limit Reached") {
          console.log("Time Limit Reached");
          router.push("/thankyou");
        } else if (data.message === "Maximum Questions capacity reached") {
          router.push("/thankyou");
        } else {
          console.log(data, "!!!!");
          setQuestion(data.question);
          setAnswers(data.options);
          setQuestionType(data.questionType);
          setSetNum(data.setNum);
          setQuestionNum(data.presentQuestionNum);
          setcurrQuesBackend(data.questionNum);
          setImageSrc(data.imageSrc);
        }
        if (data.questionType === 3 || data.questionType === 4) {
          setDescText(data.caseStudy);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function submitAnswer() {
    let respBody = {
      setNum: setNum,
      questionNum: currQuesBackend,
    };
    if (questionType === 5) {
      if (userAnswer.length === 0) {
        setIsLoading(false);
        toast(`Please don't leave the answer field empty`);
        return;
      }
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
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (data.message === "Time Limit Reached") {
          console.log("time exceeded");
          router.push("/thankyou");
        } else if (data.message === "Submitted Answer Successfully") {
          setUserAnswer([]);
          getNextQuestion();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    console.log("Meow Meow Nigga");
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.user?.teamRole === 0) {
          setIsLeader(true);
        } else {
          setIsLeader(false);
        }
      });
  }, [isLeader, session]);

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
        setIsLoading(false);
        if (data.error?.errorCode) {
          toast.error(`${data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        if (data.message == "Time Limit Reached") {
          toast("Time Limit Reached");
          router.push("/thankyou");
        } else if (data.message == "Maximum Questions capacity reached") {
          console.log("Maximum Questions capacity reached");
          router.push("/thankyou");
        } else {
          setQuestion(data.question);
          setAnswers(data.options);
          setQuestionType(data.questionType);
          setSetNum(data.setNum);
          setQuestionNum(data.presentQuestionNum);
          setIsLoading(false);
          setcurrQuesBackend(data.questionNum);

          Timer = setInterval(() => {
            const now = Date.now();
            const end = Date.parse(data.endTime);
            let minutes = Math.floor((end - now) / 1000 / 60);
            let seconds = Math.floor((end - now) / 1000) % 60;
            if (seconds === 0 && minutes === 0) {
              toast("Time Limit Reached");
              router.push("/thankyou");
              return;
            }
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
      if (hrs.toString().length < 2) {
        hrs = "0" + hrs.toString();
      }
      if (mins.toString().length < 2) {
        mins = "0" + mins.toString();
      }
      if (secs.toString().length < 2) {
        secs = "0" + secs.toString();
      }

      setHours(hrs);
      setMinutes(mins);
      setSeconds(secs);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [END_TIME]);
  {
    isLoading ? <Loading /> : <></>;
  }
  useEffect(() => {
    return () => {
      clearInterval(Timer);
    };
  }, [Timer]);
  console.log(isLeader);

  if (isLeader) {
    if (screen.width > 768) {
      return (
        <>
          {!quizStart ? (
            <>
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <MainQuiz
                    hrs={hours}
                    min={minutes}
                    sec={seconds}
                    startQuiz={startQuiz}
                    TEAM_ID={TEAM_ID}
                  />
                </>
              )}
            </>
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
                          <div className={styles.que_num}>
                            {questionNum} of 41
                          </div>
                        </div>
                        <div className={styles.note_div}>
                          <p className={styles.paragraph}>
                            Note: {codes[questionType]}
                          </p>
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
                          userAnswer={userAnswer}
                          setUserAnswer={setUserAnswer}
                        />
                      )}
                      {questionType == 1 && (
                        <MultipleAnswerQuestions
                          question={question}
                          answers={answers}
                          userAnswer={userAnswer}
                          setUserAnswer={setUserAnswer}
                        />
                      )}
                      {questionType == 2 && (
                        <MatchingType
                          question={question}
                          answers={answers}
                          userAnswer={userAnswer}
                          setUserAnswer={setUserAnswer}
                        />
                      )}
                      {questionType == 3 && (
                        <CaseStudy
                          text={descText}
                          question={question}
                          answers={answers}
                          userAnswer={userAnswer}
                          setUserAnswer={setUserAnswer}
                        />
                      )}
                      {questionType == 4 && (
                        <CaseStudyMulti
                          text={descText}
                          question={question}
                          answers={answers}
                          userAnswer={userAnswer}
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
                      {questionType == 6 && (
                        <ImageBased
                          question={question}
                          answers={answers}
                          userAnswer={userAnswer}
                          imageSrc={imageSrc}
                          setUserAnswer={setUserAnswer}
                        />
                      )}

                      <div className={styles.type}>
                        <div className={`${styles.start_btn_2}`}>
                          <img
                            disabled={isLoading}
                            src="clear.png"
                            width="290px"
                            sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                            alt=""
                            className={styles.image}
                            style={{ display: isLoading ? "none" : "block" }}
                            onClick={() => {
                              console.log("Meow Meow");
                              setUserAnswer([]);
                            }}
                          />
                        </div>
                        <div className={styles.start_btn}>
                          <img
                            disabled={isLoading}
                            src={
                              questionNum === 41 ? "finish.png" : "start.png"
                            }
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
                        {/* <p className={styles.paragraph}>
                          Note: {codes[questionType]}
                        </p> */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      );
    } else {
      router.push("/smallscreen");
    }
  } else {
    router.push("/notLeader");
  }
}

export default Questions;
