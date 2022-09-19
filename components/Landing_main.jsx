import styles from "../styles/Landingr.module.css";
import Footer from "./landing_main/Footer";
import Section1 from "./landing_main/Section1";
import Section2 from "./landing_main/Section2";
import Section3 from "./landing_main/Section3";
import Section4 from "./landing_main/Section4";
import Section5 from "./landing_main/Section5";
import Section6 from "./landing_main/Section6";

const Landing_main = () => {
  return (
    <div className={styles.body}>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </div>
  );
};
export default Landing_main;
