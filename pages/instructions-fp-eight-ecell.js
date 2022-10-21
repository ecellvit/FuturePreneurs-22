import CardComponent from "../components/CardComponent";
import styles from "../styles/Dashboard.module.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "../components/Loading";

export default function Instructions() {
  const [round, setRound] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const [teamId, setTeamId] = useState();

  useEffect(() => {
    if (session) {
      setIsLoading(true);
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
            setTeamId(data.user.teamId._id);
            setIsLoading(false);
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
      setIsLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team/round/${teamId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (
            !data.hasRoundOneEnd &&
            !data.hasRoundTwoEnd &&
            !data.hasRoundThreeEnd
          ) {
            setRound("game");
            setIsLoading(false);
          } else if (
            data.hasRoundOneEnd &&
            !data.hasRoundTwoEnd &&
            !data.hasRoundThreeEnd
          ) {
            setRound("round1");
            setIsLoading(false);
          } else if (
            data.hasRoundOneEnd &&
            data.hasRoundTwoEnd &&
            !data.hasRoundThreeEnd
          ) {
            setRound("round2");
            setIsLoading(false);
          } else if (
            data.hasRoundOneEnd &&
            data.hasRoundTwoEnd &&
            data.hasRoundThreeEnd
          ) {
            router.push("/round21");
            setIsLoading(false);
          } else if( data.hasRoundOneEnd &&
            data.hasRoundTwoEnd &&
            data.hasRoundThreeEnd &&
            data.hasLastRoundEnd
            ) {
            router.push("/thankyou");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [session, teamId]);

  return (
    <div className={styles.cardbody}>
      <span style={{ whiteSpace: "pre-line", justifyContent: "left" }}>
        {isLoading ? (
          <Loading />
        ) : (
          round === "game" && (
            <CardComponent
              heading={"1.1"}
              teamId={teamId}
              round={round}
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
        - You have 7 minutes to finish this round. \n \n

        Before you set up your resort, you decide to first research about Sapphire City and the tourists it receives annually. You refer to the data on the World Tourism Organization’s website to best strategize setting up your resort. \n

        This is what you find - \n

        - Sapphire City’s history dates back to the 1700s centered around the fight for a temple. Many battles were fought between large kingdoms to conquer the Sapphire Temple as it was fabled that the Kingdom that would control the temple would gain immense prosperity and the people that visited the temple would be granted peace and protection always. Owing to its history, it is most natural that Sapphire City attracts a large number of pilgrims. This number only grows during the time of temple festivities in the months of November and December. \n
        - Sapphire City is relatively large and has a land area of almost 2900 square kilometers including the coastline, the mountainous temple region and the tech park. Sapphire City also has a large green cover and a great healthcare and education system to cater to its population. \n
        - Sapphire City in a bid to join the globalizing world also boasts of a Tech Park. The newly developed Tech Park in Sapphire City attracts many businesspersons due to its state-of-the-art architecture and its perfect placement. Businesspersons visit Sapphire City in large numbers throughout the year and this only grows during the annual conferences in the months of June and July. \n
        - Famous for its Sapphire Beach, Sapphire City naturally attracts a large number of tourists for its water activities from surfing and snorkeling to the more advanced scuba diving. Sapphire Beach is a holiday hotspot not only for students from neighbouring cities but also a relaxing option for families alike. Sapphire City, during the summer months of April and May, sees a hike in the number of tourists visiting Sapphire City for its beach.
         `}
            />
          )
        )}
        {isLoading ? (
          <Loading />
        ) : (
          round === "round1" && (
            <CardComponent
              heading={"1.2"}
              teamId={teamId}
              round={round}
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
          )
        )}
        {isLoading ? (
          <Loading />
        ) : (
          round === "round2" && (
            <CardComponent
              heading={"1.3"}
              teamId={teamId}
              round={round}
              intro={`Oh, clever move!! That sure will add to your profit. To beat one's opponent in the competitive market, one must make themselves stand out. Cater to the needs of customers, making sure to provide them with an extravagant experience and win their satisfaction. You also need to make your business profitable and live up to the standards of quality. \n

          Now you will be provided with a list of amenities, along with a budget. You need to select any ten of them so that they match the needs of your customers. Make sure to use the budget wisely. Also, select the amenities that satisfy the needs of your customers effectively. \n
          
          - Drag the desired amenity from the list of amenities and drop it in the dialogue box. \n
          - If you desire to edit, swap, or reselect the amenity, you can do it. \n
          - Once you confirm the amenities, you can navigate back, or edit them. \n
          - You must select 10 amenities in total, not less, not more. \n
          - You have 15 minutes to finish this round.`}
            />
          )
        )}
        {/* {isLoading ? (
          <Loading />
        ) : (
          round === "round3" && (
            <CardComponent heading={"2.1"} teamId={teamId} round={round} />
          )
        )} */}
      </span>
    </div>
  );
}
