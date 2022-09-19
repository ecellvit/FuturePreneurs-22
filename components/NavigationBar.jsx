import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Noty from "./Noty";
import Image from "next/image";
import fpLogo from "../img/fpLogo.svg";

import ecellLogo from "../img/ecellLogo.svg";
import menuicon from "../img/menuicon.svg";
import styles from "../styles/NavigationBar.module.css";
import { HamburgerAnimation } from "./animationComponents/hamburger-animation/HBAnimation";
import myContext from "../store/myContext";

const NavigationBar = () => {
  const { data: session, status } = useSession();
  const [days, setDays] = useState();
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [userRequests, setUserRequests] = useState([]);
  const router = useRouter();

  const myCtx = useContext(myContext);

  const END_TIME = new Date(2022, 10, 4, 17, 0, 0)

  useEffect(()=>{
    let timer = setTimeout(()=>{
      let a = Date.now()
      let d = END_TIME.getTime() - a
      let dys = Math.floor(d/1000/60/60/24)%30
      let hrs = Math.floor(d/1000/60/60)%24
      let mins = Math.floor(d/1000/60)%60
      let secs = Math.floor(d/1000)%60

      setDays(dys);
      setHours(hrs);
      setMinutes(mins);
      setSeconds(secs);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  useEffect(()=>{
    myCtx.notyHandler(userRequests.length);
  }, [userRequests])

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
            myCtx.leaderHandler(true);
          } else {
            myCtx.leaderHandler(false);
          }
        })
        .catch((error) => {
          console.error("some err", error);
        });
    }
  }, [session]);

  const logoutHandler = () => {
    signOut({ callbackUrl: "/" });
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
                <div className={styles.counterCardBody}>{days}</div>
              </div>
              <div className={`${styles.counterCard} ${styles.counterCard2}`}>
                <div className={styles.counterCardHead}>&nbsp;HOURS&nbsp;</div>
                <div className={styles.counterCardBody}>{hours}</div>
              </div>
              <div className={`${styles.counterCard} ${styles.counterCard3}`}>
                <div className={styles.counterCardHead}>MINUTES</div>
                <div className={styles.counterCardBody}>{minutes}</div>
              </div>
              <div className={`${styles.counterCard} ${styles.counterCard4}`}>
                <div className={styles.counterCardHead}>SECONDS</div>
                <div className={styles.counterCardBody}>{seconds}</div>
              </div>
            </div>
          </div>
          <div className={styles.flexRight}>
            <ul>
              <li>
                {status === "authenticated" && (
                  <button
                    className={`${styles.flexRightBell} ${styles.responsive}`}
                    onClick={() => {
                      myCtx.isLeader
                        ? router.push("/pendingUserRequests")
                        : router.push("/pendingRequests");
                    }}
                  >
                    <Noty
                      width={"40"}
                      color={"#fff"}
                      count={myCtx.notys}
                    />
                  </button>
                )}

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
              {/* <li>
                <div className={styles.hamburgerMenu}>
                  <Image
                    alt="Logo"
                    src={menuicon}
                    width={25}
                    height={25}
                    onClick
                  />
                </div>
              </li> */}
              {/* <HamburgerAnimation /> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
