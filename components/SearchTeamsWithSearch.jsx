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
  const handleTeamChange = (newTeam) => {
    console.log(newTeam);
    if (newTeam) {
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
          setSelectedTeam(data);
        })
        .catch((err) => console.log(err));
    } else {
      setSelectedTeam();
    }
  };

  const [teamData, setTeamData] = useState([]);
  useEffect(() => {
    if (status !== "loading" && status !== "unauthenticated") {
      fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/team`, {
        method: "GET",
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
          handleTeamChange(newTeam);
        }}
      />
      <SearchTeams data={selectedTeam} />
    </div>
  );
}
export default SearchTeamsWithSearch;
