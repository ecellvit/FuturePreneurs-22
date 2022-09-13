import React from "react";
import { Link } from "next/link";
import styled from "styled-components";

const ColStyle = styled.div`
  .heading {
    font-size: 1.2rem;
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
  li {
    margin-bottom: 1rem;
  }
  a {
    font-size: 1rem;
    color: black;
    text-decoration: none;
  }
`;

export default function FooterCol({
  heading = "Col Heading",
  links = [
    {
      type: "Link",
      title: "Home",
      path: "/home",
    },
    {
      type: "Link",
      title: "About",
      path: "/about",
    },
  ],
}) {
  return (
    <ColStyle>
      <h2 className="heading">{heading}</h2>
      <ul>
        {/* {links.map((item, index) => (
          <li key={index}>
            {item.type === "Link" ? (
              <Link to={item.path}>{item.title}</Link>
            ) : (
              <Link href={item.path} target="_blank" rel="noreferrer">
                {item.title}
              </Link>
            )}
          </li>
        ))} */}
      </ul>
    </ColStyle>
  );
}
