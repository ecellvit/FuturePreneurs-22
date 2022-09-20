import { signIn, useSession } from "next-auth/react";
import styles from "../../styles/Landingr.module.css";

const Section1 = () => {
  const { data: session, status } = useSession();
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
        <img
          onClick={() => {
            if (status === "authenticated") {
              console.log("already siged in");
            } else {
              signIn("google", { callbackUrl: "/getdetail" });
            }
          }}
          style={{ cursor: "pointer" }}
          src="reg.png"
          sizes="(max-width: 479px) 92.5px, (max-width: 767px) 148px, 197px"
          width="200px"
          className={styles.get_in_gradient}
        />
      </div>
      <div className={styles.main_text}>
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
