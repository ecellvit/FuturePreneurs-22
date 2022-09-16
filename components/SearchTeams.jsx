import { useEffect, useState } from "react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

function SearchTeams(props) {
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  const { data: session, status } = useSession();

  const [teamData, setTeamData] = useState([]);
  const handlePreviousButtonClick = () => {
    if (prev != undefined) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team?page=${prev.page}&limit=${prev.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.error.errorCode) {
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
          setNext(data.paginatedResult.next);
          setPrev(data.paginatedResult.previous);

          setTeamData([]);

          data.paginatedResult.results.map((currenTeam) => {
            if (currenTeam.members.length < 4) {
              setTeamData((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
        });
    } else {
      toast.success(`No Previous Page Found`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleNextButtonClick = () => {
    if (next != undefined) {
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team?page=${next.page}&limit=${next.limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          if (data.error.errorCode) {
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
          setNext(data.paginatedResult.next);
          setPrev(data.paginatedResult.previous);

          setTeamData([]);

          data.paginatedResult.results.map((currenTeam) => {
            if (currenTeam.members.length < 4) {
              setTeamData((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
        });
    } else {
      toast.success(`No Next Page Found`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleJoinTeam = (team) => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/requests/${team._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error.errorCode) {
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
        console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    if (status !== "loading" && status === "authenticated") {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team?page=1&limit=9`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.error.errorCode) {
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
          setNext(data.paginatedResult.next);
          setPrev(data.paginatedResult.previous);

          setTeamData([]);

          data.paginatedResult.results.map((currenTeam) => {
            if (currenTeam.members.length < 4) {
              setTeamData((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
        });
    }
  }, [status]);

  if (!props.data) {
    console.log(teamData);
    return (
      <div className={styles.Teams}>
        <div className={styles.Teams}>
          {teamData.map((team) => {
            return (
              <div className={styles.Cards} key={team._id}>
                <Avatar
                  name={team.teamName}
                  className={styles.CardsImg}
                  size="300"
                />

                <div className={styles.infogroup}>
                  {team.members.map((teamLead) => {
                    if (teamLead.teamRole == 0) {
                      return (
                        <div>
                          <h3 className={styles.Cardsh3}>
                            TeamName:{team.teamName}
                          </h3>
                          <h3 className={styles.Cardsh3}>
                            Team Size:{team.members.length}/4
                          </h3>
                          <h3 className={styles.Cardsh3}>
                            Team Leader:{teamLead.firstName} {teamLead.lastName}
                          </h3>

                          <h3 className={styles.Cardsh3}>
                            Mail:{teamLead.email}
                          </h3>
                          <button
                            className={styles.button}
                            onClick={() => {
                              handleJoinTeam(team);
                            }}
                          >
                            Join Team
                            <ToastContainer />
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className={styles.button2}
          onClick={() => {
            handlePreviousButtonClick();
          }}
        >
          Previous
          <ToastContainer />
        </button>
        <button
          className={styles.button2}
          onClick={() => {
            handleNextButtonClick();
          }}
        >
          Next
          <ToastContainer />
        </button>
      </div>
    );
  } else {
    return (
      <div className={styles.Teams}>
        {
          <div className={styles.Cards} key={props.data.team._id}>
            <Avatar
              name={props.data.team.teamName}
              className={styles.CardsImg}
              size="300"
            />

            <div className={styles.infogroup}>
              {props.data.team.members.map((teamLead) => {
                if (teamLead.teamRole == 0) {
                  return (
                    <div>
                      <h3 className={styles.Cardsh3}>
                        TeamName:{props.data.team.teamName}
                      </h3>
                      <h3 className={styles.Cardsh3}>
                        Team Size:{props.data.team.members.length}/4
                      </h3>
                      <h3 className={styles.Cardsh3}>
                        Team Leader:{teamLead.firstName} {teamLead.lastName}
                      </h3>
                      <h3 className={styles.Cardsh3}>Mail:{teamLead.email}</h3>
                      <button
                        className={styles.button}
                        onClick={() => {
                          handleJoinTeam(props.data.team);
                        }}
                      >
                        Join Team
                        <ToastContainer />
                      </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default SearchTeams;
