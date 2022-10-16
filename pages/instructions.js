import CardComponent from '../components/CardComponent'
import styles from '../styles/Dashboard.module.css'
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";


export default function Instructions() {
  const [round, setRound] = useState()
  const { data: session } = useSession();
  const router = useRouter();


  const [teamId, setTeamId] = useState();

  useEffect(() => {
    if (session) {
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
            console.log(data.user.teamId._id, "yoyo")
            setTeamId(data.user.teamId._id)
          }

        })

        .catch((error) => {
          console.error(
            "There has been a problem with your fetch operation:",
            error
          );
        });
    }
  }, [session]);

  useEffect(() => {
    if (session && teamId) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/round/${teamId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          // setRound(data);
          console.log("data round")
          console.log(data);
          if (!data.hasRoundOneEnd && !data.hasRoundTwoEnd && !data.hasRoundThreeEnd) {
            setRound("game")
          }
          else if (data.hasRoundOneEnd && !data.hasRoundTwoEnd && !data.hasRoundThreeEnd) {
            setRound("round1")
          }
          else if (data.hasRoundOneEnd && data.hasRoundTwoEnd && !data.hasRoundThreeEnd) {
            setRound("round2")
          }
          else {
            setRound("round3")
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [session,teamId])


  return (
    <div className={styles.cardbody}>

      {
        (round === "game") && <CardComponent heading={"game"} teamId={teamId} round={round}  />
      }
      {
        (round === "round1") && <CardComponent heading={"one"} teamId={teamId} round={round}/>
      }
      {
        (round === "round2") && <CardComponent heading={"two"} teamId={teamId} round={round}/>
      }
      {
        (round === "round3") && <CardComponent heading={"three"} teamId={teamId} round={round}/>
      }

    </div>
  )
}
