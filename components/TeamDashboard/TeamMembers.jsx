import styles from "../../styles/Dashboard.module.css";
import TeamMember from "./TeamMember";
const TeamMembers = ({ teamData }) => {
  
  return (
    <div className={styles.team_member_section}>
      <div className={styles.team_member_section_wrapper}>
        {/* Team Details */}
        <h2 className={styles.team_name}>
          {/* Printing team name */}
          Team - {teamData.teamName}
        </h2>
        <div className={`${styles.team_row} ${styles.align_centre}`}>
          {/* /////////////////////////////////////Returning Team Members//////////////////////////////////////// */}

          {teamData.members?.map((team) => {
            return (
              <TeamMember
                teamName={team.name}
                mobileNumber={team.mobileNumber}
                email={team.email}
                key={team.id}
              ></TeamMember>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default TeamMembers;
