import { useSession } from "next-auth/react";
import React, { useContext, useRef } from "react";
import { useEffect, useState } from "react";
import CreateTeam from "./CreateTeam";
import Counter from "./Counter";
import LeaderDashboard from "./LeaderDashboard";
import TeamMembers from "./TeamMembers";
function Dashboard() {
  const [hasTeam, setHasTeam] = useState(false);
  const [useEffectTrigger, setUseEffectTrigger] = useState(false)
  const [isLeader, setIsLeader] = useState(false);
  const [teamData, setTeamData] = useState({});
  const [teamToken, setTeamToken] = useState();

  // const teamNameRef = useRef(null);
  const { data: session } = useSession();

  const handleTeamDelete = (currentTeamStatus) => {
    setHasTeam(currentTeamStatus);
  }

  const handleTeamCreate = () => {
    setUseEffectTrigger(prevTeamStatus => !prevTeamStatus);
  }

  const handleMemberRemove = () => {
    setUseEffectTrigger(prevTeamStatus => !prevTeamStatus);
  }

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
        console.log("data fetched again called")

        if (data.user?.teamId !== null) {
          setHasTeam(true);
        }
        if (data.user?.teamRole === 0) {
          setIsLeader(true);
        }
        setTeamData(data.user);
        console.log("data")
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

  console.log("state data new")
  console.log(teamData);
  console.log("teamid")
  console.log(teamData.teamId?._id)
  console.log("closed")

  //token id
  useEffect(() => {
    if (teamData?.teamId?._id) {
      console.log('teamData inside use effect!!!!!!', teamData?.teamId?._id)
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/token/${teamData.teamId._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          console.log("token data")
          console.log(data);
          console.log(data.teamToken);
          setTeamToken(data.teamToken);
        })
    }
  }, [teamData]);



  return (
    <div>
      <Counter />
      {hasTeam ? (
        isLeader ? (
          <LeaderDashboard teamData={teamData} handleTeamDelete={handleTeamDelete} teamToken={teamToken} handleMemberRemove={handleMemberRemove} />
        )
          :
          (
            <TeamMembers teamData={teamData} />
          )

      )
        : (
          // If team is not there
          <CreateTeam handleTeamCreate={handleTeamCreate} />
        )
      }
    </div>
  );
}

export default Dashboard;