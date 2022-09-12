// import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

// this is react context, here you can give global variables
const myContext = React.createContext({
  // all default values
  isLoggedIn: false,
});

export const MyContextProvidor = (props) => {

	// const {data:session} = useSession();

	const contextValue = {
		// all global variables here, can even give functions.
		abc:123,
  };

  return (
    <myContext.Provider value={contextValue}>
      {props.children}
    </myContext.Provider>
  );
};

export default myContext;