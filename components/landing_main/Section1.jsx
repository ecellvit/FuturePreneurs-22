import { signIn } from "next-auth/react";
import styles from "../../styles/Landingr.module.css";

const Section1 = () => {
  return (
    <div className={styles.sec_1}>
      <div className={styles.first_grad}>
        <img src="mix.svg" className={styles.image} />
        <img src="gg.svg" width="240" className={styles.grad} />
      </div>
      <div className={styles.fp_big}>
        <img
          src="Component_6.png"
          sizes="(max-width: 479px) 100vw, (max-width: 991px) 227px, 370px"
          width="515px"
          className={styles.p_logo}
        />
        <img
          onClick={() => {
            signIn("google", { callbackUrl: "/getdetail" });
          }}
          style={{ cursor: "pointer" }}
          src="getin-min.png"
          sizes="(max-width: 479px) 92.5px, (max-width: 767px) 148px, 197px"
          width="200px"
          className={styles.get_in_gradient}
        />
      </div>
      <div className={styles.main_text}>
        <p className={styles.main_para}>
          Entrepreneurship Cell, VIT brings to you Futurepreneurs 8.0, its
          business simulation competition. The event is designed to test your
          analytical thinking. Glaze up your business skills with the added
          knowledge about consumers and the trends they tend to follow.
          <br />
        </p>
      </div>
    </div>
  );
};
export default Section1;
