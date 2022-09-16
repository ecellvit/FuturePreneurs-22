import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";

import 'bootstrap/dist/css/bootstrap.min.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Noty from './Noty';
import Image from 'next/image';
import fpLogo from "../img/fpLogo.svg";


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
            if (userRequests.findIndex((x) => x._id === currenTeam._id) === -1) {
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
      <Navbar variant="light" style={{ backgroundColor: "#333333" }}>
        <Container>
            <Navbar.Brand href="/">
              <Image alt=" " src={fpLogo} width={50} height={50}/>
              Futurepreneurs 8.0
            </Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              {
                status === "authenticated" && <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              }
            
            <div onClick={()=>{
              isLeader?router.push("/pendingUserRequests"):router.push("/pendingRequests")
            }}>
            <Noty width={"50"} color={"#122C34"} count={userRequests.length} />
            </div>
            </Navbar.Collapse>
            {(status === "authenticated") ?
              <Nav.Link onClick={() => logoutHandler()}>Sign Out</Nav.Link>
              :
              <Nav.Link onClick={() => loginHandler()}>Sign in</Nav.Link>
            }
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
