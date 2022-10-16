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
  }, [session, teamId])


  return (
    <div className={styles.cardbody}>

      {
        (round === "game") && <CardComponent heading={"game"} teamId={teamId} round={round}
          intro={`
         Alright! Now, with the theme of Futurepreneurs 8.0 in your hand, you desire to build your resort. To do so, one must back themselves up with resources to start with. So take a moment and think, "What should be the ideal step to take when you are intending to start a resort business?"

If your answer is "location," you guessed wrong. One must indeed select a suitable location to build something. But there is one thing that every entrepreneur should consider before purchasing land, and that is the "customer market." Knowing your customer market means knowing what type of customer you want to cater to. One must analyze the needs and demands of customers within the scope of development. This is a crucial step, which will eventually add up to the profitability of one's business.

Now you will be provided with the data from the "World Tourism Organization". Analyze the data carefully and decide on your customer market.

- Data will be provided only once.
- Once you select the "Start" bar, you will not be able to navigate back to see the data.
- After reading the data, select "Start" to move to the next stage.
- You will be provided with a map containing five landmarks.
- Navigate to the landmark where you want to build your resort.
- There you will be provided with a prompt to confirm your decision.
- Once confirmed, you will not be allowed to navigate back.
         `}

        />
      }
      {
        (round === "round1") && <CardComponent heading={"one"} teamId={teamId} round={round}
          intro={"Read through all the instructions carefully as this will be vital for your performance in the quiz."}
        />
      }
      {
        (round === "round2") && <CardComponent heading={"two"} teamId={teamId} round={round}
          intro={"Read through all the instructions carefully as this will be vital for your performance in the quiz."}
        />
      }
      {
        (round === "round3") && <CardComponent heading={"three"} teamId={teamId} round={round} />
      }

    </div>
  )
}
