import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import NavigationBar from "../../components/NavigationBar";
import SearchTeams from "../../components/SearchTeams";
import SearchTeamsWithSearch from "../../components/SearchTeamsWithSearch";

function JoinTeamPage() {
  const {data:session, status} = useSession();
  const router = useRouter();

  // redirects to home if user not logged in 
  useEffect(()=>{
    if (router.isReady){
      if (status === "unauthenticated" && status!=="loading"){
          router.push("/")
      }
    }
  }, [status, router])
  
  return (
    <div>
      <NavigationBar/>
      <br/>
      <SearchTeams />
    </div>
  );
}

export default JoinTeamPage;
