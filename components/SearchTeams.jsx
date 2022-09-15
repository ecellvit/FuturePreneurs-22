import { useEffect, useState } from "react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

function SearchTeams(props) {
  console.log(props, "props!!!");
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();

  const { data: session, status } = useSession();

  // const [teamData, setTeamData] = useState([
  //   {
  //     _id: "6301f9892ecdca7e73ed4a5b",
  //     teamName: "RCB",
  //     teamLeaderId: "6301f97a2ecdca7e73ed4a51",
  //     members: [
  //       {
  //         _id: "6301f97a2ecdca7e73ed4a51",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //       {
  //         _id: "6301fa622ecdca7e73ed4a7d",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 1,
  //       },
  //     ],
  //     __v: 0,
  //     timer: "2022-09-04T11:18:22.266Z",
  //     completedQuestions: [8, 17, 10, 9, 16, 13, 1, 2, 12, 11],
  //   },
  //   {
  //     _id: "6301f9c42ecdca7e73ed4a6a",
  //     teamName: "Barca",
  //     teamLeaderId: "6301f98e2ecdca7e73ed4a5f",
  //     members: [
  //       {
  //         _id: "6301f98e2ecdca7e73ed4a5f",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "6301fa012ecdca7e73ed4a79",
  //     teamName: "MI",
  //     teamLeaderId: "6301f9ed2ecdca7e73ed4a70",
  //     members: [
  //       {
  //         _id: "6301f9ed2ecdca7e73ed4a70",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "631448e7f8e5566f86260030",
  //     teamName: "SRH",
  //     teamLeaderId: "63144783eb1b17c9319cf36f",
  //     members: [
  //       {
  //         _id: "63144783eb1b17c9319cf36f",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //     ],
  //     completedQuestions: [10, 2, 20, 12, 18, 22],
  //     timer: "2022-09-04T11:12:22.181Z",
  //   },
  // ]);

  const [teamData, setTeamData] = useState([]);
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
          setNext(data.paginatedResult.next);
          setPrev(data.paginatedResult.previous);

          setTeamData([]);

          data.paginatedResult.results.map((currenTeam) => {
            setTeamData((prevTeamData) => {
              return [...prevTeamData, currenTeam];
            });
          });
        });
    }
  }, [status]);

  console.log(props.data, "in search teams");
  if (!props.data) {
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
                            Team Leader:{teamLead.name}
                          </h3>

                          <h3 className={styles.Cardsh3}>
                            Mail:{teamLead.email}
                          </h3>
                          <button
                            className={styles.button}
                            onClick={() => {
                              fetch(
                                `${process.env.NEXT_PUBLIC_SERVER}/api/user/requests/${team._id}`,
                                {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${session.accessTokenBackend}`,
                                    "Access-Control-Allow-Origin": "*",
                                  },
                                }
                              )
                                .then((data) => data.json())
                                .then((data) => {
                                  toast.success(`${data.message}`, {
                                    position: toast.POSITION.TOP_RIGHT,
                                  });
                                });
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
          }}
        >
          Previous
          <ToastContainer />
        </button>
        <button
          className={styles.button2}
          onClick={() => {
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
                          fetch(
                            `${process.env.NEXT_PUBLIC_SERVER}/api/user/requests/${props.data.team._id}`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${session.accessTokenBackend}`,
                                "Access-Control-Allow-Origin": "*",
                              },
                            }
                          )
                            .then((data) => data.json())
                            .then((data) => {
                              toast.success(`${data.message}`, {
                                position: toast.POSITION.TOP_RIGHT,
                              });
                            });
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
