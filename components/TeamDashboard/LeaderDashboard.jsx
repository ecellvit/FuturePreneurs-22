import React, { useState } from "react";
import { useSession } from "next-auth/react";
import TeamMemberLeader from "./TeamMemberLeader";
import styles from "../../styles/Dashboard.module.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";

const LeaderDashboard = ({
  teamData,
  handleTeamDelete,
  teamToken,
  handleMemberRemove,
}) => {
  const [teamId, setTeamId] = useState(teamData.teamId._id);
  const [isLoading, setIsLoading] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const { data: session } = useSession();

  const showToastMessage = () => {
    toast("Copied to Clipboard!", {
      position: toast.POSITION.BOTTOM_CENTER,
      className: "toast-message",
    });
  };
  console.log(teamData);

  const onCopyText = () => {
    //alert("Copied");
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleDelete = () => {
    if (teamData.teamId.members.length === 1) {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team/${teamData.teamId._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          setIsLoading(false);
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
          handleTeamDelete(false);
        });
    } else {
      toast.error("Please remove all team members first", {
        toastId: "error_team",
      });
    }
  };
  return (
    <div>
      <div className={styles.team_member_section}>
        <div className={styles.team_member_section_wrapper}>
          <h2 className={styles.team_name}>
            Team - {teamData?.teamId?.teamName}
          </h2>
          <h2 className={styles.invite_link_container}>
            <label className={styles.label}>Team Link:</label>
            <input
              type="text"
              value={`https://future-preneurs-22.vercel.app/join-team-link/${teamToken}`}
              placeholder="Type some text here"
              onChange={(event) => setText(event.target.value)}
              className={styles.input}
            />
            <CopyToClipboard
              text={`https://future-preneurs-22.vercel.app/join-team-link/${teamToken}`}
              onCopy={onCopyText}
            >
              <div className="copy-area">
                <button className={`${styles.btnCopy} ${styles.glow_on_hover}`} onClick={showToastMessage}>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  copy
                </button>
              </div>
            </CopyToClipboard>
          </h2>
          <div className={`${styles.team_row} ${styles.align_centre}`}>
            {teamData?.teamId?.members?.map((team) => {
              return (
                <TeamMemberLeader
                  key={team._id}
                  teamName={team.name}
                  mobileNumber={team.mobileNumber}
                  email={team.email}
                  teamId={teamId}
                  userId={team._id}
                  handleMemberRemove={handleMemberRemove}
                  teamRole={team.teamRole}
                ></TeamMemberLeader>
              );
            })}
          </div>
          <button
            className={`${styles.leave_team_btn} ${styles.team_leader_btn} ${styles.w_button}`}
            onClick={handleDelete}
          >
            Delete Team
          </button>
        </div>
        </div>
    </div>
  );
};

export default LeaderDashboard;
