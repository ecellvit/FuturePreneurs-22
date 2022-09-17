import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

function PendingRequests() {
  const { data: session } = useSession();
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const handleDeleteRequest = (team) => {
    if (team.teamId._id) {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/user/requests/${team.teamId._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
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
          setTeamData((prev) => {
            return prev.filter((elem) => elem.teamId._id !== team.teamId._id);
          });
          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setIsLoading(false);
        });
    } else {
      toast.error(`Please Create a Team first!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  console.log(teamData);
  useEffect(() => {
    setIsLoading(true);
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
          data.requests?.map((currenTeam) => {
            setTeamData((prevTeamData) => {
              if (
                prevTeamData.findIndex((x) => x._id === currenTeam._id) === -1
              ) {
                return [...prevTeamData, currenTeam];
              }
              return prevTeamData;
            });
          });
          setIsLoading(false);
        });
    }
  }, [session]);

  useEffect(() => {
    console.log(teamData);
  }, [teamData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.Teams}>
          {teamData.length == 0 ? (
            <text style={{ color: "white" }}>There are no Requests</text>
          ) : (
            teamData.map((team) => {
              if (team.teamId != null) {
                return (
                  <div className={styles.Cards} key={team.teamId._id}>
                    <Avatar
                      name={team.teamId.teamName}
                      className={styles.CardsImg}
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
                        <h3 className={styles.Cardsh3}>
                          Mail:{team.teamId.teamLeaderId.email}
                        </h3>
                        <button
                          className={`${styles.button} ${styles.glow_on_hover}`}
                          onClick={() => {
                            handleDeleteRequest(team);
                          }}
                        >
                          DELETE REQUEST
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          )}
        </div>
      )}
    </>
  );
}
export default PendingRequests;
