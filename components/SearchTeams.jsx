import { useEffect, useState } from "react";
//import reactLogo from "./assets/react.svg";
//import "./styles/SearchTeams.module.css";
import Image from "next/image";
import gradient from "../img/grad.jpg";
import phone from "../img/phone-icon.png";
import mailer from "../img/mail-icon.png";
//import styles from '../styles/SearchTeams.module.css'
function SearchTeams() {
  const [count, setCount] = useState(0);

  const [teamData, setTeamData] = useState([
    {
      key: 1,
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 2,
      teamName: "Two",
      members: ["rama", "s", "lol"],
      leader: ["rama"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 3,
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 4,
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 5,
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 6,
      teamName: "Two",
      members: ["rama", "s", "lol"],
      leader: ["rama"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 7,
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 8,
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      key: 9,
      teamName: "One",
      members: ["raj"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
  },
  ]);
  const [userData, setUserData] = useState([]);
  //const [nonFilledTeams, setNonFilledTeams] = useState([]);

  //function data() {}

  //const data = () => {};

  /* useEffect(() => {
    fetch(apiroute)
      .then((data) => data.json())
      .then((data) => {
        data.map((currenTeam) => {
          if (currenTeam.members.length < 4) {
            setTeamData((prevTeamData) => {
              return [...prevTeamData, currenTeam];
            });
          }
        });
      });
    //console.log(userData);
  }, []);*/

  return (
    <div className="Teams">
      {teamData.map((team) => {
        return (
          <div className="Cards" key={team.key}>
            <Image src={gradient} alt="Gradient" />
            <h3>TeamName:{team.teamName}</h3>
            <h3>Team Size:{team.members.length}/4</h3>
            <h3>Leader:{team.leader}</h3>
            <div className="info-group">
              <Image src={phone} alt="phone" />
              <p>{team.no}</p>
            </div>
            <div className="info-group">
              <Image src={mailer} alt="mailer" />
              <p>{team.mail}</p>
            </div>
            <button className="button">Join Team</button>
          </div>
        );
      })}
    </div>
  );
}

export default SearchTeams;
