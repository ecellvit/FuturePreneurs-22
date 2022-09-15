import { useSession } from "next-auth/react";
import React from "react";
import NavigationBar from "../../components/NavigationBar";
import SearchTeams from "../../components/SearchTeams";
import SearchTeamsWithSearch from "../../components/SearchTeamsWithSearch";

function JoinTeamPage() {
  const { data: session } = useSession()
  return (
    <div>
      <NavigationBar/>
      <br/>
      <SearchTeams />
    </div>
  );
}

export default JoinTeamPage;
