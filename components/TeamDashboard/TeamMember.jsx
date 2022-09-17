import styles from "../../styles/Dashboard.module.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Loading from "../Loading";

const TeamMember = ({
  teamName,
  mobileNumber,
  email,
  teamId,
  userId,
  handleMemberLeave,
  teamRole,
}) => {

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleLeave = () => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/leave/${teamId}`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: `${userId}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleMemberLeave();
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? <Loading /> :
        (<div
          className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}`}
        >
          <div className={styles.member_container}>
            <div
              className={`${styles.centre_align} ${styles.bottom_margin}`}
            >
              {/* Team Name */}
              <h4 className={styles.member_name}>{teamName}</h4>
              {teamRole == 0 ? (
                <p className={styles.role_tag}>Leader</p>
              ) : (
                <p className={styles.role_tag}>Teammate</p>
              )}
            </div>
            <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
              {/* Team Mobile number */}
              <p className={styles.phone_number}>{mobileNumber}</p>
              {/* Team email */}
              <p className={styles.paragraph}>{email}</p>
              {teamRole == 0 ? (
                <></>
              ) : (
                <button
                  className={`${styles.remove_team_btn} ${styles.w_button} `}
                  onClick={handleLeave}
                >
                  Leave
                </button>
              )}
            </div>
          </div>
        </div>)}
    </>
  );
};
export default TeamMember;
