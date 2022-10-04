import styles from "../../styles/Dashboard.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import Loading from "../Loading";
import { useState } from "react";
const TeamMemberLeader = ({
  teamName,
  mobileNumber,
  email,
  teamId,
  userId,
  handleMemberRemove,
  teamRole,
}) => {

  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = () => {
    setIsLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/remove/${teamId}`, {
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
        // console.log(data);
        toast.success(`${data.message}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        handleMemberRemove();
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? <Loading /> :
        (<div
          className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}  ${styles.zoom}`}
        >
          <div className={`${styles.member_container} ${styles.border_gradient} `}>
            <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
              <h4 className={styles.member_name}>{teamName}</h4>
              {teamRole == 0 ? (
                <p className={styles.role_tag}>Leader</p>
              ) : (
                <p className={styles.role_tag}>Teammate</p>
              )}
            </div>
            <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
              <p className={styles.phone_number}>{mobileNumber}</p>
              <p className={styles.paragraph}>{email}</p>

              {/* {teamRole == 0 ? (
                <></>
              ) : (
                <button
                  className={`${styles.remove_team_btn} ${styles.w_button}`}
                  onClick={handleRemove}
                >
                  Remove
                </button>
              )} */}
            </div>
          </div>
        </div>)}
    </>
  );
};
export default TeamMemberLeader;
