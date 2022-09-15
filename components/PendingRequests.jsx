import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PendingRequests() {
  const { data: session } = useSession();
  console.log(session);
  const [teamData, setTeamData] = useState([]);
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
          data.requests.map((currenTeam) => {
            setTeamData((prevTeamData) => {
              return [...prevTeamData, currenTeam];
            });
          });
        });
    }
  }, [session]);
  console.log(teamData);
  return (
    <div className={styles.Teams}>
      {teamData.map((team) => {
        console.log(session.accessTokenBackend);
        if (team.teamId != null) {
          return (
            <div className={styles.Cards} key={team.teamId._id}>
              {/* <Image className={styles.CardsImg} src={gradient} alt="Gradient" /> */}
              <Avatar
                name={team.teamId.teamName}
                className={styles.CardsImg}
                // color="gradient"
                // bordered
                // squared
                // //size="$300"
                // height="$300"

                size="300"
              />

              <div className={styles.infogroup}>
                <div>
                  <h3 className={styles.Cardsh3}>
                    TeamName:{team.teamId.teamName}
                  </h3>
                  <h3 className={styles.Cardsh3}>
                    Team Size:{team.teamId.members.length}/4
                  </h3>
                  <h3 className={styles.Cardsh3}>
                    Team Leader:{team.teamId.teamLeaderId.firstName}
                    {team.teamId.teamLeaderId.lastName}
                  </h3>
                  {/* <h3 className={styles.Cardsh3}>
                        Team Leader Number:{teamLead.mobileNumber}
                      </h3> */}
                  <h3 className={styles.Cardsh3}>
                    Mail:{team.teamId.teamLeaderId.email}
                  </h3>
                  <button
                    className={styles.button}
                    onClick={() => {
                      console.log("click");
                      fetch(
                        `${process.env.NEXT_PUBLIC_SERVER3}/api/user/requests/${team.teamId._id}`,
                        {
                          method: "PATCH",
                          //mode: "cors",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${session.accessTokenBackend}`,
                            "Access-Control-Allow-Origin": "*",
                          },
                        }
                      )
                        .then((data) => data.json())
                        .then((data) => {
                          console.log(data);
                          toast.success(`${data.message}`, {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                        });
                      //console.log(Cookies);
                    }}
                  >
                    DELETE REQUEST
                    <ToastContainer />
                  </button>
                </div>
              </div>
              {/* <div className={styles.infogroup}></div> */}
            </div>
          );
        }
      })}
    </div>
  );
}
export default PendingRequests;
