import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Noty from "./Noty";
import Image from "next/image";
import fpLogo from "../img/fpLogo.svg";
import Loading from "./Loading";

import ecellLogo from "../img/ecellLogo.svg";
import menuicon from "../img/menuicon.svg";
import styles from "../styles/NavigationBar.module.css";

const NavigationBar = (props) => {
  const { data: session, status } = useSession();
  const [hasSignedUp, setHasSignedUp] = useState();
  const [isLeader, setIsLeader] = useState();
  const router = useRouter();

  const [userRequests, setUserRequests] = useState([]);
  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/requests`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          data.requests?.map((currenTeam) => {
            if (
              userRequests.findIndex((x) => x._id === currenTeam._id) === -1
            ) {
              setUserRequests((prevTeamData) => {
                return [...prevTeamData, currenTeam];
              });
            }
          });
        });
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/user/team`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())

        .then((data) => {
          if (data.user?.teamRole === 0) {
            setIsLeader(true);
          }
        })
        .catch((error) => {
          console.error("some err", error);
        });
    }
  }, [session]);

  const logoutHandler = () => {
    signOut();
  };

  const loginHandler = () => {
    signIn("google", { callbackUrl: "/getdetail" });
  };

  return (
    <>
      <nav>
        <div className={styles.navbar}>
          <div className={styles.flexLeft}>
            <ul>
              <li>
                <Link href="/">
                  <Image alt="Logo" src={fpLogo} width={50} height={50} />
                </Link>
              </li>
              <li>
                <Link href={"/"}>
                  <a
                    className={`${styles.flexLeftPosition} ${styles.responsive}`}
                  >
                    Futurepreneurs 8.0
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a
                    className={`${styles.flexLeftPosition} ${styles.responsive}`}
                  >
                    Home
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.flexMid} ${styles.responsive}`}>
            <div className={styles.headerMid}>
              REGISTRATION ENDS IN&nbsp;&nbsp;
            </div>
            <div className={styles.counterWrapper}>
              <div className={`${styles.counterCard} ${styles.counterCard1}`}>
                <div className={styles.counterCardHead}>
                  &nbsp;&nbsp;&nbsp;DAYS&nbsp;&nbsp;&nbsp;
                </div>
                <div className={styles.counterCardBody}>11</div>
              </div>
              <div className={`${styles.counterCard} ${styles.counterCard2}`}>
                <div className={styles.counterCardHead}>&nbsp;HOURS&nbsp;</div>
                <div className={styles.counterCardBody}>11</div>
              </div>
              <div className={`${styles.counterCard} ${styles.counterCard3}`}>
                <div className={styles.counterCardHead}>MINUTES</div>
                <div className={styles.counterCardBody}>11</div>
              </div>
              <div className={`${styles.counterCard} ${styles.counterCard4}`}>
                <div className={styles.counterCardHead}>SECONDS</div>
                <div className={styles.counterCardBody}>11</div>
              </div>
            </div>
          </div>
          <div className={styles.flexRight}>
            <ul>
              <li>
                <button
                  className={`${styles.flexRightBell} ${styles.responsive}`}
                  onClick={() => {
                    isLeader
                      ? router.push("/pendingUserRequests")
                      : router.push("/pendingRequests");
                  }}
                >
                  <Noty
                    width={"40"}
                    color={"#122C34"}
                    count={userRequests.length}
                  />
                </button>
                {status === "authenticated" && (
                  <Link href="/dashboard">
                    <a
                      className={`${styles.flexRightPosition} ${styles.responsive}`}
                    >
                      Dashboard
                    </a>
                  </Link>
                )}
              </li>
              <li>
                {status === "authenticated" ? (
                  <a
                    className={`${styles.flexRightPosition} ${styles.responsive}`}
                    onClick={() => logoutHandler()}
                  >
                    Sign Out
                  </a>
                ) : (
                  <a
                    className={`${styles.flexRightPosition} ${styles.responsive}`}
                    onClick={() => loginHandler()}
                  >
                    Sign in
                  </a>
                )}{" "}
              </li>
              <li>
                <Image alt="Logo" src={ecellLogo} width={70} height={70} />
              </li>
              <li>
                <div className={styles.hamburgerMenu}>
                  <Image
                    alt="Logo"
                    src={menuicon}
                    width={25}
                    height={25}
                    onClick
                  />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
