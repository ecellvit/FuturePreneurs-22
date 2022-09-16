import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PendingUserRequests() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);
  const handleTeamAccept = (user) => {
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
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
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  const handleTeamDecline = (user) => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER}/api/team/requests/${user.teamId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,

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
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.user.teamId != undefined && data.user.teamId != null) {
            data.user.teamId.members.map((teamLead) => {
              if (teamLead.teamRole === 0) {
                if (teamLead._id === data.user._id) {
                  fetch(
                    `${process.env.NEXT_PUBLIC_SERVER}/api/team/requests/${data.user.teamId._id}`,
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

  return (
    <div className={styles.Teams}>
      {userData.map((user) => {
        if (user.userId != null) {
          return (
            <div className={styles.Cards} key={user._id}>
              <Avatar
                name={user.userId.email}
                className={styles.CardsImg}
                size="300"
              />

              <div className={styles.infogroup}>
                {
                  <div>
                    <h3 className={styles.Cardsh3}>
                      User Name:{user.userId.firstName} {user.userId.lastName}
                    </h3>

                    <h3 className={styles.Cardsh3}>
                      Phone Number:{user.userId.mobileNumber}
                    </h3>

                    <h3 className={styles.Cardsh3}>
                      User Mail:{user.userId.email}
                    </h3>
                    <button
                      className={styles.button}
                      onClick={() => {
                        handleTeamAccept(user);
                      }}
                    >
                      Accept Request
                    </button>
                    <button
                      className={styles.button}
                      onClick={() => {
                        handleTeamDecline(user);
                      }}
                    >
                      Decline Request
                    </button>
                  </div>
                }
              </div>
              <ToastContainer />
            </div>
          );
        }
      })}
    </div>
  );
}
export default PendingUserRequests;
