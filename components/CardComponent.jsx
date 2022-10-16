import React from 'react'
import Loading from "./Loading"
import { useState,useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import { useSession } from "next-auth/react";

function CardComponent({heading,paragraph}) {
  const [map, setMap] = useState()
  const { data: session } = useSession();
  const [teamId, setTeamId] = useState({});

  useEffect(() => {
    if(session){
      
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
          console.log(data.user.teamId._id)
          setTeamId(data.user.teamId._id)
        }
      
      })

      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });
  }}, [session]);

 


  function handleNext() {
   
      console.log("hello")
      if(session){
        fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/${teamId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          }
        })
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            // setRound(data);
            console.log("data")
            console.log(data);
          })
          .catch((err) => {
            console.log(err)
          })
        }
  }
    return (
     
      <>
     
          <div
            className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch}  ${styles.cardbodyContainer}`}
          >
            <div className={`${styles.member_container} ${styles.border_gradient} `}>
              <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
                <h4 className={styles.cardHeading}>{heading}</h4>
                <div className={styles.instructions}>
                {paragraph}
              </div>
              </div>
            </div>
                <div className={styles.start_btn}>
                          <img
                        
                            src={
                              "start.png"
                            }
                            width="290px"
                            sizes="(max-width: 479px) 31vw, (max-width: 1919px) 145px, 290px"
                            alt=""
                            className={styles.image}
                            style={{ display:"block" }}
                            onClick={()=>{
                              handleNext()}}
                          />
                       
                </div>
              </div>
       
      </>
    );
 
}

export default CardComponent