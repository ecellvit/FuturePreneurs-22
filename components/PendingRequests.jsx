import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { data: session } = useSession();

function PendingRequests() {
  const { data: session } = useSession();
  console.log(session);
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER3}/api/user/requests`, {
      method: "GET",
      //mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      // .then((response) => {
      // })
      //   console.log(response.text());
      // })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        data.requests.map((currenTeam) => {
          setTeamData((prevTeamData) => {
            return [...prevTeamData, currenTeam];
          });
        });
      });
  }, []);
  console.log(teamData);
  return (
    <div className={styles.Teams}>
      {teamData.map((team) => {
        console.log(team.teamId);
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
              {team.teamId.members.map((teamLead) => {
                console.log(teamLead.teamRole);
                if (teamLead.teamRole == 0) {
                  return (
                    <div>
                      <h3 className={styles.Cardsh3}>
                        TeamName:{team.teamId.teamName}
                      </h3>
                      <h3 className={styles.Cardsh3}>
                        Team Size:{team.teamId.members.length}/4
                      </h3>
                      <h3 className={styles.Cardsh3}>
                        Team Leader:{teamLead.name}
                      </h3>
                      {/* <h3 className={styles.Cardsh3}>
                        Team Leader Number:{teamLead.mobileNumber}
                      </h3> */}
                      <h3 className={styles.Cardsh3}>Mail:{teamLead.email}</h3>
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
                  );
                }
              })}
            </div>
            {/* <div className={styles.infogroup}></div> */}
          </div>
        );
      })}
    </div>
  );
  console.log(teamData);
}
export default PendingRequests;
