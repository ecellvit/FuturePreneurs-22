// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// this is react context, here you can give global variables
const myContext = React.createContext({
  // all default values
  isLeader: false,
  LeaderHandler: ()=>{},
});

export const MyContextProvidor = (props) => {
  const [isLeader, setIsLeader] = useState(false);

	// const {data:session} = useSession();

	const contextValue = {
		// all global variables here, can even give functions.
		isLeader: isLeader,
    LeaderHandler: (bool)=>{
      setIsLeader(bool)
    }
  };

  return (
    <myContext.Provider value={contextValue}>
      {props.children}
    </myContext.Provider>
  );
};

export default myContext;