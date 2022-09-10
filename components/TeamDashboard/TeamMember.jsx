import styles from "../../styles/Dashboard.module.css";
const TeamMember = (props) => {
  const { teamName, mobileNumber, email, key } = props;
  return (
    <div
      className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}`}
    >
      <div className={styles.member_container}>
        <div
          className={`${styles.centre_align} ${styles.bottom_margin}`}
          key={key}
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
        </div>
      </div>
    </div>
  );
};
export default TeamMember;
