import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import styles from "../styles/LinkJoining.module.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

function LinkJoining() {

  return (
    <>
      
        <div className={styles.container}>
          Loading...
        </div>

    </>
  );
}

export default LinkJoining;
