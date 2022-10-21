// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// this is react context, here you can give global variables
const myContext = React.createContext({
  // all default values
  isLeader: false,
  leaderHandler: ()=>{},
  notys: 0,
  notyHandler: ()=>{},
  teamId: 0,
  teamIdHandler: ()=>{},
});

export const MyContextProvidor = (props) => {
  const [isLeader, setIsLeader] = useState(true);
  const [notys, setNotys] = useState(0);
  const [teamId, setTeamId] = useState(
    typeof window !== 'undefined' ?
      localStorage.getItem("teamId") :
      0
  );

	const contextValue = {
		isLeader: isLeader,
    leaderHandler: (bool)=>{
      setIsLeader(bool)
    },
    notys: notys,
    notyHandler: (num)=>{setNotys(num)},
    teamId: teamId,
    teamIdHandler: (id) => {
      if(typeof window !== 'undefined'){
        setTeamId(id)
        localStorage.setItem('teamId', id)
      }
    },
  };

  return (
    <myContext.Provider value={contextValue}>
      {props.children}
    </myContext.Provider>
  );
};

export default myContext;