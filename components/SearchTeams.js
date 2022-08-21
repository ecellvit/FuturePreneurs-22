import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./styles/SearchTeams.css";

function SearchTeams() {
  const [count, setCount] = useState(0);

  const [teamData, setTeamData] = useState([
    {
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "Two",
      members: ["rama", "s", "lol"],
      leader: ["rama"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "Two",
      members: ["rama", "s", "lol"],
      leader: ["rama"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "One",
      members: ["raj", "s", "lol"],
      leader: ["raj"],
      no: "9876543210",
      mail: "meowmeow@cat.com",
    },
    {
      teamName: "One",
      members: ["raj", "s", "lol"],
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
          <div className="Cards">
            <img src="./img/grad.jpg" />
            <h3>TeamName:{team.teamName}</h3>
            <h3>Team Size:{team.members.length}/4</h3>
            <h3>Leader:{team.leader}</h3>
            <div className="info-group">
              <img src="./img/phone-icon.png" />
              <p>{team.no}</p>
            </div>
            <div className="info-group">
              <img src="./img/mail-icon.png" />
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
