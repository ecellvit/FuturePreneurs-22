import React from "react";
import styled from "styled-components";
import FooterCol from "./FooterCol";
import PText from "./PText";
import { MdPhoneInTalk } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";
const FooterStyle = styled.div`
  background-color: var(--deep-dark);
  padding-top: 1rem;
  .container {
    display: flex;
    gap: 3rem;
    background: linear-gradient(0deg, rgba(149, 149, 149, 0.2), rgba(149, 149, 149, 0.2));
  }
  .footer__col1 {
    flex: 2;
    padding-left:4rem;
  }
  .footer__col2,
  .footer__col3,
  .footer__col4 {
    flex: 2;
  }
  .footer__col1__title {
    font-size: 4.5rem;
    color: #00DFC0;
    margin:0;
  }
  
  }
  @media only screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 0rem;
      & > div {
        
      }
    }
    .footer__col1 .para {
      max-width: 100%;
    }
    .copyright {
      .container {
        div {
          margin-top: 0;
        }
      }
    }
  }
`;
const ColoredLine = ({ color }) => (
  <hr
    style={{
      marginTop: "4rem",
      color: color,
      backgroundColor: color,
      height: 5,
      width: "130%",
      marginLeft: "-25%",
    }}
  />
);

export function Section6() {
  return (
    <FooterStyle>
      <div className="container">
        <div className="footer__col1">
          <PText>
            <h1 className="footer__col1__title">E-CELL</h1>
            IDEATE. INNOVATE. ACTUATE
          </PText>
          <PText
            style={{
              marginTop: "2.4rem",
              fontSize: "0.7rem",
              fontWeight: "bold",
              marginLeft: "10rem",
            }}
          >
            <MdPhoneInTalk /> +918293622180
          </PText>
          <PText
            style={{
              marginTop: "0rem",
              fontSize: "0.7rem",
              fontWeight: "bold",
              marginLeft: "10rem",
            }}
          >
            <MdEmail /> helloecellvit@gmail.com
          </PText>
        </div>
        <div className="footer__col2">
          <ColoredLine color="black" />
          <br />
          <br />
          <div style={{ marginLeft: "4rem" }}>
            <AiFillFacebook />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <AiFillInstagram />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <AiFillTwitterSquare />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <AiFillLinkedin />
          </div>
        </div>
        <div className="footer__col3">
          <FooterCol
            heading=""
            links={[
              {
                title: "Home",
                path: "/",
                type: "Link",
              },
              {
                type: "Link",
                title: "About",
                path: "/about",
              },
              {
                type: "Link",
                title: "Timeline",
                path: "/projects",
              },
              {
                type: "Link",
                title: "Sponsor",
                path: "/contact",
              },
              {
                type: "Link",
                title: "Register",
                path: "/contact",
              },
            ]}
          />
        </div>
      </div>
    </FooterStyle>
  );
}
