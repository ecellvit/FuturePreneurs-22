import React, { useRef, useState, useEffect, useContext } from "react";
import { useSession } from "next-auth/react";
import styles from "../../styles/CreateTeam.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import Layout from "../animationComponents/Layouts";
import myContext from "../../store/myContext";

const CreateTeam = ({ handleTeamCreate }) => {
  const teamNameRef = useRef(null);
  const { data: session, status } = useSession();
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const myCtx = useContext(myContext);

  const handleCreate = (e) => {
    e.preventDefault();
    if (teamNameRef.current.value.trim() === "") {
      toast.error(`Team name can't be empty!`);
      return;
    }
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team`, {
      method: "POST",
      body: JSON.stringify({
        teamName: teamNameRef.current.value.trim(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
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
          return;
        }
        handleTeamCreate();
        myCtx.leaderHandler(true);
      });
  };

  useEffect(() => {
    if (status !== "loading" && status === "authenticated") {
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          setIsLoading(false);

          //user already part of a team toastify error

          // if (data.error?.errorCode) {
          //   toast.error(`${data.message}`, {
          //     position: "top-right",
          //     autoClose: 5000,
          //     hideProgressBar: false,
          //     closeOnClick: true,
          //     pauseOnHover: true,
          //     draggable: true,
          //     progress: undefined,
          //   });
          //   return;
          // }
          setTeamData(data.requests);
        });
    }
  }, [session, status]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Layout>
          <div className={styles.big_image}>
            <div className={`${styles.wrapper} ${styles.border_gradient}`}>
              <div
                className={styles.section_title}
              >{`Hi, ${session.user.name}! `}</div>
              <h2 className={styles.h1_create}>Join a Team</h2>
              <div className={styles.form_block}>
                <form className={styles.team_form}>
                  <Link href="/searchTeams">
                    <button
                      type="submit"
                      placeholder="Find Teams to Join"
                      className={`${styles.join_create_btn} ${styles.join_btn}  ${styles.w_button} ${styles.button}`}
                    >
                      Find Teams to Join
                    </button>
                  </Link>
                </form>
              </div>

              {teamData?.length === 0 ? (
                <div>
                  <div className={styles.form_block}>
                    <div className={styles.team_form}>
                      <h1 className={styles.or_form}>Or</h1>
                    </div>
                  </div>
                  <div className={styles.form_block}>
                    <div className={styles.h1_create}>Create a Team</div>
                    <form className={styles.team_form}>
                      <input
                        type="text"
                        name="name"
                        ref={teamNameRef}
                        className={`${styles.input_team} ${styles.w_input}`}
                        placeholder="Enter Your Team Name"
                      />
                      <button
                        className={`${styles.join_create_btn} ${styles.w_button} ${styles.button} ${styles.create}`}
                        onClick={handleCreate}
                      >
                        Create
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <Link href="/pendingRequests">
                  <button
                    type="submit"
                    placeholder="Pending requests"
                    className={`${styles.join_create_btn} ${styles.join_btn}  ${styles.w_button} ${styles.button} ${styles.pending_btn}`}
                  >
                    Pending requests
                  </button>
                </Link>
              )}
            </div>
          </div>
        </Layout>
      )}
    </>
  );
};

export default CreateTeam;
