import React, { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "../../styles/CreateTeam.module.css";
import Link from "next/link";
import PendingRequests from "../../pages/dashboard/PendingRequests";

const CreateTeam = ({ handleTeamCreate }) => {
  const teamNameRef = useRef(null);
  const { data: session } = useSession();
  const [teamData, setTeamData] = useState({});

  const handleCreate = (e) => {
    e.preventDefault();
    console.log(teamNameRef.current.value);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team`, {
      method: "POST",
      body: JSON.stringify({
        teamName: teamNameRef.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        handleTeamCreate()
      });
  };
  console.log(session, "in dashboard");

  useEffect(() => {
    if (session) {
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
          console.log(data);
          // data.requests.map((currenTeam) => {
          //   setTeamData((prevTeamData) => {
          //     return [...prevTeamData, currenTeam];
          //   });
          // });
          setTeamData(data.requests);
        });
    }
  }, []);

  return (
    <div className={styles.big_image}>
      <div className={styles.wrapper}>
        <div className={styles.section_title}>{`Hi,${session.user.name} `}</div>
        <h2 className={styles.h1_create}>Join a Team or Create a Team</h2>
        <p className={styles.p_create}>
          The event is designed to test your analytical thinking. Glaze up your
          business skills with the added knowledge about consumers and the
          trends they tend to follow. Touch it all up with a study of financial
          products and their marketing strategies.So what you are waiting for ,
          find your perfect team and get ready to dive into business simulation
          competition.
        </p>

        <div className={styles.form_block}>
          <form className={styles.team_form}>
            <Link href="/dashboard/join-team">
              <button
                type="submit"
                placeholder="Find Teams to Join"
                className={`${styles.join_create_btn} ${styles.join_btn}  ${styles.w_button}`}
              >
                Find Teams to Join
              </button>
            </Link>
          </form>
        </div>


        {teamData.length == 0 ? (
          <div>
            <div className={styles.form_block}>
              <div className={styles.team_form}>
                <h1 className={styles.or_form}>Or</h1>
              </div>
            </div>
            <div className={styles.form_block}>
              <div className={styles.create_team_h1}>Create a Team</div>
              <form className={styles.team_form}>
                <input
                  type="text"
                  name="name"
                  ref={teamNameRef}
                  className={`${styles.input_team} ${styles.w_input}`}
                  placeholder="Enter Your Team Name"
                />
                <button className={`${styles.join_create_btn} ${styles.w_button}`} onClick={handleCreate}>
                  Create
                </button>
              </form>
            </div>
          </div>
        ) :

          <Link href="/PendingRequests">
            <button
              type="submit"
              placeholder="Pending requests"
              className={`${styles.join_create_btn} ${styles.join_btn}  ${styles.w_button}`}
            >
              Pending requests
            </button>
          </Link>
        }
      </div>
    </div>
  );
};

export default CreateTeam;
