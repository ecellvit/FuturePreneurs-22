import { useContext, useEffect, useState } from "react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import imgSrc from "../img/grad.png";
import Loading from "./Loading";
import Layout from "./animationComponents/Layouts";
import { HoverAnimation } from "./animationComponents/HoverAnimation";
import { Rotating } from "./animationComponents/Rotating";
import { useCookies } from "react-cookie";
import myContext from "../store/myContext";

function SearchTeams(props) {
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [cookies, setCookie] = useCookies(["requests"]);

  const { data: session, status } = useSession();

  const myCtx = useContext(myContext);

  const [isLoading, setIsLoading] = useState(true);

  const [teamData, setTeamData] = useState([]);
  const handlePreviousButtonClick = () => {
    if (prev) {
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
      toast.success(`You've reached the end!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleNextButtonClick = () => {
    if (next) {
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
      toast.success(`No more teams found!`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleJoinTeam = (team) => {
    if (cookies.requests == undefined || cookies.requests < 5) {
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
            if (data.message == "Can't send more than 5 requests") {
              setCookie("requests", 5);
            }
            return;
          }
          if (!cookies.requests) {
            // console.log(cookies.requests);

            setCookie("requests", 1);
          } else {
            // console.log(cookies.requests);
            setCookie("requests", ++cookies.requests);
          }
          // console.log(cookies.requests);

          myCtx.notyHandler(myCtx.notys+1)

          toast.success(`${data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else {
      toast.error(`You have already sent request to 5 teams`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (status !== "loading" && status === "authenticated") {
      setCookie("requests", 0);

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
    return isLoading ? (
      <Loading />
    ) : (
      <Layout>
        <div>
          <div className={styles.Teams}>
            {teamData.map((team) => {
              return (
                <HoverAnimation key={team._id}>
                  <div className={styles.Cards}>
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
                                TeamName: {team.teamName}
                              </h3>
                              <h3 className={styles.Cardsh3}>
                                Team Size: {team.members.length}/4
                              </h3>
                              <h3 className={styles.Cardsh3}>
                                Team Leader: {teamLead.firstName}{" "}
                                {teamLead.lastName}
                              </h3>

                              <h3 className={styles.Cardsh3}>
                                Mail: {teamLead.email}
                              </h3>
                              <button
                                className={`${styles.button} ${styles.glow_on_hover}`}
                                onClick={() => {
                                  handleJoinTeam(team);
                                }}
                              >
                                Join Team
                              </button>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </HoverAnimation>
              );
            })}
          </div>
          <div className={styles.buttonPlacer}>
            <button
              className={styles.button2}
              onClick={() => {
                handlePreviousButtonClick();
              }}
            >
              Previous
            </button>
            <button
              className={styles.button2}
              onClick={() => {
                handleNextButtonClick();
              }}
            >
              Next
            </button>
          </div>
        </div>
      </Layout>
    );
  } else {
    return isLoading ? (
      <Loading />
    ) : (
      <Layout>
        <div className={styles.images}>
          <Image
            src={imgSrc}
            layout="intrinsic"
            objectFit="contain"
            alt="bg-img"
          />
        </div>
        <div className={styles.Teams}>
          {
            <HoverAnimation>
              <Rotating key={props.data.team._id}>
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
                              Team Leader:{teamLead.firstName}{" "}
                              {teamLead.lastName}
                            </h3>
                            <h3 className={styles.Cardsh3}>
                              Mail:{teamLead.email}
                            </h3>
                            <button
                              className={`${styles.button} ${styles.glow_on_hover}`}
                              onClick={() => {
                                handleJoinTeam(props.data.team);
                              }}
                            >
                              Join Team
                            </button>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              </Rotating>
            </HoverAnimation>
          }
        </div>
      </Layout>
    );
  }
}

export default SearchTeams;
