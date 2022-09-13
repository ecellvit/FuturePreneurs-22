import React, { useState, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const NavigationBar = (props) => {
  const { data: session, status } = useSession();
  const [hasSignedUp, setHasSignedUp] = useState();
  const router = useRouter();

  

  const isLoggedIn = true;
  console.log(session);
  const logoutHandler = () => {
    signOut();
    console.log(session);
    console.log("logout here")
  };
  const loginHandler = () => {
    signIn("google", { callbackUrl: "/getdetail" });
    console.log(session);
    console.log("login here")
  };

  return (
    <>
      <Navbar variant="light" style={{ backgroundColor: "#ffddaa" }}>
        <Container>
          <Navbar.Brand href="/">Futurepreneurs 8.0</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Navbar.Collapse className="justify-content-end">
              {
                status === "authenticated" && <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              }
            </Navbar.Collapse>
            {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
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
}

export default NavigationBar;
