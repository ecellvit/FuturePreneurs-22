import React, { useRef, useState, useEffect, useContext } from "react";
import { useDrag } from "react-dnd";
import styles from "../../styles/DragDrop.module.css";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ToDrag from "./ToDrag";

function DragDrop() {
  const [divs, setdivs] = useState([0, 1, 2]);
  const [allDivs, setallDivs] = useState([]);
  const [balance, setBalance] = useState([]);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      console.log(item.counter);
      console.log("Meow Meow");
      console.log(allDivs);
      setallDivs((prevAllDivs) => [...prevAllDivs, item.counter]);
      let index = divs.indexOf(item.counter);
      divs.splice(index, 1);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  function OnDrop(item) {}

  return (
    <div>
      <div className={styles.Board}>
        {divs.map((counter) => {
          console.log(counter);
          return <ToDrag counter={counter} />;
        })}
      </div>

      <div className={styles.Board} ref={drop}>
        {allDivs.map((counter) => {
          return <div className={styles.Boarder}>{counter}</div>;
        })}
      </div>
    </div>
  );
}
export default DragDrop;
