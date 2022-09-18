import Link from "next/link";
import styles from "../../styles/Landingr.module.css";
const Section1 = () => {
  return (
    <div className={styles.sec_1}>
      <div className={styles.first_grad}>
        <img src="mix.svg" className={styles.image} />
        <img src="gg.svg" width="240" className={styles.grad} />
      </div>
      <h1 className={styles.fp_heading}>FUTUREPRENEURS</h1>
      <div className={styles.fp_main_div}>
        <div className={styles.logo_text}>
          <div className={styles.fp_big}>
            <img
              src="fp_logo-min.png"
              sizes="(max-width: 479px) 100vw, (max-width: 991px) 227px, 370px"
              width="515px"
              className={styles.p_logo}
            />
            <div className={styles.date_div}>
              <img
                src="date-min.png"
                width="121.5"
                sizes="(max-width: 479px) 100vw, (max-width: 991px) 108px, 240px"
                className={styles.date_img}
              />
            </div>
            <a className={styles.getin} Link href="/about">
              <img
                src="getin-min.png"
                sizes="(max-width: 479px) 92.5px, (max-width: 767px) 148px, 197px"
                width="197"
                className={styles.get_in_gradient}
              />
            </a>
          </div>
        </div>
        <div className={styles.main_text}>
          <p className={styles.main_para}>
            Entrepreneurship Cell, VIT brings to you Futurepreneurs 8.0, its
            business simulation competition. The event is designed to test your
            analytical thinking. Glaze up your business skills with the added
            knowledge about consumers and the trends they tend to follow. Touch
            it all up with a study of financial products and their marketing
            strategies.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};
export default Section1;
