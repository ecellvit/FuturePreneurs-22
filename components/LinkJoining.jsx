import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/LinkJoining.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

function LinkJoining({ joiningId }) {
  const [teamDetails, setTeamDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

  const handleJoin = () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/token`, {
      method: "PATCH",
      body: JSON.stringify({
        token: `${joiningId}`,
      }),
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
        setIsLoading(false);
        if (data.team) {
          setTeamDetails(data.team);
        }
      });
  };

  return (

    <>
      {isLoading?<Loading/>:(<div className={styles.container}>
      <ToastContainer
        ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.teamName}>Team Name : {teamDetails.teamName}</div>
      <button className={styles.btn} onClick={handleJoin}>
        join team
      </button>
    </div>)}
    </>
  );
}

export default LinkJoining;
