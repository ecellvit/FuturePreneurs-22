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
        (round === "game") && <CardComponent heading={"1.1"} teamId={teamId} round={round}
          intro={`
        Alright! Now, with the theme of Futurepreneurs 8.0 in your hand, you desire to build your resort. To do so, one must back themselves up with resources to start with. So take a moment and think, "What should be the ideal step to take when you are intending to start a resort business?" \n

        If your answer is "location," you guessed wrong. One must indeed select a suitable location to build something. But there is one thing that every entrepreneur should consider before purchasing land, and that is the "customer market." Knowing your customer market means knowing what type of customer you want to cater to. One must analyze the needs and demands of customers within the scope of development. This is a crucial step, which will eventually add up to the profitability of one's business. \n
        
        Now you will be provided with the data from the "World Tourism Organization". Analyze the data carefully and decide on your customer market. \n
        
        - Data will be provided only once. \n
        - Once you select the "Start" bar, you will not be able to navigate back to see the data. \n
        - After reading the data, select "Start" to move to the next stage. \n
        - You will be provided with a map containing five landmarks. \n
        - Navigate to the landmark where you want to build your resort. \n
        - There you will be provided with a prompt to confirm your decision. \n
        - Once confirmed, you will not be allowed to navigate back. \n
        - You have 7 minutes to finish this round. \n
         `}

        />
      }
      {
        (round === "round1") && <CardComponent heading={"1.2"} teamId={teamId} round={round}
          intro={`
          So, that was the end of Round 1.1. Hope you had an immersive experience. \n
          
          Now that you have successfully selected your customer market, it's time to buy land for your resort. But lamentably you are not the only player in the market. Your competitors are set to drop your profit down. Fortunately, you know the master concept of "Game Theory." Entwine your brains around and analyze the optimal location which attracts the most customers and makes you money! \n

          -In this round, you will be given a map. \n
          -Your character will be allowed to move around. \n
          -Now, you must choose the location of your resort. \n
          -The green spaces are the available locations. \n
          -When you select a location, you will be given the option to confirm your selection. \n
          -Once you confirm your selection, you will NOT be allowed to change it. \n
          -After selecting the location, the screen will be frozen. \n
          -You have 10 minutes to finish this round. \n
          `}
        />
      }
      {
        (round === "round2") && <CardComponent heading={"1.3"} teamId={teamId} round={round}
          intro={`Oh, clever move!! That sure will add to your profit. To beat one's opponent in the competitive market, one must make themselves stand out. Cater to the needs of customers, making sure to provide them with an extravagant experience and win their satisfaction. You also need to make your business profitable and live up to the standards of quality. \n

          Now you will be provided with a list of amenities, along with a budget. You need to select any ten of them so that they match the needs of your customers. Make sure to use the budget wisely. Also, select the amenities that satisfy the needs of your customers effectively. \n
          
          - Drag the desired amenity from the list of amenities and drop it in the dialogue box. \n
          - If you desire to edit, swap, or reselect the amenity, you can do it. \n
          - Once you confirm the amenities, you can navigate back, or edit them. \n
          - You must select 10 amenities in total, not less, not more. \n
          - You have 15 minutes to finish this round.`}
        />
      }
      {
        (round === "round3") && <CardComponent heading={"2.1"} teamId={teamId} round={round} />
      }
    </div>
  )
}
