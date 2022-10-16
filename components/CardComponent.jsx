import React from 'react'
import Loading from "./Loading"
import { useState } from "react";
import styles from "../styles/Dashboard.module.css";

function CardComponent({heading,paragraph}) {

  
  function handleNext() {
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
          // console.log("time exceeded");
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
    return (
     
      <>
     
          <div
            className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}  ${styles.cardbodyContainer}`}
          >
            <div className={`${styles.member_container} ${styles.border_gradient} `}>
              <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
                <h4 className={styles.cardHeading}>heading</h4>
                <div className={styles.instructions}>
                {paragraph}
              </div>
              </div>
            </div>
                <div className={styles.start_btn}>
                          <img
                        
                            src={
                              "start.png"
                            }
                            width="290px"
                            sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                            alt=""
                            className={styles.image}
                            style={{ display:"block" }}
                            onClick={handleNext()}
                          />
                       
                </div>
              </div>
       
      </>
    );
 
}

export default CardComponent