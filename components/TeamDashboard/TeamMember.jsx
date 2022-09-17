import styles from "../../styles/Dashboard.module.css";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const TeamMember = ({
  teamName,
  mobileNumber,
  email,
  teamId,
  userId,
  teamRole,
}) => {


  return (
    <div
      className={`${styles.col} ${styles.lg4} ${styles.md3} ${styles.xs2} ${styles.flex_stretch} ${styles.zoom}`}
    >
      <div className={`${styles.member_container} ${styles.border_gradient}`} >
        <div
          className={`${styles.centre_align} ${styles.bottom_margin}`}
        >
          {/* Team Name */}
          <h4 className={styles.member_name}>{teamName}</h4>
          
          {teamRole == 0 ? (
            <p className={styles.role_tag}>Leader</p>
          ) : (
            <p className={styles.role_tag}>Teammate</p>
          )}
        </div>
        <div className={`${styles.centre_align} ${styles.bottom_margin}`}>
          {/* Team Mobile number */}
          <p className={styles.phone_number}>{mobileNumber}</p>
          {/* Team email */}
          <p className={styles.paragraph}>{email}</p>
        </div>
      </div>
    </div>
  );
};
export default TeamMember;
