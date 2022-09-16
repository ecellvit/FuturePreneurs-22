import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const NavigationBar = (props) => {
  const { data: session, status } = useSession();
  const [hasSignedUp, setHasSignedUp] = useState();
  const [isLeader, setIsLeader] = useState();
  const router = useRouter();

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
      <Navbar
        variant="light"
        style={{
          backgroundColor: "#00dfc1",
          position: "sticky",
          top: "0",
          zIndex: "5",
        }}
      >
        <Container>
          <Navbar.Brand href="/">Futurepreneurs 8.0</Navbar.Brand>
          <Navbar.Collapse>Time Left: 12 hrs 12 mins 12 secs</Navbar.Collapse>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              {status === "authenticated" && (
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              )}
            </Navbar.Collapse>
            {status === "authenticated" &&
              (!isLeader ? (
                <Nav.Link href="/pendingRequests">Pending Requests</Nav.Link>
              ) : (
                <Nav.Link href="/pendingUserRequests">
                  Pending User Requests
                </Nav.Link>
              ))}
            {status === "authenticated" ? (
              <Nav.Link onClick={() => logoutHandler()}>Sign Out</Nav.Link>
            ) : (
              <Nav.Link onClick={() => loginHandler()}>Sign in</Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
