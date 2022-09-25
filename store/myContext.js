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
  teamId:0,
  teamIdHandler: ()=>{},
});

export const MyContextProvidor = (props) => {
  const [isLeader, setIsLeader] = useState(false);
  const [notys, setNotys] = useState(0);
  const [teamId, setTeamId] = useState(0);

	// const {data:session} = useSession();

	const contextValue = {
		// all global variables here, can even give functions.
		isLeader: isLeader,
    leaderHandler: (bool)=>{
      setIsLeader(bool)
    },
    notys: notys,
    notyHandler: (num)=>{setNotys(num)},
    teamId: teamId,
    teamIdHandler: (id)=>{setTeamId(id)},
  };

  return (
    <myContext.Provider value={contextValue}>
      {props.children}
    </myContext.Provider>
  );
};

export default myContext;