import styles from "../../styles/Dashboard.module.css";
import TeamMember from "./TeamMember";
import React, { useState } from "react";
const TeamMembers = ({ teamData,handleMemberLeave}) => {
  
  const [teamId, setTeamId] = useState(teamData?.teamId?._id);

  return (
    <div className={styles.team_member_section}>
      <div className={styles.team_member_section_wrapper}>
        <h2 className={styles.team_name}>
          Team - {teamData?.teamId?.teamName}
        </h2>
        <div className={`${styles.team_row} ${styles.align_centre}`}>

          {teamData?.teamId?.members?.map((team) => {
            return (
              <TeamMember
                key={team._id}
                  teamName={team.name}
                  mobileNumber={team.mobileNumber}
                  email={team.email}
                  teamId={teamId}
                  userId={team._id}
                  handleMemberLeave={handleMemberLeave}
                  teamRole={team.teamRole}
              ></TeamMember>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

export default TeamMembers;
