import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Landingr.module.css";
import Countup from "../animationComponents/countup";

const Section1 = () => {
  const router = useRouter();
  const { status } = useSession();
  const [participantCount, setParticipantCount] = useState("");
  const [teamCount, setTeamCount] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/admin/user`)
      .then((data) => data.json())
      .then((data) => {
        //console.log(data.usersCount)
        setParticipantCount(data.usersCount);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/admin/team`)
      .then((data) => data.json())
      .then((data) => {
        // console.log(data.teamsCount);
        setTeamCount(data.teamsCount);
      });
  }, []);

  return (
    <div className={styles.sec_1}>
      <div className={styles.first_grad}>
        <img src="mix.svg" className={styles.image} />
        <img src="gg.svg" width="240" className={styles.grad} />
      </div>
      <div className={styles.fp_big}>
        <img
          src="fpmain-min.png"
          sizes="(max-width: 479px) 100vw, (max-width: 991px) 227px, 370px"
          width="515px"
          className={styles.p_logo}
        />
        {/* <img
          onClick={() => {
            if (status === "authenticated") {
              // console.log("already siged in");
              router.push("/getdetail");
            } else {
              signIn("google", { callbackUrl: "/getdetail" });
            }
          }}
          style={{ cursor: "pointer" }}
          src="reg.png"
          sizes="(max-width: 479px) 92.5px, (max-width: 767px) 148px, 197px"
          width="200px"
          className={styles.get_in_gradient}
        /> */}
      </div>
      <div className={styles.main_text}>
        <div className={styles.countContainer}>
          <div className={styles.count}>
            Registered Participants{" "}
            <Countup
              end={`${participantCount}`}
              className={`${styles.countup}`}
            />
          </div>
          <div className={styles.count}>
            Registered Teams{" "}
            <Countup end={`${teamCount}`} className={`${styles.countup}`} />
          </div>
        </div>
        <p className={styles.main_para}>
          Entrepreneurship Cell, VIT brings to you Futurepreneurs 8.0, its
          business simulation competition. So fire up your business skills with
          the added knowledge about consumers and the trends they tend to
          follow. Do you have the vision, which would make you stand out amongst
          the ebbing and flowing complexities of the event? Join the league to
          find out and compete!
          <br />
        </p>
      </div>
    </div>
  );
};
export default Section1;
