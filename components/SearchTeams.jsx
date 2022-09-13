import { useEffect, useState } from "react";
//import reactLogo from "./assets/react.svg";
//import "./styles/SearchTeams.module.css";
import Image from "next/image";
import gradient from "../img/grad.jpg";
import phone from "../img/phone-icon.png";
import mailer from "../img/mail-icon.png";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
// import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

//import { Cookies } from "react-cookie";
//const handleClick =

function SearchTeams(props) {
  let next;
  let prev;
  const [selectedTeam, setSelectedTeam] = useState(null);

  const { data: session } = useSession();

  console.log(session, "in component");
  // const [count, setCount] = useState(0);

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
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team?page=1&limit=9`, {
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
          next = data.paginatedResult.next;
          prev = data.paginatedResult.previous;
          console.log(next);
          console.log(prev);
          data.paginatedResult.results.map((currenTeam) => {
            if (currenTeam.members.length < 4) {
              setTeamData((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
        });
    }
  }, [session]);
  const labels = [];
  for (let i = 0; i < teamData.length; i++) {
    labels[i] = { teamData, label: teamData[i].teamName };
  }

  console.log(teamData);
  console.log(labels);
  console.log(props.data);
  if (props.data === null) {
    return (
      <div className={styles.Teams}>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={labels}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Teams" />}
          value={selectedTeam}
          onChange={(_event, newTeam) => {
            setSelectedTeam(newTeam);
            console.log(selectedTeam);
          }}
        /> */}
        {teamData.map((team) => {
          console.log(team);
          return (
            <div className={styles.Cards} key={team._id}>
              {/* <Image className={styles.CardsImg} src={gradient} alt="Gradient" /> */}
              <Avatar
                name={team.teamName}
                className={styles.CardsImg}
                // color="gradient"
                // bordered
                // squared
                // //size="$300"
                // height="$300"

                size="300"
              />

              <div className={styles.infogroup}>
                {team.members.map((teamLead) => {
                  console.log(teamLead.teamRole);
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
                        {/* <h3 className={styles.Cardsh3}>
                        Team Leader Number:{teamLead.mobileNumber}
                      </h3> */}
                        <h3 className={styles.Cardsh3}>
                          Mail:{teamLead.email}
                        </h3>
                        <button
                          className={styles.button}
                          onClick={() => {
                            console.log("click");
                            fetch(
                              `${process.env.NEXT_PUBLIC_SERVER}/api/user/requests/${team._id}`,
                              {
                                method: "POST",
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
                                console.log(data.message);
                                toast.success(`${data.message}`, {
                                  position: toast.POSITION.TOP_RIGHT,
                                });
                              });
                            //console.log(Cookies);
                          }}
                        >
                          Join Team
                          <ToastContainer />
                        </button>
                        {/* <button
                        className={styles.button}
                        onClick={() => {
                          toast.success("Success Notification !", {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                        }}
                      >
                        Popup Team
                        <ToastContainer />
                      </button> */}
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
  } else {
    console.log(props.data);
    return (
      <div className={styles.Teams}>
        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={labels}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Teams" />}
          value={selectedTeam}
          onChange={(_event, newTeam) => {
            setSelectedTeam(newTeam);
            console.log(selectedTeam);
          }}
        /> */}

        {
          <div className={styles.Cards} key={props.data.teamData._id}>
            {/* <Image className={styles.CardsImg} src={gradient} alt="Gradient" /> */}
            <Avatar
              name={props.data.teamData.teamName}
              className={styles.CardsImg}
              // color="gradient"
              // bordered
              // squared
              // //size="$300"
              // height="$300"

              size="300"
            />

            <div className={styles.infogroup}>
              {props.data.teamData.members.map((teamLead) => {
                console.log(teamLead.teamRole);
                if (teamLead.teamRole == 0) {
                  return (
                    <div>
                      <h3 className={styles.Cardsh3}>
                        TeamName:{props.data.teamData.teamName}
                      </h3>
                      <h3 className={styles.Cardsh3}>
                        Team Size:{props.data.teamData.members.length}/4
                      </h3>
                      <h3 className={styles.Cardsh3}>
                        Team Leader:{props.data.teamData.name}
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
                            `${process.env.NEXT_PUBLIC_SERVER}/api/user/requests/${props.data.teamData._id}`,
                            {
                              method: "POST",
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
                              console.log(data.message);
                              toast.success(`${data.message}`, {
                                position: toast.POSITION.TOP_RIGHT,
                              });
                            });
                          //console.log(Cookies);
                        }}
                      >
                        Join Team
                        <ToastContainer />
                      </button>
                      {/* <button
                        className={styles.button}
                        onClick={() => {
                          toast.success("Success Notification !", {
                            position: toast.POSITION.TOP_RIGHT,
                          });
                        }}
                      >
                        Popup Team
                        <ToastContainer />
                      </button> */}
                    </div>
                  );
                }
              })}
            </div>

            {/* <div className={styles.infogroup}></div> */}
          </div>
        }
      </div>
    );
  }
}

export default SearchTeams;
