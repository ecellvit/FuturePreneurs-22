import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import SearchTeams from "./SearchTeams";
import Loading from "./Loading";
import styles from "../styles/SearchTeams.module.css";

function SearchTeamsWithSearch() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [labels, setLabels] = useState([]);
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);

  const [teamData, setTeamData] = useState([]);
  const handleTextBox = (selectedTeam) => {
    console.log(selectedTeam);
    if (selectedTeam) {
      return selectedTeam.team.teamName;
    } else {
      return selectedTeam;
    }
  };

  const handleTeamChange = (newTeam) => {
    if (newTeam) {
      setIsLoading(true);
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
          setIsLoading(false);
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }
          setSelectedTeam(data);
          console.log("daat!!!", data);
        })
        .catch((err) => console.log(err));
    } else {
      setSelectedTeam("");
    }
  };

  useEffect(() => {
    if (status !== "loading" && status === "authenticated") {
      setIsLoading(true);
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
          setIsLoading(false);
          if (data.error?.errorCode) {
            toast.error(`${data.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return;
          }
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

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className={styles.SearchBar}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={labels}
          renderInput={(params) => {
            console.log(selectedTeam);
            return (
              <TextField
                {...params}
                label="Teams"
                style={{
                  backgroundColor: "white",
                }}
              />
            );
          }}
          value={handleTextBox(selectedTeam)}
          onChange={(_event, newTeam) => {
            handleTeamChange(newTeam);
            console.log(labels);
          }}
        />
      </div>
      <SearchTeams data={selectedTeam} />
    </div>
  );
}
export default SearchTeamsWithSearch;
