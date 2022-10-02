import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styles from "../../styles/MainQuiz.module.css";

import Loading from "../Loading";
const MainQuiz = ({ min, sec, startQuiz, TEAM_ID }) => {
  const { data: session } = useSession();
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);

  const [teamData, setTeamData] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const { status } = useSession();

  useEffect(() => {
    setIsLoading(true);
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
          return;
        }
        setTeamData(data.user);
        setIsLoading(false);
      })

      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [useEffectTrigger, session]);
  console.log(teamData);
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <div className={styles.boy}>
      <div className={styles.round_page}>
        <div className={styles.profile_div}>
          <div className={styles.starting}>
            <div className={styles.h1}>
              <h1 className={styles.heading}>Starting In</h1>
            </div>
            <div className={styles.btn}>
              <a href="#" className={`${styles.button_2} ${styles.w_button}`}>
                {min}:{sec}
              </a>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.profile_container}>
            {teamData?.teamId?.members?.map((team) => {
              return (
                <div className={styles.profile_card} key={team._id}>
                  <div className={styles.img}>
                    <img src="pic.svg" className={styles.image_2} />
                  </div>
                  <div className={styles.nam}>
                    <div className={styles.name}>
                      {team.firstName} {team.lastName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.instructions_div}>
          <div className={styles.round}>
            <div className={styles.text_block}>Round 0</div>
          </div>
          <div className={styles.round}>
            <div className={styles.text_block}>Instructions</div>
          </div>
          <div className={styles.round_instruction}>
            <div className={styles.para}>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididuntut labore et dolore magna aliqua.” The
              purpose oflorem ipsum is to create a natural looking block of text
              (sentence, paragraph, page, etc.) <br />
              thatdoesn&#x27;t distract from the layout.
              <br />
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididuntut labore et dolore magna aliqua.” The
              purpose oflorem ipsum is to create a natural looking block of text
              (sentence, paragraph, page, etc.) thatdoesn&#x27;t distract from
              the layout.
            </div>
          </div>
          <div className={styles.start_btn}>
            <img
              src="startbtn.png"
              width="290px"
              sizes="(max-width: 1919px) 145px, 290px"
              alt=""
              className={styles.image}
            />
            <a
              disabled={isLoading}
              className={`${styles.btn_txt} ${styles.w_button}`}
              style={{
                display: isLoading ? "none" : "block",
              }}
              onClick={() => {
                setIsLoading(true);
                startQuiz();
              }}
            >
              Start Quiz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainQuiz;
