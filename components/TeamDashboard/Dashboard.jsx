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
  const [isLeader, setIsLeader] = useState(true);
  const [teamData, setTeamData] = useState({});

  // const teamNameRef = useRef(null);
  const { data: session } = useSession();

  const handleTeamDelete = (currentTeamStatus) => {
    setHasTeam(currentTeamStatus);
  };

  const handleTeamCreate = () => {
    setUseEffectTrigger((prevTeamStatus) => !prevTeamStatus);
  };

  console.log(session, "in dashboard");

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
        console.log("data fetched again called");

        if (data.user?.teamId !== null) {
          setHasTeam(true);
        }
        if (data.user) {
          setTeamData(data.user);
        }
        console.log("data");
        console.log(data);
        // console.log("data.user")
        // console.log(data.user);
      })

      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
    console.log(hasTeam);
  }, [useEffectTrigger]);

  console.log("state data");
  console.log(teamData);

  return (
    <div>
      <Counter />
      {hasTeam ? (
        isLeader ? (
          <LeaderDashboard
            teamData={teamData}
            handleTeamDelete={handleTeamDelete}
          />
        ) : (
          <TeamMembers teamData={teamData} />
        )
      ) : (
        // If team is not there
        <CreateTeam handleTeamCreate={handleTeamCreate} />
      )}
    </div>
  );
}

export default Dashboard;
