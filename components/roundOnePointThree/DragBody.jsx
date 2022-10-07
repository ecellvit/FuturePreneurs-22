import React, { useRef, useState, useEffect, useContext } from "react";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styles from "../../styles/Drag.module.css";
import ToDrag from "./ToDrag";
import { toast, ToastContainer } from "react-toastify";

const DragBody = () => {
  const [leftArray, setleftArray] = useState([
    "Travel Guide Facilities 1",
    "Travel Guide Facilities 2",
    "Travel Guide Facilities 3",
    "Travel Guide Facilities 4",
    "Travel Guide Facilities 5",
    "Travel Guide Facilities 6",
    "Travel Guide Facilities 7",
    "Travel Guide Facilities 8",
    "Travel Guide Facilities 9",
    "Travel Guide Facilities 10",
    "Travel Guide Facilities 11",
    "Travel Guide Facilities 12",
    "Travel Guide Facilities 13",
    "Travel Guide Facilities 14",
    "Travel Guide Facilities 15",
  ]);
  const [rightArray, setrightArray] = useState([
    "Travel Guide Facilities 1",
    "Travel Guide Facilities 2",
    "Travel Guide Facilities 3",
    "Travel Guide Facilities 4",
    "Travel Guide Facilities 5",
    "Travel Guide Facilities 6",
    "Travel Guide Facilities 7",
    "Travel Guide Facilities 8",
    "Travel Guide Facilities 9",
    "Travel Guide Facilities 10",
    "Travel Guide Facilities 11",
    "Travel Guide Facilities 12",
    "Travel Guide Facilities 13",
    "Travel Guide Facilities 14",
    "Travel Guide Facilities 15",
  ]);
  const [one, setone] = useState([]);
  const [two, settwo] = useState([]);
  const [three, setthree] = useState([]);
  const [four, setfour] = useState([]);
  const [five, setfive] = useState([]);
  const [six, setsix] = useState([]);
  const [balance, setBalance] = useState(200);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item) => {
      console.log(item);
      if (balance > 150) {
        if (one.length === 0) {
          console.log("one");
          setone([item.counter]);
          setBalance(balance - 150);
          setleftArray((prevLeft) => {
            prevLeft.splice(leftArray.indexOf(item.counter), 1);
            return prevLeft;
          });
        } else if (two.length === 0) {
          console.log("two");
          settwo([item.counter]);
          setBalance(balance - 150);
          leftArray.splice(leftArray.indexOf(item.counter), 1);
        } else if (three.length === 0) {
          console.log("three");
          setthree([item.counter]);
          setBalance(balance - 150);
          setleftArray((prevLeft) => {
            let pos = prevLeft.splice(leftArray.indexOf(item.counter), 1);
            return [...pos];
          });
        } else if (four.length === 0) {
          console.log("four");

          setfour([item.counter]);
          setBalance(balance - 150);
          leftArray.splice(leftArray.indexOf(item.counter), 1);
        } else if (five.length === 0) {
          console.log("five");

          setfive([item.counter]);
          setBalance(balance - 150);
          leftArray.splice(leftArray.indexOf(item.counter), 1);
        } else if (six.length === 0) {
          console.log("six");

          setsix([item.counter]);
          setBalance(balance - 150);
          leftArray.splice(leftArray.indexOf(item.counter), 1);
        } else {
          toast.error(`All containers full`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 10,
          });
        }
      } else {
        toast.error(`Not Enough Balance`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 10,
        });
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    console.log("States Changed");
  }, [one, two, three, four, five, six]);

  return (
    <div className={styles.sectiondragdrop}>
      <div className={styles.balance}>
        <div className={styles.bal}>
          <h1 className={styles.balance_h1}>Balance - {balance}$</h1>
        </div>
      </div>
      <div className={styles.shelf_container}>
        <div className={styles.shelf_start}>
          {leftArray.map((arr) => {
            return <ToDrag counter={arr} />;
          })}
        </div>
        <div className={styles.shelf_center}>
          <div className={styles.centre_div_board} ref={drop}>
            <div className={styles.cont}>
              {one.map((arr) => {
                return (
                  <div className={styles.amn_left}>
                    <p className={styles.am_name}>{arr}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.cont}>
              {two.map((arr) => {
                return (
                  <div className={styles.amn_left}>
                    <p className={styles.am_name}>{arr}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.cont}>
              {three.map((arr) => {
                return (
                  <div className={styles.amn_left}>
                    <p className={styles.am_name}>{arr}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.cont}>
              {four.map((arr) => {
                return (
                  <div className={styles.amn_left}>
                    <p className={styles.am_name}>{arr}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.cont}>
              {five.map((arr) => {
                return (
                  <div className={styles.amn_left}>
                    <p className={styles.am_name}>{arr}</p>
                  </div>
                );
              })}
            </div>
            <div className={styles.cont}>
              {" "}
              {six.map((arr) => {
                return (
                  <div className={styles.amn_left}>
                    <p className={styles.am_name}>{arr}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.shelf_last}>
          {rightArray.map((arr) => {
            return <ToDrag counter={arr} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DragBody;
