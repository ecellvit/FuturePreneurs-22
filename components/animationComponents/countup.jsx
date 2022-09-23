import { useEffect, useState } from "react";
import styles from "../../styles/Landingr.module.css";

// client-side only compoent -  dynamic Javascript count-up of numbers
export default function Countup(props) {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const speed = 5000 / props.end;
  // eslint-disable-next-line
  useEffect(() => {
    if (count < props.end && count < 1000) {
      setTimeout(() => {
        setCount((prevCount) => prevCount + 1);
      }, speed);
    } else {
      setValue(props.end.toString());
    }
  });
  return (
    <>
      <span className={styles.countText}>{value || count}+</span>
    </>
  );
}
