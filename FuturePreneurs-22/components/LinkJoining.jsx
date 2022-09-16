import React,{useState,useEffect} from 'react'
import { useSession } from "next-auth/react";
import styles from "../styles/LinkJoining.module.css";

function LinkJoining({joiningId}) {

    const [teamDetails,setTeamDetails] = useState({});

    const { data: session } = useSession();

    // useEffect(() => {
    //     fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/${joiningId}`, {
    //         method: "GET",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${session.accessTokenBackend}`,
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //       })
    //         .then((data) => data.json())
    
    //         .then((data) => {
              
    //           if (data.team) {
    //             setTeamDetails(data.team);
    //           }
    //           console.log("data")
    //           console.log(data);
    //           // console.log("data.user")
    //           // console.log(data.user);
    //         })
    // }, [])
    
    const handleJoin = () => {
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/token`, {
            method: "PATCH",
            body: JSON.stringify({
                "token": joiningId,
              }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessTokenBackend}`,
              "Access-Control-Allow-Origin": "*",
            },
          })
            .then((data) => data.json())
    
            .then((data) => {
              
              if (data.team) {
                setTeamDetails(data.team);
              }
              console.log("data")
              console.log(data);
              // console.log("data.user")
              // console.log(data.user);
            })
    }

  return (
    <div className={styles.container}>
    <div className={styles.teamName}>
        Team Name : {teamDetails.teamName}
    </div>
    <div className={styles.btn} onClick={handleJoin}>
        join team
    </div>
    </div>
  )
}

export default LinkJoining