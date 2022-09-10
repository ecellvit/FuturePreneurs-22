import React from "react";
import TeamMemberLeader from "./TeamMemberLeader";
import styles from "../../styles/Dashboard.module.css";
const LeaderDashboard = (props) => {
  const { teamData } = props;
  const teamLink = "https://myvit.live/https://myvit.live/";
  return (
    <div className={styles.team_member_section}>
      <div className={styles.team_member_section_wrapper}>
        {/* Team Details */}
        <h2 className={styles.team_name}>
          {/* Printing team name */}
          Team - {teamData.teamId.teamName}
        </h2>
        <h2 className={styles.invite_link_container}>
          ( Link -{" "}
          <a href="#" className={styles.invite_link_a}>
            {teamLink}
          </a>{" "}
          )
        </h2>
        <div className={`${styles.team_row} ${styles.align_centre}`}>
          {/* Returning Team Members */}
          {teamData.teamId.members.map((team) => {
            return (
              <TeamMemberLeader
                teamName={team.name}
                mobileNumber={team.mobileNumber}
                email={team.email}
                key={team.id}
              ></TeamMemberLeader>
            );
          })}
        </div>
      </div>
      {/* Start Quiz Button */}
      <button className={`${styles.start_quiz} ${styles.w_button}`}>
        Start Quiz
      </button>
    </div>
  );
};

export default LeaderDashboard;
