import styles from "../../styles/Dashboard.module.css";
const TeamMemberLeader = ({ teamName, mobileNumber, email, id }) => {

  const handleRemove = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/remove/631db462624f4fa33db8b055`, {
      method: "PATCH",
      body:
        JSON.stringify({
          "userId": "631de6ec5fa2f1d14964f495",
        }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzFkZTVjMTBkNDJkOWIzOWRjYjM4M2UiLCJpYXQiOjE2NjI5MDM3NDUsImV4cCI6MTY2MzMzNTc0NX0.7BwzEpG3eQq-HZGP5SO0ci4FaxWSlgkstbRMuOBmxCI`,
        "Access-Control-Allow-Origin": "*",
      },
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
          {/* Team Name */}
          <h4 className={styles.member_name}>{teamName}</h4>
          <p className={styles.role_tag}>Teammate</p>
        </div>
        <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
          {/* Team Mobile number */}
          <p className={styles.phone_number}>{mobileNumber}</p>
          {/* Team email */}
          <p className={styles.paragraph}>{email}</p>
          <button className={`${styles.remove_team_btn} ${styles.w_button} `} onClick={handleRemove}>
            Remove
          </button>

        </div>
      </div>
    </div>
  );
};
export default TeamMemberLeader;
