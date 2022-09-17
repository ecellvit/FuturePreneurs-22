import React from "react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/SearchTeams.module.css";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

function PendingUserRequests() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleTeamAccept = (user) => {
    console.log(
      JSON.stringify({
        userid: user.userId._id,
        status: 1,
      })
    );
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };
  const handleTeamDecline = (user) => {
    setIsLoading(true);
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
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setIsLoading(false);
      });
  };
  useEffect(() => {
    if (session) {
      setIsLoading(true);
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
          setIsLoading(false);
        });
    }
  }, [session]);

  return (
    <>
      {isLoading ? <Loading /> :
        (<div className={styles.Teams}>
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
                </div>
              );
            }
          })}
        </div>)}
    </>
  );
}
export default PendingUserRequests;
