import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import styles from "../../styles/Img.module.css";

function SmallScreen() {
  toast.error(
    `You are trying to attempt quiz from mobile device,Only Laptops And Desktops Are Allowed`,
    {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 10000000,
    }
  );
  return (
    <div className={styles.liner}>
      You are trying to attempt quiz from mobile device,Only Laptops And
      Desktops Are Allowed
    </div>
  );
}
export default SmallScreen;
