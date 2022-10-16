import CardComponent from '../components/CardComponent'
import styles from '../styles/Dashboard.module.css'
import { useState,useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Instructions() {
  const [round, setRound] = useState("round1")
  const { data: session } = useSession();

  // useEffect(() => {
  //   console.log("hello")
  //   if(session){
  //     fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/roundone/634ae4e5f90b75088fd21010`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${session.accessTokenBackend}`,
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //       body: JSON.stringify(respBody),
  //     })
  //       .then((response) => {
  //         return response.json()
  //       })
  //       .then((data) => {
  //         // setRound(data);
  //         console.log("data")
  //         console.log(data);
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }, [session])

  return (
    <div className={styles.cardbody}>
    {
     (round === "round1")&&<CardComponent heading={"one"} />
    }
    {
     (round === "round2")&&<CardComponent heading={two} />
    }
    {
     (round === "round2")&&<CardComponent heading={three}/>
    }

    </div>
  )
}
