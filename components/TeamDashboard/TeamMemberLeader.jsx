import styles from "../../styles/Dashboard.module.css";
import { useSession } from "next-auth/react";
const TeamMemberLeader = ({ teamName, mobileNumber, email, teamId, userId, handleMemberRemove, teamRole }) => {

  console.log("team id")
  console.log(teamId);
  console.log("user id")
  console.log(userId)

  const { data: session } = useSession();
  const handleRemove = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/remove/${teamId}`, {
      method: "PATCH",
      body:
        JSON.stringify({
          "userId": `${userId}`,
        }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(data => data.json())
      .then(data => {
        console.log(data)
        handleMemberRemove();
      })
  }

  return (
    <div
      className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}`}
    >
      <div className={styles.member_container}>
        <div
          className={`${styles.centre_align} ${styles.bottom_margin}`}
        >
          <h4 className={styles.member_name}>{teamName}</h4>
          {teamRole == 0 ?
            <p className={styles.role_tag}>Leader</p>
            :
            <p className={styles.role_tag}>Teammate</p>
          }
        </div>
        <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
          <p className={styles.phone_number}>{mobileNumber}</p>
          <p className={styles.paragraph}>{email}</p>

          {teamRole == 0 ?
            <></>
            :
            <button className={`${styles.remove_team_btn} ${styles.w_button} `} onClick={handleRemove}>
              Remove
            </button>
          }

        </div>
      </div>
    </div>
  );
};
export default TeamMemberLeader;
