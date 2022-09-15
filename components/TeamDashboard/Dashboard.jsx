import { useSession } from "next-auth/react";
import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import CreateTeam from "./CreateTeam";
import Counter from "./Counter";
import LeaderDashboard from "./LeaderDashboard";
import TeamMembers from "./TeamMembers";
function Dashboard() {
  const [hasTeam, setHasTeam] = useState(false);
  const [useEffectTrigger, setUseEffectTrigger] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [teamToken, setTeamToken] = useState();

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


  // for getting user details
  useEffect(() => {
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
        if (data.user.teamId) {
          setHasTeam(true);
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
        });
    }
  }, [teamData]);

  return (
    <div>
      {/* <Counter /> */}
      {hasTeam ? (
        isLeader ? (
          <LeaderDashboard
            teamData={teamData}
            handleTeamDelete={handleTeamDelete}
            teamToken={teamToken}
            handleMemberRemove={handleMemberRemove}
          />
        ) : (
          <TeamMembers teamData={teamData} />
        )
      ) : (
        <CreateTeam handleTeamCreate={handleTeamCreate} />
      )}
    </div>
  );
}

export default Dashboard;
