import { useSession } from "next-auth/react";
import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import CreateTeam from "./CreateTeam";
import Counter from "./Counter";
import styles from "../../styles/Dashboard.module.css";
import LeaderDashboard from "./LeaderDashboard";
import TeamMembers from "./TeamMembers";
import Loading from "../Loading";

function Dashboard() {
  const [hasTeam, setHasTeam] = useState(false);
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [teamToken, setTeamToken] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const teamNameRef = useRef(null);
  const { data: session } = useSession();

  const handleTeamDelete = (currentTeamStatus) => {
    setHasTeam(currentTeamStatus);
  };

  const handleTeamCreate = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  const handleMemberRemove = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  const handleMemberLeave = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  // for getting user details
  useEffect(() => {
    setIsLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
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
        if (data.user.teamId) {
          setHasTeam(true);
        }else{
          setHasTeam(false);
        }
        if (data.user?.teamRole === 0) {
          setIsLeader(true);
        }
        setTeamData(data.user);
      })

      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }, [useEffectTrigger, session.accessTokenBackend]);

  //token id
  useEffect(() => {
    if (teamData?.teamId?._id) {
      setIsLoading(true);
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/team/token/${teamData.teamId._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessTokenBackend}`,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
        .then((data) => data.json())
        .then((data) => {
          setTeamToken(data.teamToken);
          setIsLoading(false);
        });
    }
  }, [session.accessTokenBackend, teamData]);

  return (

    <div className={styles.bodyContainer}>
      {isLoading ? (
        <Loading />
      ) : hasTeam ? (
        isLeader ? (
          <LeaderDashboard
            teamData={teamData}
            handleTeamDelete={handleTeamDelete}
            teamToken={teamToken}
            handleMemberRemove={handleMemberRemove}
          />
        ) : (
          <TeamMembers teamData={teamData} handleMemberLeave={handleMemberLeave}/>
        )
      ) : (
        <CreateTeam isLeader={isLeader} handleTeamCreate={handleTeamCreate} />
      )}
    </div>
  );
}

export default Dashboard;
