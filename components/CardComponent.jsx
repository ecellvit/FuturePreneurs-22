import React from "react";
import { useState } from "react";
import styles from "../styles/Dashboard.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CardComponent({
  heading,
  para1,
  para2,
  para3,
  para4,
  intro,
  teamId,
  round,
}) {
  const [map, setMap] = useState();
  const { data: session } = useSession();
  const router = useRouter();

  function handleNext() {
    if (session) {
      if (round === "game0") {
        window.location = "/instructions-fp-eight-ecell";
        return;
      }
      if (round !== "game") {
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/${teamId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data?.error?.errorCode) {
              toast.error(`${data.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              return;
            }
            setMap(data.mapChoice);
            if (data.mapChoice == 1 && round === "round1") {
              window.location = "/beach";
            }
            if (data.mapChoice == 2 && round === "round1") {
              window.location = "/techPark";
            }
            if (data.mapChoice == 0 && round === "round1") {
              window.location = "/temple";
            }
            if (round === "round2") {
              window.location = "/round3";
            }

            if (round === "round3") {
              window.location = "/thankyou";
            }
          })

          .catch((err) => {
            console.error(err);
          });
      } else {
        window.location = "/game-fp-eight-ecell";
      }
    }
  }
  return (
    <>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet"></link> */}
      <div
        className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}  ${styles.cardbodyContainer}`}
      >
        <div
          className={`${styles.member_container} ${styles.border_gradient} `}
        >
          <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
            <div className={styles.instructions}>
              <div className={styles.instructions_div}>
                <div className={styles.round}>
                  <div
                    className={styles.text_block}
                    style={{ fontFamily: "Inter" }}
                  >
                    <h1>Round {heading}</h1>
                    <h2>Instructions</h2>
                  </div>
                </div>
                <hr></hr>
                <div className={styles.round}>
                  <div
                    className={styles.text_block}
                    style={{ color: "#ffffff ", textAlign: "left" }}
                  >
                    {intro}
                  </div>
                </div>
                <div className={styles.round_instruction}>
                  <div className={styles.para}>
                    {para1}
                    <br />
                    {para2}
                    <br />
                    {para3}
                    <br />
                    {para4}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.start_btn}>
          <img
            src={"start.png"}
            width="290px"
            sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
            alt=""
            className={styles.image}
            style={{ display: "block" }}
            onClick={() => {
              handleNext();
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CardComponent;
