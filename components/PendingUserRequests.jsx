import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PendingUserRequests() {
  const { data: session } = useSession();
  console.log(session);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1YjIxMWViMWIxN2M5MzE5Y2YzN2YiLCJpYXQiOjE2NjMwODc1MTMsImV4cCI6MTY2MzUxOTUxM30.IsQBnMGMJfpc0W16dCGrAY-2nfIgcSOk24UK-WQmBCw`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          console.log(data.user.teamId);
          if (data.user.teamId != undefined) {
            data.user.teamId.members.map((teamLead) => {
              if (teamLead.teamRole === 0) {
                if (teamLead._id === data.user._id) {
                  console.log(data.user.teamId._id);
                  fetch(
                    `${process.env.NEXT_PUBLIC_SERVER}/api/team/requests/${data.user.teamId._id}`,
                    {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${session.accessTokenBackend}`,
                        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1YjIxMWViMWIxN2M5MzE5Y2YzN2YiLCJpYXQiOjE2NjMwODc1MTMsImV4cCI6MTY2MzUxOTUxM30.IsQBnMGMJfpc0W16dCGrAY-2nfIgcSOk24UK-WQmBCw`,

                        "Access-Control-Allow-Origin": "*",
                      },
                    }
                  )
                    .then((data) => data.json())
                    .then((data) => {
                      console.log(data);
                      data.requests.map((currentUser) => {
                        setUserData((prevUserData) => {
                          return [...prevUserData, currentUser];
                        });
                      });
                    });
                }
              }
            });
          }
        });
    }
  }, [session]);
  console.log(userData);

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

      {userData.map((user) => {
        if (user.userId != null) {
          console.log(user);
          return (
            <div className={styles.Cards} key={user._id}>
              {/* <Image className={styles.CardsImg} src={gradient} alt="Gradient" /> */}
              <Avatar
                name={user.userId.email}
                className={styles.CardsImg}
                // color="gradient"
                // bordered
                // squared
                // //size="$300"
                // height="$300"

                size="300"
              />

              <div className={styles.infogroup}>
                {
                  <div>
                    <h3 className={styles.Cardsh3}>
                      User Name:{user.userId.email}
                    </h3>
                    {/* <h3 className={styles.Cardsh3}>
                    Team Size:{team.members.length}/4
                  </h3> */}
                    <h3 className={styles.Cardsh3}>
                      Phone Number:{user.userId.mobileNumber}
                    </h3>
                    {/* <h3 className={styles.Cardsh3}>
              Team Leader Number:{teamLead.mobileNumber}
            </h3> */}
                    <h3 className={styles.Cardsh3}>
                      User Mail:{user.userId.email}
                    </h3>
                    <button
                      className={styles.button}
                      onClick={() => {
                        console.log(
                          JSON.stringify({
                            userid: user.userId._id,
                            status: 1,
                          })
                        );
                        fetch(
                          `${process.env.NEXT_PUBLIC_SERVER}/api/team/requests/${user.teamId}`,
                          {
                            method: "PATCH",
                            //mode: "cors",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${session.accessTokenBackend}`,
                              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1YjIxMWViMWIxN2M5MzE5Y2YzN2YiLCJpYXQiOjE2NjMwODc1MTMsImV4cCI6MTY2MzUxOTUxM30.IsQBnMGMJfpc0W16dCGrAY-2nfIgcSOk24UK-WQmBCw`,

                              "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                              userId: user.userId._id,
                              status: 1,
                            }),
                          }
                        )
                          .then((data) => data.json())
                          .then((data) => {
                            console.log(data.message);
                            toast.success(`${data.message}`, {
                              position: toast.POSITION.TOP_RIGHT,
                            });
                            // window.location.reload(false);
                          });
                        //console.log(Cookies);
                      }}
                    >
                      Accept Request
                      <ToastContainer />
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => {
                        console.log("click");
                        fetch(
                          `${process.env.NEXT_PUBLIC_SERVER}/api/team/requests/${user.teamId}`,
                          {
                            method: "PATCH",
                            //mode: "cors",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${session.accessTokenBackend}`,
                              // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE1YjIxMWViMWIxN2M5MzE5Y2YzN2YiLCJpYXQiOjE2NjMwODc1MTMsImV4cCI6MTY2MzUxOTUxM30.IsQBnMGMJfpc0W16dCGrAY-2nfIgcSOk24UK-WQmBCw`,

                              "Access-Control-Allow-Origin": "*",
                            },
                            body: JSON.stringify({
                              userId: user.userId._id,
                              status: 0,
                            }),
                          }
                        )
                          .then((data) => data.json())
                          .then((data) => {
                            console.log(data.message);
                            toast.success(`${data.message}`, {
                              position: toast.POSITION.TOP_RIGHT,
                            });
                            // window.location.reload(false);
                          });
                        //console.log(Cookies);
                      }}
                    >
                      Decline Request
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
                }
              </div>
              {/* <div className={styles.infogroup}></div> */}
            </div>
          );
        }
      })}
    </div>
  );
}
export default PendingUserRequests;
