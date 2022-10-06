import React, { useRef, useState, useEffect, useContext } from "react";
import { useDrag } from "react-dnd";
import styles from "../../styles/DragDrop.module.css";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function ToDrag({ counter }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { counter: counter },

    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div className={styles.Boarder} ref={drag}>
      {counter}
    </div>
  );
}
export default ToDrag;
