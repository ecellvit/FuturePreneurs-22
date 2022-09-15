import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchTeams from "./SearchTeams";

function SearchTeamsWithSearch() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [labels, setLabels] = useState([]);
  const { data: session, status } = useSession();

  //console.log(session, "in component");
  // const [count, setCount] = useState(0);

  // const [teamData, setTeamData] = useState([
  //   {
  //     _id: "6301f9892ecdca7e73ed4a5b",
  //     teamName: "RCB",
  //     teamLeaderId: "6301f97a2ecdca7e73ed4a51",
  //     members: [
  //       {
  //         _id: "6301f97a2ecdca7e73ed4a51",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //       {
  //         _id: "6301fa622ecdca7e73ed4a7d",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 1,
  //       },
  //     ],
  //     __v: 0,
  //     timer: "2022-09-04T11:18:22.266Z",
  //     completedQuestions: [8, 17, 10, 9, 16, 13, 1, 2, 12, 11],
  //   },
  //   {
  //     _id: "6301f9c42ecdca7e73ed4a6a",
  //     teamName: "Barca",
  //     teamLeaderId: "6301f98e2ecdca7e73ed4a5f",
  //     members: [
  //       {
  //         _id: "6301f98e2ecdca7e73ed4a5f",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "6301fa012ecdca7e73ed4a79",
  //     teamName: "MI",
  //     teamLeaderId: "6301f9ed2ecdca7e73ed4a70",
  //     members: [
  //       {
  //         _id: "6301f9ed2ecdca7e73ed4a70",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //     ],
  //     __v: 0,
  //   },
  //   {
  //     _id: "631448e7f8e5566f86260030",
  //     teamName: "SRH",
  //     teamLeaderId: "63144783eb1b17c9319cf36f",
  //     members: [
  //       {
  //         _id: "63144783eb1b17c9319cf36f",
  //         email: "devakreddy2004@gmail.com",
  //         name: "Devak Reddy",
  //         mobileNumber: "6304942898",
  //         teamRole: 0,
  //       },
  //     ],
  //     completedQuestions: [10, 2, 20, 12, 18, 22],
  //     timer: "2022-09-04T11:12:22.181Z",
  //   },
  // ]);
  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    if (status !== "loading" && status !== "unauthenticated") {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team`, {
        method: "GET",
        //mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((data) => data.json())
        .then((data) => {
          data.paginatedResult.results.map((currenTeam) => {
            setTeamData((prevTeamData) => {
              return [...prevTeamData, currenTeam];
            });
          });
        })
        .catch((err) => console.log(err));
    }
  }, [status]);

  useEffect(() => {
    setLabels(
      teamData.map((team) => {
        return { teamData: team, label: team.teamName };
      })
    );
  }, [teamData]);

  return (
    <div>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={labels}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Teams" />}
        value={selectedTeam}
        onChange={(_event, newTeam) => {
          console.log(newTeam);
          fetch(
            `${process.env.NEXT_PUBLIC_SERVER}/api/team/${newTeam.teamData._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.accessTokenBackend}`,
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
            .then((data) => data.json())
            .then((data) => {
              console.log(data);
              setSelectedTeam(data);
            })
            .catch((err) => console.log(err));
        }}
      />
      <SearchTeams data={selectedTeam} />
    </div>
  );
}
export default SearchTeamsWithSearch;
