import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../styles/Img.module.css";
import { memo } from "react";

function NotLeader() {
  toast.error(
    `You are trying to attempt quiz as a teamMember,Only The Leader Can Appear for the quiz`,
    {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 100000,
    }
  );
  return (
    <div className={styles.liner}>
      You are trying to attempt quiz as a teamMember,Only The Leader Can Appear
      for the quiz
    </div>
  );
}
export default memo(NotLeader);
